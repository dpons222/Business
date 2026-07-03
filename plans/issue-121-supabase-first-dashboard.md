# Issue 121 - Supabase-First Dashboard

## Goal

Make Supabase `public.prospects` the primary source for dashboard prospect rows while preserving local coded demo metadata for routes, logos, and static demo support.

## Current Problem

The dashboard still depends on `demoEntries` as a major registry concept. Supabase-only rows now appear, but the code still treats local static demo entries and Supabase dashboard entries as separate sources to merge. That makes the system harder to reason about and risks future prospects requiring code edits.

## Desired Shape

- Supabase prospects provide the dashboard row list.
- Local coded demos provide optional enrichment keyed by `prospect_slug`.
- Local fallback entries remain available only when Supabase is unavailable or a local-only demo has no database row yet.
- Approval and follow-up logic stays backed by Supabase rows.

## Checklist

- [x] Confirm `main` can safely fast-forward to `develop`.
- [x] Fast-forward `main` to `develop`, push, and switch back to `develop`.
- [x] Create GitHub issue `#121`.
- [x] Add issue session-start comment.
- [x] Inspect current dashboard and prospect draft loading code.
- [x] Introduce local demo metadata/enrichment map.
- [x] Make Supabase dashboard entries primary.
- [x] Preserve local fallback entries for demos missing Supabase rows.
- [x] Update dashboard labels/types if needed.
- [x] Validate with `npm run build`.
- [x] Verify dashboard render includes med spas and existing demo rows.
- [x] Commit, push, and deploy if validation passes.

## Validation Notes

- `npm run build` passed in `EXPERIMENTS/001-roofing-landing-page-service/product/demo-app`.
- Local production server on port `3108` returned HTTP `200` for authenticated `/dashboard` and `/prospects`.
- Dashboard render check confirmed `Med spa prospects`, `Med Spas`, `Chandler Med Spa`, `Elixir Medical Spa`, `Skin Savvy Aesthetics`, `Pizabella / Pizza Bella`, and `Charger Roofing`.
- `/prospects` render check confirmed Supabase med spa rows and local fallback demo rows.
