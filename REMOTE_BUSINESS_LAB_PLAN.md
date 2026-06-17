# Remote Business Lab Plan

## Purpose

This project is a remote business lab: a structured place to collect, research, validate, build, and operate business ideas that can be created or accelerated with Codex and AI.

The focus is on remote-friendly businesses that can generate income through websites, apps, digital assets, ecommerce, social media, marketing systems, automation, and other AI-assisted products or services.

## Business Criteria

A business idea is worth considering if it is:

- Remote-friendly and compatible with travel
- Low startup cost
- Possible to build, improve, or operate with Codex and AI
- Capable of being tested quickly before heavy investment
- Monetizable through a clear offer, product, service, audience, or distribution channel
- Realistic for one person or a small team to start
- Able to become repeatable, systemized, or semi-automated over time
- Not dependent on local-only labor, location-specific inventory, or constant in-person availability
- Strong enough to reach customers through search, social media, marketplaces, outbound, paid ads, partnerships, or communities
- Legal, ethical, and operationally manageable

Additional considerations:

- Prefer ideas with a clear customer pain, urgency, or desire.
- Prefer ideas where AI creates a practical advantage, such as faster production, better personalization, lower operating cost, or easier distribution.
- Prefer ideas that can produce useful assets even if the first experiment fails.
- Avoid ideas that require large upfront capital, complex regulation, fragile platform dependence, or heavy customer support before validation.

## Business Idea Buckets

Ideas should be grouped into practical categories:

- AI-built websites: niche directories, calculators, lead-generation sites, affiliate sites, local service websites, comparison tools
- Digital products: templates, Notion systems, spreadsheets, prompt packs, ebooks, guides, design assets, stock assets
- Micro SaaS and apps: focused tools solving narrow business or consumer problems
- Content and social media: newsletters, faceless channels, niche accounts, short-form content systems, educational media
- Ecommerce: print-on-demand, digital downloads, niche ecommerce, productized content-led stores
- Marketing services: SEO pages, landing pages, email funnels, ad creatives, content systems, analytics reporting
- Automation businesses: n8n/Zapier workflows, CRM automation, reporting automation, AI-assisted internal tools
- AI-assisted services: productized services where AI improves speed, margin, or quality

## Recommended Directory Structure

```text
Business/
+-- AGENTS.MD
+-- GITHUB_ISSUES_GUIDE.md
+-- REMOTE_BUSINESS_LAB_PLAN.md
+-- README.md
+-- IDEAS/
|   +-- idea-template.md
|   +-- backlog.md
|   +-- archived.md
+-- RESEARCH/
|   +-- markets/
|   +-- competitors/
|   +-- trends/
|   +-- channels/
+-- EXPERIMENTS/
|   +-- 001-example-business/
|       +-- plan.md
|       +-- research.md
|       +-- validation.md
|       +-- offer.md
|       +-- finances.md
|       +-- product/
|       +-- marketing/
|       +-- assets/
+-- BUSINESS_OFFERS/
|   +-- brand/
|   +-- website/
|   +-- shared/
|   +-- verticals/
|       +-- roofing/
+-- ASSETS/
|   +-- brand/
|   +-- templates/
|   +-- prompts/
|   +-- reusable-media/
|   +-- social-media/
+-- SKILLS/
+-- AUTOMATIONS/
+-- PLAYBOOKS/
    +-- launch-checklist.md
    +-- validation-playbook.md
    +-- ecommerce-playbook.md
    +-- content-playbook.md
    +-- marketing-playbook.md
```

## Directory Rationale

The repo should be organized around experiments, not file types alone.

`EXPERIMENTS/` is where active or completed business tests live. Each experiment should contain its own plan, research, validation notes, offer, finances, product files, marketing files, and experiment-specific assets.

`BUSINESS_OFFERS/` is where reusable operating offers live once an experiment starts turning into a sellable business direction. It holds the owner's public positioning, credibility-site planning, shared pricing/outreach assets, and vertical-specific offer material for actively tested markets.

`ASSETS/` should contain shared assets that can be reused across multiple ideas, such as brand systems, prompt libraries, design templates, reusable images, reusable social formats, product templates, and launch checklists.

This means assets belong in two places depending on ownership:

- Experiment-specific assets go inside `EXPERIMENTS/<experiment>/assets/`.
- Reusable assets go inside top-level `ASSETS/`.

This avoids two common problems:

- If all assets live globally, individual experiments become hard to understand later.
- If all assets live inside experiments, reusable material gets duplicated and becomes harder to maintain.

`IDEAS/` is for raw and scored ideas before they become experiments.

`RESEARCH/` is for market, competitor, trend, and channel research that may support multiple ideas.

`PLAYBOOKS/` is for repeatable operating processes.

`SKILLS/` is for reusable Codex/AI instructions, workflows, or specialized project capabilities.

`AUTOMATIONS/` is for workflow automation specs, scripts, n8n flows, Zapier notes, or operational automation plans.

## Idea Template

Each idea should be captured consistently:

```text
Idea:
Bucket:
Customer:
Problem:
Desired outcome:
Offer:
Monetization:
Distribution channel:
Startup cost:
Time to first test:
Difficulty:
AI/Codex leverage:
Remote suitability:
Risks:
Fastest validation test:
Score:
Next action:
```

## Research Checklist

Before building, research:

- Who pays for this?
- What pain, desire, or business outcome does it address?
- How urgent is the problem?
- What alternatives or competitors already exist?
- What are competitors charging?
- Where do customers already spend attention?
- Can customers be reached through search, social, marketplaces, outbound, paid ads, partnerships, or communities?
- What proof would show there is real demand?
- What is the fastest test that does not require building the full product?
- What can Codex/AI produce that creates a real speed, cost, quality, or personalization advantage?
- What legal, operational, platform, or support risks exist?

## Scoring System

Score each idea from 1 to 5 in each category:

```text
Customer pain or desire:
Ability to reach customers:
Monetization clarity:
Speed to validate:
Low startup cost:
AI/Codex leverage:
Remote suitability:
Operational simplicity:
Defensibility or differentiation:
Personal interest:
```

Suggested interpretation:

- 40-50: strong candidate for validation
- 30-39: possible candidate, needs more research
- 20-29: weak unless there is a special advantage
- Below 20: archive or revisit later

## Validation Process

Use small experiments before building heavily.

Possible validation tests:

- Landing page with email capture
- Direct outreach to a defined customer segment
- Marketplace listing
- Social content test
- Paid ad smoke test with a small budget
- Preorder, waitlist, or deposit
- Manual service delivery before automation
- Prototype shared with a niche community
- Competitor pricing and demand analysis

Validation evidence should be written down in the experiment folder.

## Operating Rules

- Keep raw ideas in `IDEAS/backlog.md` until they are strong enough to research.
- Move researched ideas into individual files or experiment folders only when they deserve focused work.
- Run one to three active experiments at a time.
- Prefer validation before building.
- Use Codex/AI to compress research, production, prototyping, content creation, automation, and iteration.
- Document every experiment well enough that it can be resumed later.
- Archive ideas that are weak, distracting, too expensive, too regulated, or too dependent on a single fragile platform.
- Use GitHub Issues for deliverable-sized implementation work according to `GITHUB_ISSUES_GUIDE.md`.

## Initial Next Steps

- Create the initial repo directories and templates.
- Create `IDEAS/backlog.md`.
- Add the first batch of remote business ideas.
- Fill out `IDEAS/scoring-questionnaire.md` to set scoring priorities.
- Score the first batch.
- Pick one to three ideas for deeper research.
- Create experiment folders only for ideas selected for validation.
