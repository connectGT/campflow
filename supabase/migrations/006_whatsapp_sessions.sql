-- ============================================================
-- MIGRATION 006: WhatsApp Session Tracking
-- Safe to run on existing DB
-- ============================================================

CREATE TABLE IF NOT EXISTS public.whatsapp_sessions (
  phone       text PRIMARY KEY,
  state       text DEFAULT 'start',
  name        text,
  last_msg_at timestamptz DEFAULT now(),
  data        jsonb DEFAULT '{}'
);

ALTER TABLE public.whatsapp_sessions ENABLE ROW LEVEL SECURITY;

-- Only service role can read/write sessions (called from webhook API)
CREATE POLICY IF NOT EXISTS "Service role full access for wa sessions"
  ON public.whatsapp_sessions FOR ALL
  USING (true);

-- ============================================================
-- DONE ✅
-- ============================================================
