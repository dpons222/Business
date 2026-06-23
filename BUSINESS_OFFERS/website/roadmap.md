# DigiDap Website Roadmap

This roadmap tracks future improvements for the DigiDap public credibility site.

The site should stay simple until outreach creates stronger proof. Add sections only when they make the site more credible, clearer, or easier to act on.

## Current Positioning

DigiDap helps local service businesses turn one offer or customer workflow into a clear page, faster response path, and simple tracking system.

## Current Site Goals

- [x] Explain what DigiDap does in plain language.
- [x] Keep the first version broad enough for landing pages, lead response, automations, and tracking.
- [x] Avoid naming implementation tools unless a client needs technical detail.
- [x] Offer a private sample concept instead of exposing prospect demos publicly.
- [x] Provide a direct email contact path.
- [x] Add basic sample concept request form UI.
- [x] Create Supabase project and `leads` table schema.
- [x] Create draft n8n workflow for sample concept lead capture.
- [x] Document the lead capture workflow in `AUTOMATIONS/digidap-lead-capture/`.

## Near-Term Improvements

- [ ] Move the draft n8n workflow into the `DigiDap` n8n folder if it is not already there.
- [x] Add the Supabase credential to the draft n8n workflow.
- [x] Reconnect the Gmail credential in n8n.
- [x] Retest the draft workflow with sample webhook data.
- [x] Publish the n8n lead capture workflow.
- [x] Connect the sample concept form to the n8n production webhook.
- [x] Store form submissions in a Supabase `leads` table.
- [x] Send an email notification when a new lead is submitted.
- [x] Add basic spam protection with a honeypot field.
- [x] Deploy the DigiDap site to its own Vercel project/domain.
- [x] Test the website form from a normal browser after deployment.
- [ ] Add a small founder photo or personal credibility block when there is a suitable image.
- [ ] Add one short example summary after a real client or approved public demo exists.
- [ ] Add a roofing-specific page if roofing outreach continues beyond the first batch.
- [ ] Add a simple FAQ covering timeline, sample concept scope, client access, and implementation handoff.
- [ ] Add a short "what happens after you email" note if prospects ask about the next step.

## Proof To Add Later

- [ ] Approved client quote or testimonial.
- [ ] Before-and-after screenshots from an approved project.
- [ ] Short case-study style result summary, using conservative language.
- [ ] Public list of systems DigiDap can support, grouped by outcome rather than tool name.

## Deferred

- [ ] Public pricing.
- [ ] Multi-vertical pages for plumbing, dental, real estate, HVAC, or other markets.
- [ ] Blog or content hub.
- [ ] Self-serve payment or checkout.
- [ ] Public portfolio grid.

## Decision Rules

- Do not add broad agency language unless the offer becomes broader through real validation.
- Do not publish unpaid prospect demos without approval.
- Keep tool names secondary to business outcomes.
- Prefer one strong approved example over several weak examples.
- Keep the homepage focused on credibility and contact, not full service documentation.
