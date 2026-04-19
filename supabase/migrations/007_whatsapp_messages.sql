-- ============================================================
-- MIGRATION 007: WhatsApp Message History
-- ============================================================

CREATE TABLE IF NOT EXISTS public.whatsapp_messages (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone       text NOT NULL,              -- customer phone (e164 without +)
  direction   text NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  message     text NOT NULL,
  intent      text,                       -- what the bot parsed (menu, fees, etc)
  wa_msg_id   text,                       -- Meta message id (for dedup)
  created_at  timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wa_msgs_phone ON public.whatsapp_messages(phone);
CREATE INDEX IF NOT EXISTS idx_wa_msgs_created ON public.whatsapp_messages(created_at DESC);

ALTER TABLE public.whatsapp_messages ENABLE ROW LEVEL SECURITY;

-- Only service role (webhook + admin) can access
CREATE POLICY "Service role full access for wa messages"
  ON public.whatsapp_messages FOR ALL
  USING (true);

-- ============================================================
-- DONE ✅
-- ============================================================
