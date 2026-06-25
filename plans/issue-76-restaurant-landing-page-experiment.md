# Issue 76: Local Restaurant Growth Systems Experiment

## Objective

Create a new validation experiment for local restaurants, modeled after the roofing experiment's prospect-driven workflow but broadened into personalized restaurant recommendations instead of one fixed deliverable.

## GitHub Issue

- Issue: https://github.com/dpons222/Business/issues/76
- Branch: `issue-76-restaurant-landing-page-experiment`
- Base commit: `03919dcb79d47585c704c0d543a1a5e286c50925`

## Scope

In scope:

- Create `EXPERIMENTS/002-restaurant-growth-systems/`.
- Add experiment planning, offer, validation, research, and finance docs.
- Add restaurant-specific marketing, prospect tracking, outreach, and discovery call docs.
- Add product planning docs for a personalized recommendation framework and solution module menu.
- Include landing pages as one possible module, not the default answer for every restaurant.
- Update `EXPERIMENTS/README.md` navigation.

Out of scope:

- Building demo app code.
- Researching real restaurant prospects.
- Sending outreach.
- Adding n8n or Supabase automation changes.

## Implementation Checklist

- [x] Create GitHub issue and issue branch.
- [x] Create implementation plan.
- [x] Create initial restaurant experiment folder and docs.
- [x] Correct experiment scope from one fixed service to personalized recommendations.
- [x] Rename experiment folder to `002-restaurant-growth-systems`.
- [x] Create marketing and prospect tracking docs.
- [x] Create product recommendation framework and solution module docs.
- [x] Update experiment navigation.
- [x] Validate docs and conservative claim language after restructure.
- [ ] Commit, push, and update PR.

## Validation Plan

- Run `git diff --check`.
- Search new docs for unsafe claims such as guaranteed revenue, reservations, rankings, review ratings, or leads.
- Confirm expected experiment files exist at the renamed path.
- Confirm no restaurant docs still describe the experiment as one fixed service.

## Risks

- A flexible offer can become vague if each recommendation is not specific.
- Too many modules can create delivery complexity before demand is proven.
- Restaurant owners receive many marketing pitches, so outreach needs one concrete observed opportunity.
- The offer must avoid implying guaranteed reservations, orders, event bookings, revenue, review ratings, or search rankings.

## Recommendation Model

Start with diagnosis, then choose one module:

- catering or private dining inquiry page,
- restaurant email/SMS promo automation,
- Google Business Profile, menu, and ordering link cleanup,
- online ordering conversion audit,
- event or private dining lead tracking system,
- review response and reputation workflow,
- weekly specials content automation,
- birthday, loyalty, or lapsed-guest reactivation campaign,
- restaurant website and menu cleanup package,
- focused landing page or campaign page when that is the best fit.

The first outreach batch should assign one recommendation category per restaurant before creating demos or drafts.
