
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferred_language text NOT NULL DEFAULT 'en';

CREATE TABLE public.broadcast_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  broadcast_id uuid NOT NULL REFERENCES public.broadcasts(id) ON DELETE CASCADE,
  language text NOT NULL,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (broadcast_id, language)
);

ALTER TABLE public.broadcast_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated read translations"
ON public.broadcast_translations FOR SELECT TO authenticated
USING (true);
-- writes only via service role (edge function); no insert/update/delete policies for users
