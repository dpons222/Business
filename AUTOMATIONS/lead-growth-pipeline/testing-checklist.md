# Testing Checklist

## Skill Validation

- Run `quick_validate.py` against the installed skill.
- Confirm `SKILL.md` has valid frontmatter.
- Confirm referenced files exist.

## Script Validation

- Run `New-ProspectPackage.ps1` against a temporary experiment directory.
- Confirm package files are created.
- Confirm tracker row is added.
- Run `Test-ProspectPackage.ps1` against the generated package.

## Workflow Validation

Before connecting Gmail or n8n:

- Test with a fake prospect and no real recipient.
- Confirm generated outreach is draft-only.
- Confirm secondary recommendations are preserved.
- Confirm status does not skip straight to sent.

## Gmail Draft Validation

When Gmail integration is added:

- First create a draft addressed only to Diego.
- Confirm no send node exists.
- Confirm the Gmail draft ID is recorded.
- Confirm manual review remains required before send.

## Shutdown Safety

Do not schedule system shutdown until:

- commit succeeds,
- push succeeds,
- status is clean,
- final summary is ready.
