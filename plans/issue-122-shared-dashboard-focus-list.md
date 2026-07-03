# Issue 122 - Shared Dashboard Focus List

## Goal
Replace the dashboard's single local current-focus business with a global Supabase-backed focus list that can hold multiple businesses, falls back to localStorage when remote persistence is unavailable, and supports add/remove/clear actions from the dashboard.

## Decisions
- The focus list is global for the dashboard, not per user.
- There is no cap on the number of focused businesses.
- Focus order is newest first.
- Supabase is the preferred shared source of truth.
- localStorage remains a fallback and migration path from the old single-focus key.

## Checklist
- [x] Create and link GitHub Issue #122.
- [x] Inspect existing dashboard, Supabase, and API patterns.
- [x] Add Supabase persistence for the global focus list.
- [x] Add localStorage fallback and old single-focus migration.
- [x] Replace the Current focus UI with a multi-item Focus list.
- [x] Add Add to Focus / Remove from Focus controls to prospect cards.
- [x] Add Clear Focus.
- [x] Validate build and behavior.
- [x] Commit, sync, and deploy.

## Validation Notes
- Supabase migration `add_dashboard_focus_items` applied successfully.
- `npm run build` passed in `EXPERIMENTS/001-roofing-landing-page-service/product/demo-app`.
- `git diff --check` passed.
- Server-side Supabase helper add/get/remove cycle passed for `charger-roofing`, and the table was left empty after the test.
- Authenticated `/api/dashboard-focus` route GET/add/remove cycle passed locally through `next start`.
- Local dashboard screenshots verified the Focus list on desktop and mobile portrait widths.
- Commit `757c674` was pushed to `develop`.
- Production deploy `dpl_7927PykmCKdAaBk1qLG5uASDuZRo` completed and was aliased to `https://local-growth-preview.vercel.app`.
- Production `/api/dashboard-focus` GET/add/remove cycle passed and left the shared Focus list empty after testing.
- Production dashboard screenshots verified the Focus list on desktop and mobile widths.
