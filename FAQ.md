# What order are my automations / skills?

1. **niche-growth-system-builder**

   Decide the niche, offer angle, buyer pain, likely recommendation type, and what kind of demo or growth asset is worth testing.

2. **lead-growth-pipeline**

   Find businesses, qualify them, inspect their sites, choose the best recommendation per prospect, create prospect packages/tracker rows, build only the needed demo asset, and prepare draft-only outreach.

3. **prospect-demo-qa**

   Check the live demo and email draft against the real business site before outreach. This is the pre-send quality gate.

4. **Manual approval/send**

   You review the recipient, draft, demo URL, and contact method. Then either you send manually or later approve it for an automation flow.

## Example prompts

### 1. niche-growth-system-builder

Use this when you are deciding what niche, offer, or opportunity to pursue.

- Use niche-growth-system-builder to help me choose a local business niche for my next growth experiment.
- Use niche-growth-system-builder to compare roofing, HVAC, med spas, dentists, and remodelers and recommend which niche I should test first.
- Use niche-growth-system-builder to inspect this business niche and suggest the best productized service opportunity.
- Use niche-growth-system-builder to evaluate whether restaurants are a good niche for landing page or ordering-flow improvement offers.
- Use niche-growth-system-builder to brainstorm growth-system offers for local businesses that could be validated quickly.
- Use niche-growth-system-builder to help me decide what kind of demo or preview asset would be most valuable for this niche.

### 2. lead-growth-pipeline

Use this when you are ready to find businesses, qualify prospects, create packages, update trackers, and prepare outreach drafts.

- Use lead-growth-pipeline to find 25 roofing businesses in Texas that could be good prospects for a storm inspection landing page offer.
- Use lead-growth-pipeline to qualify these businesses and tell me which ones are worth building demos for.
- Use lead-growth-pipeline to create prospect packages for these businesses and update the tracker.
- Use lead-growth-pipeline to inspect these prospect websites and choose one primary recommendation for each.
- Use lead-growth-pipeline to prepare draft-only outreach emails for the prospects that are ready.
- Use lead-growth-pipeline to update Supabase and local tracker state for the prospects that have verified emails.
- Use lead-growth-pipeline to prepare the next outreach batch, but do not send anything.

### 3. prospect-demo-qa

Use this before outreach to check whether the demo and draft are accurate, polished, and safe to send.

- Use prospect-demo-qa to review this demo against the original business website and tell me if it is ready to send.
- Use prospect-demo-qa for Rivertop Roofing and verify the demo, email draft, source claims, logo, colors, CTA, and contact details.
- Use prospect-demo-qa to check these 10 businesses before outreach and flag anything that needs changing.
- Use prospect-demo-qa to verify that the email draft accurately matches the business, demo page, and source website.
- Use prospect-demo-qa to inspect the mobile and desktop layout of this demo before I contact the business.
- Use prospect-demo-qa to compare the public demo page against the source site and make sure there are no unsupported claims.
- Use prospect-demo-qa and only report findings first. Do not make changes yet.

### 4. Manual approval/send

Use this when you are personally reviewing or recording outreach. This step is not really a skill; it is the human approval/send step.

- I reviewed this draft and sent it manually to the business. Update Supabase and the tracker as contacted.
- I contacted this business through their contact form. Mark it as contacted manually and set a follow-up for 7 days.
- I approved this prospect for Gmail draft creation. Update the dashboard/Supabase status if needed.
- I sent this email manually to hello@example.com. Record the send channel, date contacted, and follow-up date.
- I contacted this business by phone. Mark it as contacted manually and add this note: [your note].
- I decided not to contact this prospect. Mark it skipped and add the reason.
- I want to review the exact recipient, subject, body, and demo URL before approving this outreach.

For the first three, explicitly naming the skill is useful. For the manual approval/send step, be very specific about what actually happened because that step changes your source-of-truth outreach status.
