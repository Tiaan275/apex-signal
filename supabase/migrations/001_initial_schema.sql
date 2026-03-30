-- ════════════════════════════════════════════════════════════════
--  Apex Signal — Initial Schema
--  Run this in Supabase → SQL Editor before first deployment.
--  All tables use UUID primary keys and timestamptz for all dates.
-- ════════════════════════════════════════════════════════════════

-- ─── Extension ───────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── waitlist_submissions ────────────────────────────────────────
-- Stores every waitlist signup from the landing page.
-- Duplicate emails are handled with ON CONFLICT DO UPDATE so the
-- name and source always reflect the latest submission.
CREATE TABLE IF NOT EXISTS waitlist_submissions (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  email       TEXT        NOT NULL,
  name        TEXT,
  source      TEXT        NOT NULL DEFAULT 'landing_page',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT waitlist_submissions_email_unique UNIQUE (email)
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER waitlist_submissions_updated_at
  BEFORE UPDATE ON waitlist_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Useful index for admin queries
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at
  ON waitlist_submissions (created_at DESC);

-- ─── contact_submissions ─────────────────────────────────────────
-- Stores every contact form submission.
CREATE TABLE IF NOT EXISTS contact_submissions (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  subject     TEXT        NOT NULL,
  message     TEXT        NOT NULL,
  status      TEXT        NOT NULL DEFAULT 'new',   -- new | read | replied
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_contact_created_at
  ON contact_submissions (created_at DESC);

-- ─── analytics_events ────────────────────────────────────────────
-- Phase 2: persistent analytics store.
-- In Phase 1 events are held in memory (see /api/admin/analytics).
-- Create this table now so the route can optionally write to it.
CREATE TABLE IF NOT EXISTS analytics_events (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  event       TEXT        NOT NULL,
  page        TEXT,
  session_id  TEXT,                                  -- optional client session
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_event
  ON analytics_events (event, created_at DESC);

-- ─── Row Level Security ───────────────────────────────────────────
-- All tables are private by default. The API uses the service role
-- key (bypasses RLS), so no policies are needed for server routes.
-- Anon users cannot read or write any of these tables directly.
ALTER TABLE waitlist_submissions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions   ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events      ENABLE ROW LEVEL SECURITY;

-- ─── Helpful view for admin dashboard ────────────────────────────
CREATE OR REPLACE VIEW waitlist_summary AS
SELECT
  COUNT(*)                                    AS total_signups,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days')
                                              AS signups_last_7d,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '24 hours')
                                              AS signups_last_24h,
  MIN(created_at)                             AS first_signup,
  MAX(created_at)                             AS latest_signup
FROM waitlist_submissions;
