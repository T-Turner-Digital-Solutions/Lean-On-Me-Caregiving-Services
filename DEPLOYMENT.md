# Lean On Me Caregiving Services — Setup & Deployment Guide

This document contains everything needed to configure, deploy, and operate the
website. Follow the sections in order.

---

## 1. Tech Stack

- **React + Vite + TypeScript** — frontend
- **Tailwind CSS** — luxury styling
- **Supabase** — database (Postgres) + authentication
- **Netlify Functions** — secure server-side API (form submission + email)
- **Resend** — transactional email

Build command: `npm run build` · Publish directory: `dist` · Functions dir: `netlify/functions`

---

## 2. Local Development

```bash
npm install
cp .env.example .env      # then fill in real values
npm run dev               # http://localhost:5173
```

> Note: Netlify Functions (`/api/*`) only run under `netlify dev` (install the
> Netlify CLI: `npm i -g netlify-cli`, then run `netlify dev`). With plain
> `npm run dev`, the public pages work but form submission needs the functions.

---

## 3. Supabase Setup

1. Create a project at https://supabase.com.
2. Open **SQL Editor** and run the migration in
   `supabase/migrations/0001_care_requests.sql`. This creates the
   `care_requests` table, the `updated_at` trigger, and **Row Level Security**
   policies.
3. RLS summary (already in the SQL):
   - Public (anon) visitors can **INSERT only** — they cannot read, edit, or
     delete records, and cannot see admin notes.
   - Authenticated admins can read / update / delete.
   - The **service-role key** (used only by Netlify Functions) bypasses RLS for
     trusted server inserts.
4. Find your keys in **Project Settings → API**:
   - `Project URL` → `VITE_SUPABASE_URL` and `SUPABASE_URL`
   - `anon public` key → `VITE_SUPABASE_ANON_KEY` and `SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (**server-only, secret**)

### Create a secure admin user
1. Supabase Dashboard → **Authentication → Users → Add user**.
2. Enter the admin's email + a strong password. (There is **no** frontend-only
   password; login is real Supabase Auth.)
3. Recommended: **Authentication → Providers → Email → turn OFF "Enable
   sign-ups"** so only invited administrators can exist.
4. The admin signs in at `/admin` and is redirected to `/admin/dashboard`.

---

## 4. Resend (Email) Setup

1. Create an account at https://resend.com.
2. Add and **verify your sending domain** (or use a verified address).
3. Create an API key → set `RESEND_API_KEY`.
4. Set `RESEND_FROM_EMAIL` to a verified address (e.g. `care@yourdomain.org`).
5. `ADMIN_NOTIFICATION_EMAIL` is where new-request notifications go
   (defaults to `info@leanonmecargiving.org`).

Email templates included (in `netlify/functions/_shared.ts`):
- New care-request notification (to admin)
- Applicant confirmation (to applicant)
- Housing-interest submission (to admin, sent when a housing option is selected)
- General contact submission (to admin)

> If Resend is not configured yet, form submissions still succeed — email is
> best-effort and simply skipped with a server log warning.

---

## 5. Environment Variables Checklist

Set these in **Netlify → Site settings → Environment variables** (and in `.env`
locally). See `.env.example` for the annotated list.

| Variable | Where | Secret? | Purpose |
| --- | --- | --- | --- |
| `VITE_SUPABASE_URL` | client + build | no | Supabase URL |
| `VITE_SUPABASE_ANON_KEY` | client + build | no (RLS-protected) | Supabase anon key |
| `VITE_SITE_URL` | build | no | Canonical/OG base URL |
| `SUPABASE_URL` | functions | no | Supabase URL (server) |
| `SUPABASE_ANON_KEY` | functions | no | Supabase anon key (server) |
| `SUPABASE_SERVICE_ROLE_KEY` | functions | **YES** | Full DB access (server only) |
| `RESEND_API_KEY` | functions | **YES** | Resend API key |
| `RESEND_FROM_EMAIL` | functions | no | Verified "from" address |
| `ADMIN_NOTIFICATION_EMAIL` | functions | no | Where notifications go |

**Never** commit real secrets. `.env` is git-ignored. The service-role and
Resend keys are only ever read inside `netlify/functions/` (server-side).

---

## 6. Netlify Deployment

1. Push this repository to GitHub (already connected).
2. In Netlify: **Add new site → Import from Git** → select the repo.
3. Confirm build settings (also encoded in `netlify.toml`):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`
4. Add all environment variables from Section 5.
5. Deploy. `netlify.toml` already configures the SPA redirect and the
   `/api/* → /.netlify/functions/*` proxy.

---

## 7. Media Upload Instructions

**Videos** → `public/videos/` (see `public/videos/README.md`)
- `lean-on-me-hero.mp4` — homepage hero (muted, autoplay, loop, playsInline;
  presented silenced with an on-screen statement).
- `lean-on-me-story.mp4` — "Care That Feels Like Family" split section.
- Optimize before upload (~1080p, target < ~10 MB) so the site stays fast.

**Images** → `public/images/` (see `public/images/README.md`)
- `lean-on-me-hero.jpg` — hero poster/fallback + social share image
  (1920×1080, optimized JPG < ~300 KB).

The homepage automatically falls back to the poster image if a video can't load.

---

## 8. "Ask Lean On Me" Assistant

A polished, **rule-based** assistant ships today (`src/components/ChatAssistant.tsx`).
It answers from approved website content only and includes quick actions
(Request Care, Medicaid, Housing, Sign Up, FAQ, Call). It never diagnoses,
guarantees eligibility/approval/placement, or collects sensitive identifiers,
and it directs emergencies to 911.

To add real AI later: create a Netlify Function (e.g. `ask-assistant.ts`) that
holds the AI API key server-side, and replace `generateReply()` with a `fetch`
to that endpoint. **Never** put an AI API key in the frontend.

---

## 9. Information Still Needed From the Business Owner

The site intentionally avoids inventing facts. Please provide:
- Business hours
- Physical address / service area (and map embed, if any)
- Owner name, staff credentials, licenses/certifications (only if you want them
  displayed and they are verifiable)
- Real, consented testimonials to replace the labeled placeholders
- Final logo / favicon and brand imagery
- The two completed videos and the hero image
- Confirmation of the sending domain for Resend
- Whether HIPAA/BAA arrangements exist (the site currently makes **no** HIPAA
  claim by design)
