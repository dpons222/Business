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

Rivertop Roofing uses the focused landing page convention:

- `/prospects/rivertop-roofing`: Plano storm inspection landing page.
- `/rivertop-roofing`: clean client-facing alias if deployed.

StormVets uses the focused landing page convention:

- `/prospects/stormvets`: Frisco storm inspection landing page.
- `/stormvets`: clean client-facing alias if deployed.

Brotherhood Roofing uses the focused landing page convention:

- `/prospects/brotherhood-roofing`: DFW hail and storm inspection landing page.
- `/brotherhood-roofing`: clean client-facing alias if deployed.

Matthew Lorand Roofing uses the focused landing page convention:

- `/prospects/matthew-lorand-roofing`: Austin storm damage inspection landing page.
- `/matthew-lorand-roofing`: clean client-facing alias if deployed.

Integrity First Roofing & Construction uses the focused landing page convention:

- `/prospects/integrity-first`: Frisco storm damage campaign page.
- `/integrity-first`: clean client-facing alias.

EDP Roofing uses the focused landing page convention:

- `/prospects/edp-roofing`: Dallas storm damage roofer request page.
- `/edp-roofing`: clean client-facing alias.

Proper Roofing uses the focused landing page convention:

- `/prospects/proper-roofing`: Greater Houston first-step storm inspection page.
- `/proper-roofing`: clean client-facing alias.

Remaining leads batch 1 uses the focused landing page convention:

- `/prospects/arrington-roofing`: North Texas storm damage inspection page.
- `/arrington-roofing`: clean client-facing alias.
- `/prospects/phoenix-storm-restoration`: Fort Worth emergency storm inspection page.
- `/phoenix-storm-restoration`: clean client-facing alias.
- `/prospects/dynasty-roofing`: Houston post-storm inspection page.
- `/dynasty-roofing`: clean client-facing alias.
- `/prospects/sixth-gen-roofing`: Austin certified inspection page.
- `/sixth-gen-roofing`: clean client-facing alias.
- `/prospects/on-point-roofing`: Plano free inspection page.
- `/on-point-roofing`: clean client-facing alias.

Remaining leads final batch uses the focused landing page convention:

- `/prospects/proclaim-roofing-houston`: Houston storm inspection page for Proclaim Roofing Houston.
- `/proclaim-roofing-houston`: clean client-facing alias.
- `/prospects/tsg-roofing`: Texas storm inspection page for TSG Roofing.
- `/tsg-roofing`: clean client-facing alias.
- `/prospects/veritas-roofing`: Fort Worth storm inspection page for Veritas Roofing.
- `/veritas-roofing`: clean client-facing alias.
- `/prospects/houston-roofing-construction`: Houston storm inspection page for Houston Roofing & Construction.
- `/houston-roofing-construction`: clean client-facing alias.
- `/prospects/elevated-roofing`: Fort Worth storm inspection page for Elevated Roofing.
- `/elevated-roofing`: clean client-facing alias.
- `/prospects/firefighter-roofing`: Fort Worth storm inspection page for Firefighter Roofing.
- `/firefighter-roofing`: clean client-facing alias.
- `/prospects/sugar-roofing`: Houston storm inspection page for Sugar Roofing.
- `/sugar-roofing`: clean client-facing alias.
- `/prospects/texas-direct-roofing-construction`: Dallas-Fort Worth storm inspection page for Texas Direct Roofing & Construction.
- `/texas-direct-roofing-construction`: clean client-facing alias.
- `/prospects/rescue-roofing-texas`: Dallas County storm inspection page for Rescue Roofing Texas.
- `/rescue-roofing-texas`: clean client-facing alias.
- `/prospects/rhino-roofers`: San Antonio storm inspection page for Rhino Roofers.
- `/rhino-roofers`: clean client-facing alias.
- `/prospects/texas-star-roofing-construction`: San Antonio storm inspection page for Texas Star Roofing & Construction.
- `/texas-star-roofing-construction`: clean client-facing alias.
- `/prospects/invictus-roofing`: Frisco storm inspection page for Invictus Roofing.
- `/invictus-roofing`: clean client-facing alias.
- `/prospects/ripple-roofing`: Waco storm inspection page for Ripple Roofing.
- `/ripple-roofing`: clean client-facing alias.
- `/prospects/pappas-roofing-and-construction`: Plano storm inspection page for Pappas Roofing and Construction.
- `/pappas-roofing-and-construction`: clean client-facing alias.
- `/prospects/cloud-roofing`: San Antonio storm inspection page for Cloud Roofing.
- `/cloud-roofing`: clean client-facing alias.

Use shadcn/ui for forms, stateful controls, accordions, badges, and assessment UI where it improves quality. Do not use it as a generic skin over the same repeated layout.

## Rule

Plan and personalize before coding. Do not build a full custom page for a prospect before there is buying interest.
