import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";

type Mode = "draft" | "translate" | "tone";

interface Body {
  mode: Mode;
  prompt?: string;
  text?: string;
  language?: string;
  audience?: string;
}

const SYSTEM: Record<Mode, string> = {
  draft:
    "You are a school communication assistant. Draft a clear, warm, concise broadcast message for parents and students. Use plain language. Avoid jargon. Return only the message body, no preamble.",
  translate:
    "You are a precise translator for school communications. Translate the user's text into the target language. Preserve tone, names, dates, times, and numbers. Return only the translation.",
  tone:
    "You are an empathetic communications coach for teachers. Analyze the message and respond with strict JSON: {\"tone\":\"warm|neutral|harsh|urgent\",\"clarity\":1-5,\"issues\":[\"...\"],\"suggestion\":\"rewritten message\"}. No prose outside JSON.",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!KEY) throw new Error("LOVABLE_API_KEY not configured");

    const body = (await req.json()) as Body;
    const mode = body.mode;
    if (!mode || !SYSTEM[mode]) {
      return new Response(JSON.stringify({ error: "Invalid mode" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let userMsg = "";
    if (mode === "draft") {
      userMsg = `Audience: ${body.audience || "parents"}\nTopic: ${body.prompt || ""}`;
    } else if (mode === "translate") {
      userMsg = `Target language: ${body.language || "Spanish"}\n\nText:\n${body.text || ""}`;
    } else {
      userMsg = body.text || "";
    }

    const resp = await fetch(GATEWAY, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM[mode] },
          { role: "user", content: userMsg },
        ],
      }),
    });

    if (resp.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limit reached, try again shortly." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (resp.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits exhausted. Add credits in Workspace settings." }), {
        status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!resp.ok) {
      const t = await resp.text();
      console.error("gateway", resp.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const content: string = data.choices?.[0]?.message?.content ?? "";

    let result: unknown = { text: content };
    if (mode === "tone") {
      try {
        const cleaned = content.replace(/```json|```/g, "").trim();
        result = JSON.parse(cleaned);
      } catch {
        result = { tone: "neutral", clarity: 3, issues: [], suggestion: content };
      }
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
