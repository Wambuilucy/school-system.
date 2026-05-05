import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.95.0";

const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { broadcast_id, language } = await req.json();
    if (!broadcast_id || !language) {
      return new Response(JSON.stringify({ error: "broadcast_id and language required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const url = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const aiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!aiKey) throw new Error("LOVABLE_API_KEY not configured");

    const admin = createClient(url, serviceKey);

    // Authenticate the caller
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    const { data: userRes } = await admin.auth.getUser(token);
    if (!userRes?.user) {
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Cache hit?
    const { data: cached } = await admin
      .from("broadcast_translations")
      .select("body")
      .eq("broadcast_id", broadcast_id)
      .eq("language", language)
      .maybeSingle();
    if (cached) {
      return new Response(JSON.stringify({ body: cached.body, cached: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get original
    const { data: bc } = await admin
      .from("broadcasts")
      .select("body, language")
      .eq("id", broadcast_id)
      .maybeSingle();
    if (!bc) {
      return new Response(JSON.stringify({ error: "broadcast not found" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if ((bc.language || "en") === language) {
      return new Response(JSON.stringify({ body: bc.body, cached: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Translate via AI gateway
    const resp = await fetch(GATEWAY, {
      method: "POST",
      headers: { Authorization: `Bearer ${aiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are a translator for school communications. Translate the user's text into the language indicated by its ISO code or name. Preserve names, dates, times, numbers, and tone. Return ONLY the translation." },
          { role: "user", content: `Target language: ${language}\n\n${bc.body}` },
        ],
      }),
    });

    if (resp.status === 429 || resp.status === 402) {
      return new Response(JSON.stringify({ error: resp.status === 429 ? "rate limited" : "credits exhausted", body: bc.body }), {
        status: resp.status, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!resp.ok) {
      console.error("AI error", resp.status, await resp.text());
      return new Response(JSON.stringify({ body: bc.body, error: "translation failed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const data = await resp.json();
    const translated: string = data.choices?.[0]?.message?.content?.trim() || bc.body;

    // Cache it
    await admin
      .from("broadcast_translations")
      .insert({ broadcast_id, language, body: translated });

    return new Response(JSON.stringify({ body: translated, cached: false }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
