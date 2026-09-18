# Pipeline Verification

Run in **PowerShell 7.5+ on Windows**, from the repository root:

```powershell
pwsh -NoProfile -File AUTOMATIONS/lead-growth-pipeline/tests/Run-RegressionTests.ps1
```

The standalone suite requires no Pester installation, network, credentials, real recipients, or services. It creates isolated synthetic experiment directories under the OS temporary directory. Successful fixtures are cleaned; failed fixtures are retained with their path and detailed failure locations. `-KeepFixtures` retains successful runs for inspection. The junction containment case targets Windows; other platforms need an equivalent symlink test before claiming support. Issue #131 should run this suite as a separate Windows CI job with a pinned compatible PowerShell version.

Coverage:

- Quoted/unquoted headers, quoted commas/quotes, multiline notes, custom columns, and roofing aliases.
- Byte-stable identical reruns; preserved legacy IDs, contact dates, follow-ups, replies, and handwritten documents.
- Explicit patch/clear semantics, independent blank-website businesses, same-name businesses and shared-domain branches.
- Reviewed legacy adoption, stale source hashes, duplicate IDs, malformed rows, and no guessed identity.
- Zero-write dry runs; path traversal, reserved names, and junction containment.
- Reviewed regeneration, stale document review hashes, backups, and later-edit protection.
- Structural/research/outreach completeness, optional research-only recommendations, sources, contact verification, unresolved content, and invalid state transitions.
- Real child-process lock contention, optimistic concurrency checks, interrupted multi-file recovery, and byte-exact rollback.

Use the current [verification record](../../plans/issue-128-business-research-platform-audit/issue-130-lossless-prospect-packages.md) for actual results, rather than treating this coverage list as a pass report.

After changing runtime scripts, synchronize the installed skill and verify checksums:

```powershell
./AUTOMATIONS/lead-growth-pipeline/scripts/Sync-InstalledPipelineScripts.ps1
./AUTOMATIONS/lead-growth-pipeline/scripts/Sync-InstalledPipelineScripts.ps1 -Check
```

Validate a real package at the appropriate stage before further workflow work. Existing legacy files will need reviewed identity adoption and real evidence before they pass the new record contract. Passing local checks does not establish factual accuracy, current remote-page state, deliverability, or send approval. Continue to use [the Gmail handoff](gmail-draft-handoff.md) and the relevant marketing pre-send checklist before any separately authorized contact.
