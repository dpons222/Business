# Issue 76: Local Restaurant Landing Page Experiment

## Objective

Create a new validation experiment for local restaurants, modeled after the roofing landing page service experiment but tailored to restaurant-specific offers, buying triggers, prospect research, demo content, and outreach.

## GitHub Issue

- Issue: https://github.com/dpons222/Business/issues/76
- Branch: `issue-76-restaurant-landing-page-experiment`
- Base commit: `03919dcb79d47585c704c0d543a1a5e286c50925`

## Scope

In scope:

- Create `EXPERIMENTS/002-restaurant-landing-page-service/`.
- Add experiment planning, offer, validation, research, and finance docs.
- Add restaurant-specific marketing, prospect tracking, outreach, and discovery call docs.
- Add product planning docs for a reusable personalized restaurant demo page.
- Update `EXPERIMENTS/README.md` navigation.

Out of scope:

- Building demo app code.
- Researching real restaurant prospects.
- Sending outreach.
- Adding n8n or Supabase automation changes.

## Implementation Checklist

- [x] Create GitHub issue and issue branch.
- [x] Create implementation plan.
- [x] Create restaurant experiment folder and core docs.
- [x] Create marketing and prospect tracking docs.
- [x] Create product and personalization docs.
- [x] Update experiment navigation.
- [x] Validate docs and conservative claim language.
- [ ] Commit, push, and open PR.

## Validation Plan

- Run `git diff --check`.
- Search new docs for unsafe claims such as guaranteed revenue, reservations, rankings, or leads.
- Confirm expected experiment files exist.

## Risks

- Restaurant owners receive many marketing pitches, so outreach needs a specific operational angle.
- Generic restaurant website redesigns are too broad; the first wedge should focus on a high-value action.
- The offer must avoid implying guaranteed reservations, orders, event bookings, revenue, or search rankings.

## Recommended Wedge

Start with focused campaign pages for higher-value restaurant actions:

- catering inquiries,
- private dining requests,
- large-party bookings,
- seasonal reservation campaigns,
- online ordering or takeout campaigns.

Recommended first wedge: private dining, catering, and group event inquiry pages. This targets higher-ticket opportunities and gives the restaurant a clear reason to care about a focused landing page instead of a generic redesign.
