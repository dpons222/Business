# Product

Use this folder for the landing page product strategy and demo planning.

## Files

- `landing-page-spec.md`: page goals, UX rules, visual direction, and guardrails.
- `base-copy-deck.md`: reusable landing page copy.
- `base-wireframe.md`: reusable page structure.
- `personalization-rules.md`: how to lightly tailor demos per prospect.
- `personalized-demo-template.md`: reusable format for prospect-specific previews.
- `personalized-demos/`: prospect-specific demo briefs created before coding or outreach.
- `demo-app/`: reusable coded landing page demo driven by prospect data.

## Personalized Demo Briefs

- `personalized-demos/final-cut-roofing-demo.md`: first coded demo brief.
- `personalized-demos/charger-roofing-demo.md`: Charger Roofing high-priority prospect brief.
- LOA Construction is implemented directly in the reusable demo app as a light prospect data object.

See `demo-app/README.md` for the multi-prospect demo system approach: one reusable app, shared page components, and separate prospect data/assets for each business.
The demo app also documents the internal template/variant set used to choose one best-fit demo direction per prospect. Variants should be complete, polished landing pages rather than simplified previews.

The demo app now supports two demo conventions:

- focused landing page: best when the prospect needs a clearer campaign page.
- assessment / intake flow: best when the prospect already has educational content that can become a practical inspection tool.

Charger Roofing currently has both conventions available for internal comparison:

- `/prospects/charger-roofing`: urgent storm response landing page.
- `/prospects/charger-roofing/assessment`: assessment / intake flow.

LOA Construction uses the focused landing page convention:

- `/prospects/loa-construction`: Austin hail inspection landing page.
- `/loa-construction`: clean client-facing alias if deployed.

Integrity First Roofing & Construction uses the focused landing page convention:

- `/prospects/integrity-first`: Frisco storm damage campaign page.
- `/integrity-first`: clean client-facing alias.

EDP Roofing uses the focused landing page convention:

- `/prospects/edp-roofing`: Dallas storm damage roofer request page.
- `/edp-roofing`: clean client-facing alias.

Proper Roofing uses the focused landing page convention:

- `/prospects/proper-roofing`: Greater Houston first-step storm inspection page.
- `/proper-roofing`: clean client-facing alias.

Use shadcn/ui for forms, stateful controls, accordions, badges, and assessment UI where it improves quality. Do not use it as a generic skin over the same repeated layout.

## Rule

Plan and personalize before coding. Do not build a full custom page for a prospect before there is buying interest.
