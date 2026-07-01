# Issue 112 - n8n Send Approval

## Goal
Change the dashboard approval action from Gmail draft approval to n8n send approval so reviewed email rows match the existing n8n sender workflow criteria.

## Checklist
- [x] Update backend approval action to set `outreach_send_status = approved`.
- [x] Store `outreach_approved_by` from the logged-in dashboard session username.
- [x] Update dashboard labels and confirmation copy to say `Approve for n8n Send`.
- [x] Keep revoke behavior available for approved rows before send.
- [x] Update automation docs to describe the new dashboard approval meaning.
- [x] Validate, commit, push, deploy, and close issue.

## Notes
- Existing n8n sender fetches rows where `outreach_approved = true`, `outreach_send_status = approved`, and `outreach_send_channel = email`.
- `approved_for_draft` remains a possible database status for a future draft workflow, but the dashboard should stop using it for the main approval flow.
