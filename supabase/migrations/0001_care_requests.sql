-- =============================================================================
-- Lean On Me Caregiving Services — care_requests schema + Row Level Security
-- Run this in the Supabase SQL Editor (or via the Supabase CLI).
-- =============================================================================

-- Needed for gen_random_uuid()
create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Table
-- ---------------------------------------------------------------------------
create table if not exists public.care_requests (
  id                        uuid primary key default gen_random_uuid(),
  inquiry_number            text unique not null,
  first_name                text not null,
  last_name                 text not null,
  date_of_birth             date,
  phone                     text not null,
  email                     text not null,
  address                   text,
  city                      text,
  state                     text,
  zip_code                  text,
  relationship              text,
  service_types             text[] default '{}',
  preferred_contact_method  text,
  best_contact_time         text,
  requested_start_date      date,
  message                   text,
  emergency_level           text,
  status                    text not null default 'New'
                              check (status in (
                                'New','Contacted','Assessment Scheduled',
                                'Pending Documents','Medicaid Review','Housing Waitlist',
                                'Approved','Active','Closed','Not Eligible'
                              )),
  admin_notes               text,
  -- Assisted / completed-care archive tracking
  assisted                  boolean not null default false,
  assisted_at               timestamptz,
  assisted_by               text,
  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now()
);

create index if not exists care_requests_status_idx  on public.care_requests (status);
create index if not exists care_requests_created_idx on public.care_requests (created_at desc);
create index if not exists care_requests_assisted_idx on public.care_requests (assisted);

-- ---------------------------------------------------------------------------
-- Keep updated_at fresh on every change
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_care_requests_updated_at on public.care_requests;
create trigger trg_care_requests_updated_at
  before update on public.care_requests
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
--   * Public (anon) may ONLY insert new care requests.
--   * Public may NOT select / update / delete.
--   * Authenticated administrators may do everything.
--   * The service-role key bypasses RLS and is used only by server functions.
-- ---------------------------------------------------------------------------
alter table public.care_requests enable row level security;

-- Remove any prior policies (safe to re-run)
drop policy if exists "public can insert care requests"      on public.care_requests;
drop policy if exists "authenticated can read care requests" on public.care_requests;
drop policy if exists "authenticated can update care requests" on public.care_requests;
drop policy if exists "authenticated can delete care requests" on public.care_requests;

-- Public visitors: INSERT only.
create policy "public can insert care requests"
  on public.care_requests
  for insert
  to anon, authenticated
  with check (true);

-- Authenticated admins: full read.
create policy "authenticated can read care requests"
  on public.care_requests
  for select
  to authenticated
  using (true);

-- Authenticated admins: update.
create policy "authenticated can update care requests"
  on public.care_requests
  for update
  to authenticated
  using (true)
  with check (true);

-- Authenticated admins: delete.
create policy "authenticated can delete care requests"
  on public.care_requests
  for delete
  to authenticated
  using (true);

-- =============================================================================
-- NOTE ON ADMIN USERS
-- Create admin accounts in the Supabase Dashboard:
--   Authentication -> Users -> "Add user" (email + password).
-- Consider disabling public sign-ups:
--   Authentication -> Providers -> Email -> turn OFF "Enable sign-ups"
-- so only invited administrators can exist.
-- =============================================================================
