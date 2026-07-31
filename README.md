# Lean On Me Caregiving Services

Lean On Me Caregiving Services provides compassionate, reliable, non-medical
care for seniors, adults with disabilities, veterans, and individuals recovering
at home — supporting daily living needs while promoting comfort, safety,
dignity, independence, and peace of mind for families.

This repository contains the complete luxury website: a responsive marketing
site, a secure care-request workflow, a protected admin dashboard, and
serverless email integration.

---

## Quick start

```bash
npm install
cp .env.example .env   # fill in real values
npm run dev
```

Full configuration and deployment steps are in **[DEPLOYMENT.md](./DEPLOYMENT.md)**.

- **Build:** `npm run build`  ·  **Publish dir:** `dist`
- **Stack:** React · Vite · TypeScript · Tailwind CSS · Supabase · Netlify Functions · Resend

---

## What's included

### Pages
- **Home** — hero video, mission statement, second "story" video (split-screen),
  why-choose cards, services overview, Medicaid + housing previews, testimonials
  (clearly labeled placeholders), and a bold closing CTA.
- **About Us** — mission, values, who we serve, commitment to families, why Lean On Me.
- **Services** — in-home assistance, veteran support, elderly support.
- **Medicaid Assistance** — with honest eligibility caveats + "Check Care Eligibility".
- **Veteran & Elderly Housing** — with "Ask About Housing" + interest-list CTAs.
- **FAQ** — accordion with 15 careful, non-guaranteeing answers.
- **Sign Up** — multi-step care-request form with required consent checkboxes.
- **Contact** — contact form, clickable phone/email, map & hours placeholders, emergency notice.
- **Admin Login + Dashboard** — Supabase Auth, protected routes.
- **Legal** — Privacy, Terms, Accessibility, Care Services Disclaimer, AI Assistant Disclaimer.
- **404** — professional not-found page.

### Functionality
- Care requests saved to Supabase with a unique inquiry number, status `New`,
  and timestamps.
- Email notifications (admin + applicant, plus housing-interest) via Resend.
- Admin dashboard: summary cards, search, status/service filters, date sort,
  view/edit/delete (with confirm modal), status changes, private admin notes,
  CSV export, secure logout.
- **Assisted / completed-care tracking**: Mark as Assisted (with confirmation),
  grayed row + checkmark + badge, sorted below active requests, Active/Assisted/
  All views, an Assisted summary card, restore (with confirmation), never deleted.
- **"Ask Lean On Me"** floating rule-based assistant with quick actions and
  safety guardrails (structured for a future secure AI API).

### Security & integrity
- Row Level Security: public can only INSERT care requests; admins (authenticated)
  can read/edit/delete. Service-role key is server-side only.
- No secrets in the frontend; `.env` is git-ignored; `.env.example` documents names.
- No invented licenses, credentials, statistics, addresses, or guarantees.
- Accessibility: semantic HTML, labeled forms, keyboard nav, focus states,
  reduced-motion support, skip link.
- SEO: meta + Open Graph tags, `robots.txt`, `sitemap.xml`, JSON-LD.

---

## Media placeholders

Add the owner-provided files (the code references these exact paths):
- `public/videos/lean-on-me-hero.mp4`
- `public/videos/lean-on-me-story.mp4`
- `public/images/lean-on-me-hero.jpg`

See the READMEs in those folders for specs.

---

_Website managed by T. Turner Digital Solutions. For emergencies, call 911._
