# Issue 74 - Client-Facing Demo Copy Cleanup

## Goal
Remove internal audit/source-page language from client-facing prospect demo pages so the copy reads like polished homeowner-facing landing page text.

## Checklist

- [x] Identify rendered prospect data fields that use internal or third-person audit language.
- [x] Rewrite LOA FAQ and page copy to be direct and homeowner-facing.
- [x] Rewrite the same style issues across the rest of the active demo data.
- [x] Run content scans for phrases such as `public page`, `public article`, `current proof`, and `demo is` in rendered fields.
- [x] Run `npm run build` for the demo app.
- [x] Check representative routes return HTTP 200.
- [x] Commit, push, and open a stacked PR.

## Notes

Keep source URLs and internal prospect package docs intact where they are clearly internal. This cleanup is for text rendered in the demo app.
