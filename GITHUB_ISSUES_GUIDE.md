# GitHub Issues Guide for AI Dev Agents

## 1) When tracking is required
- Use GitHub Issues to track substantial implementation and work that needs follow-up across sessions.
- Questions, read-only inspections, brainstorming, and small self-contained edits do not require an issue, issue search, or implementation plan unless the user requests tracking.
- For tracked work, reuse an existing relevant issue. Use a known issue reference directly; otherwise search narrowly before creating one. Read the current scope, status, and relevant updates rather than the full history by default.
- Keep one issue per meaningful deliverable. Split work when outcomes can be independently verified, shipped, or scheduled; do not create an issue for every plan section or implementation step.
- Parent/epic issues summarize related deliverables and link to their issues without duplicating detailed checklists.

## 2) Issue contents
Keep issue bodies concise:
- Clear action and scope in the title.
- Brief context and intended outcome; state exclusions only when needed to prevent ambiguity.
- Testable acceptance criteria.
- Links to the implementation plan and dependencies/blockers, when applicable.

Use existing relevant labels (for example, type, area, or priority); do not create labels just to fill a template. Use `status:blocked` only while blocked. Assign an existing relevant milestone when useful; milestones are optional and must not block work. Create milestones only when needed to organize a real delivery schedule or when requested. Keep labels and milestones in GitHub metadata rather than repeating them in the issue body.

## 3) Implementation plans
- For large or multi-phase implementation, create a plan in `plans/issue-<number>-short-topic.md`. Small issues need acceptance criteria only.
- Keep an up-to-date checklist of completed and remaining implementation steps in the plan. The issue holds outcome-level acceptance criteria; do not mirror the detailed plan checklist in issue comments.
- One shared plan may cover several related delivery issues. Name it using the coordinating parent or primary issue number and link each issue to its relevant section. Do not create duplicate plan files for each issue.
- Link the plan from the issue once; repeat the link in updates only when it helps locate new evidence or a changed plan.

## 4) Updates and handoffs
- Post updates when meaningful progress, scope changes, blockers, or delivery results need to be recorded. Do not post comments merely to announce session start, continued activity, or unchanged status.
- Keep updates brief: new result or decision, relevant evidence, and remaining work or blockers when applicable. Omit empty sections and repeated background.
- Combine completion, validation, deployment evidence, and closeout into one comment when they occur together.
- When pausing unfinished work, leave one concise handoff with the current state and next action if that information is not already recorded. Do not add a separate end-of-session report that repeats the latest update.
- Keep user-facing summaries concise; link to detailed records rather than reproducing them.

## 5) Branches, PRs, and rollback safety
- Continue on the current appropriate branch unless the user requests a new one, the work is risky, or isolation helps review. Do not create a branch for every change.
- When a new branch is useful for tracked work, use `issue-<number>-short-topic` unless the user specifies otherwise.
- Parent/epic issues are for tracking; do not create a broad implementation branch for an epic unless explicitly approved.
- Before substantial implementation, record the base commit (`git rev-parse HEAD`) and branch once in the plan or issue. This is the comparison/restore reference and does not require a separate session-start comment.
- Link related branches, PRs, commits, and deployments to the issue when they exist; avoid reposting unchanged links.
- Merge a PR only after its acceptance criteria are met, relevant validation is complete, and tracking is accurate. Close the issue after any required merge or deployment succeeds.
- Prefer revert commits for committed or shared work. Do not use destructive rollback commands such as `git reset --hard` unless explicitly requested and approved.

## 6) Completion and validation
Close an issue only when:
- Acceptance criteria are satisfied.
- Relevant tests/build checks have passed, or omissions and their reasons are explicitly documented. Do not claim verification that did not occur.
- Required merge or deployment is complete, when applicable.
- Any implementation plan checklist is current.
- One closeout comment records the delivered outcome, validation evidence, relevant links, and outstanding follow-ups if any.

## 7) When GitHub is unavailable
- Continue authorized local work without waiting solely for an issue number.
- Record the intended issue title, scope, acceptance criteria, current status, and next action in an existing plan or a short `plans/pending-issue-short-topic.md` note. Do not duplicate that note in chat.
- When GitHub becomes available, check for an existing issue before creating one, synchronize the local record, and rename a temporary plan to the issue-based filename. Update affected references.
- State briefly in the handoff that GitHub synchronization is pending. This fallback does not bypass user approvals, validation, or other safety requirements.
