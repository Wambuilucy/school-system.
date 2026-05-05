
-- Broadcasts
CREATE TABLE public.broadcasts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL,
  subject text,
  body text NOT NULL,
  group_ids text[] NOT NULL DEFAULT '{}',
  is_emergency boolean NOT NULL DEFAULT false,
  language text DEFAULT 'en',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.broadcasts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers create broadcasts"
ON public.broadcasts FOR INSERT TO authenticated
WITH CHECK (auth.uid() = sender_id AND has_role(auth.uid(), 'teacher'::app_role));

CREATE POLICY "Authenticated view broadcasts"
ON public.broadcasts FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Senders delete own broadcasts"
ON public.broadcasts FOR DELETE TO authenticated
USING (auth.uid() = sender_id);

-- Receipts
CREATE TABLE public.broadcast_receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  broadcast_id uuid NOT NULL REFERENCES public.broadcasts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  read_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (broadcast_id, user_id)
);
ALTER TABLE public.broadcast_receipts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users create own receipts"
ON public.broadcast_receipts FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users view own receipts or sender views all"
ON public.broadcast_receipts FOR SELECT TO authenticated
USING (
  auth.uid() = user_id
  OR EXISTS (SELECT 1 FROM public.broadcasts b WHERE b.id = broadcast_id AND b.sender_id = auth.uid())
);

ALTER PUBLICATION supabase_realtime ADD TABLE public.broadcast_receipts;
ALTER TABLE public.broadcast_receipts REPLICA IDENTITY FULL;

-- Wellbeing
CREATE TABLE public.wellbeing_checkins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  mood smallint NOT NULL,
  energy smallint NOT NULL,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.wellbeing_checkins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users create own checkins"
ON public.wellbeing_checkins FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users view own; staff view all"
ON public.wellbeing_checkins FOR SELECT TO authenticated
USING (
  auth.uid() = user_id
  OR has_role(auth.uid(), 'teacher'::app_role)
  OR has_role(auth.uid(), 'parent'::app_role)
);

CREATE POLICY "Users delete own checkins"
ON public.wellbeing_checkins FOR DELETE TO authenticated
USING (auth.uid() = user_id);

-- Validation: mood/energy 1..5
CREATE OR REPLACE FUNCTION public.validate_wellbeing()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.mood < 1 OR NEW.mood > 5 THEN RAISE EXCEPTION 'mood out of range'; END IF;
  IF NEW.energy < 1 OR NEW.energy > 5 THEN RAISE EXCEPTION 'energy out of range'; END IF;
  RETURN NEW;
END$$;

CREATE TRIGGER wellbeing_validate BEFORE INSERT OR UPDATE ON public.wellbeing_checkins
FOR EACH ROW EXECUTE FUNCTION public.validate_wellbeing();
