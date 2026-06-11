# GitHub Issues Guide for AI Dev Agents

This guide is mandatory for every new work session on this project.

## 1) Objective
Use GitHub Issues as the single source of truth for:
- What is being worked on
- Why it matters
- Current status
- Milestone progress
- Blockers and next actions

If it is not reflected in an Issue, it is not considered tracked.

## 2) Non-Negotiable Rules
- Always start by checking if an Issue already exists for the requested work.
- Never do substantial implementation work without an Issue reference.
- Keep one Issue per deliverable-sized task (not one giant Issue for everything).
- Update the Issue at meaningful checkpoints, not only at the end.
- Close Issues only when acceptance criteria are met and verified.
- Link all related PRs/commits/deploys back to the Issue.

## 3) Session Start Protocol (Required)
At the beginning of each chat/session:
1. Read current open Issues relevant to the request.
2. If Issue exists:
   - Continue under that Issue.
   - Post a short "Session Start" update comment.
3. If no Issue exists:
   - Create one.
   - If Issue creation is unavailable in current tooling, draft title/body/labels/milestone in chat for manual creation before proceeding.
4. Confirm milestone assignment before implementation.

## 4) Branch Workflow
- Create one branch per implementation Issue before code changes begin.
- Use the format `issue-<number>-short-topic`, for example `issue-123-device-asset-links`.
- Parent/epic Issues are for tracking only; do not create a broad implementation branch for an epic unless explicitly approved.
- Keep each branch scoped to the Issue acceptance criteria.
- Link the branch, PR, and commits back to the Issue.

## 5) Implementation Plan Files
For large or multi-phase work, create an implementation plan in:

`plans/issue-<number>-short-topic.md`

Use one plan file per implementation Issue. Keep the checklist updated as work progresses, and link the plan file in Issue updates and closeout comments.

## 6) Rollback Safety
- Before creating an implementation branch, record the current base commit with `git rev-parse HEAD`.
- Include the base commit and branch name in the Issue's Session Start comment.
- Treat the base commit as the restore/comparison point for that Issue's work.
- Prefer revert commits for rollback after work is committed or shared.
- Do not use destructive rollback commands such as `git reset --hard` unless explicitly requested and approved.

## 7) Standard Issue Structure
Every Issue must include:
- Title: clear action + scope
- Context: why this work is needed
- Scope: in-scope and out-of-scope
- Acceptance Criteria: testable checklist
- Milestone: required
- Labels: required
- Dependencies/Blockers: if any

## 8) Required Labels
Use consistent labels (or closest equivalent available in repo):
- `type:feature`
- `type:bug`
- `type:chore`
- `area:frontend`
- `area:backend`
- `area:infra`
- `priority:p0` / `priority:p1` / `priority:p2`
- `status:blocked` (only when blocked)

## 9) Milestone Mapping
Assign each Issue to one milestone:
- `Prototype Phase A - Discovery + Brand`
- `Prototype Phase B - UX Skeleton`
- `Prototype Phase C - Visual System`
- `Prototype Phase D - Functional Prototype`
- `Prototype Phase E - QA + Demo`
- `Phase 2 - Production Enhancements`

If milestones do not exist, create them first (or draft them for manual creation).

## 10) Update Cadence Rules
Post Issue updates at these points:
- Session Start
- After implementation chunk completion
- When blocked
- After deploy
- Session End

Each update must include:
- What changed
- Evidence (file paths, commit/PR/deploy links)
- Remaining work
- Risks/blockers

## 11) Definition of Done (Issue Closure)
Do not close an Issue until all are true:
- Acceptance criteria completed
- Relevant tests/build checks passed (or explicitly documented if not run)
- Deployed or merged as expected
- Implementation plan/checklist updated if impacted
- Final Issue comment posted with summary and links

## 12) Required End-of-Session Summary
At the end of every session, post or prepare this summary:
- Completed today
- In progress
- Blocked
- Next recommended step
- Milestone progress impact

## 13) Templates

### 13.1 New Issue Template
```md
## Context
[Why this work is needed]

## Scope
In scope:
- [item]

Out of scope:
- [item]

## Acceptance Criteria
- [ ] [criterion 1]
- [ ] [criterion 2]
- [ ] [criterion 3]

## Milestone
[Milestone name]

## Labels
- [label]
- [label]

## Dependencies / Blockers
- [dependency or "None"]
```

### 13.2 Session Start Comment
```md
Session start for this issue.

Base commit:
- `[commit hash]`

Branch:
- `[issue-<number>-short-topic]`

Plan:
1. [step]
2. [step]

Expected outcome:
- [result]
```

### 13.3 Progress Update Comment
```md
Progress update:

Completed:
- [item]

Evidence:
- [file/PR/commit/deploy link]

Remaining:
- [item]

Risks/Blockers:
- [item or "None"]
```

### 13.4 Closeout Comment
```md
Issue complete.

Delivered:
- [item]

Validation:
- [test/build/deploy result]

Links:
- PR: [link]
- Deploy: [link]
- Plan update: [link]

Follow-ups:
- [item or "None"]
```

## 14) Tooling Limitation Fallback Rule
If the active AI toolset cannot create GitHub Issues directly:
1. Draft the full Issue payload in chat:
   - Title
   - Body (template filled)
   - Labels
   - Milestone
2. Request manual creation by the user.
3. Continue only after Issue number is available.
4. Use comments/updates on that Issue for the rest of the work.

---

Following this guide is required to keep project execution measurable, auditable, and aligned with milestones.
