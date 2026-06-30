import { demoEntries, getDemoEntryBySlug } from "./demoRegistry";

export type OutreachSendStatus =
  | "not_ready"
  | "ready_for_review"
  | "approved_for_draft"
  | "draft_created"
  | "approved"
  | "queued"
  | "sent"
  | "failed"
  | "skipped";

export type ProspectRelationshipStatus =
  | "not_contacted"
  | "contacted"
  | "do_not_contact"
  | "not_interested"
  | "follow_up_1_due"
  | "follow_up_1_sent"
  | "follow_up_2_due"
  | "follow_up_2_sent"
  | "positive_reply"
  | "neutral_reply"
  | "negative_reply"
  | "call_booked"
  | "won"
  | "lost"
  | "not_fit";

export type ProspectDraft = {
  businessName: string;
  businessEmail: string | null;
  contactStatus: ProspectRelationshipStatus | string | null;
  outreachSendStatus: OutreachSendStatus | null;
  outreachSendChannel: string | null;
  outreachApproved: boolean;
  outreachApprovedAt: string | null;
  outreachApprovedBy: string | null;
  subject: string | null;
  body: string | null;
  website: string | null;
  demoUrl: string | null;
  notes: string | null;
  approvalBlockers: string[];
  source: "supabase" | "local";
};

export type ProspectDraftSummary = {
  businessEmail: string | null;
  contactStatus: ProspectRelationshipStatus | string | null;
  hasEmailDraft: boolean;
  outreachSendStatus: OutreachSendStatus | null;
  source: "supabase";
};

type SupabaseProspectRow = {
  business_name: string;
  contact_email: string | null;
  status: ProspectRelationshipStatus | string | null;
  outreach_send_status: OutreachSendStatus | null;
  outreach_send_channel: string | null;
  outreach_approved: boolean | null;
  outreach_approved_at: string | null;
  outreach_approved_by: string | null;
  outreach_draft_subject: string | null;
  outreach_draft_body: string | null;
  website: string | null;
  demo_url: string | null;
  notes: string | null;
};

type SupabaseProspectSummaryRow = {
  prospect_slug: string | null;
  contact_email: string | null;
  status: ProspectRelationshipStatus | string | null;
  outreach_send_status: OutreachSendStatus | null;
  outreach_draft_subject: string | null;
  outreach_draft_body: string | null;
};

type SupabaseUpdateResponse = SupabaseProspectRow & {
  prospect_slug: string | null;
};

export type ProspectDraftApprovalAction = "approve_for_draft" | "revoke_draft_approval";
export type ProspectRelationshipAction = "mark_do_not_contact" | "mark_not_interested";
export type ManualContactMethod =
  | "contact_form"
  | "phone"
  | "facebook"
  | "instagram"
  | "linkedin"
  | "other";

export type ManualContactInput = {
  method: ManualContactMethod;
  note?: string;
  followUpDays?: number;
};

const manualContactMethodLabels: Record<ManualContactMethod, string> = {
  contact_form: "contact form",
  phone: "phone",
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  other: "other manual method",
};

export const relationshipStatusLabels: Record<string, string> = {
  not_contacted: "Not contacted",
  contacted: "Contacted",
  do_not_contact: "Do not contact",
  not_interested: "Not interested",
  follow_up_1_due: "Follow-up 1 due",
  follow_up_1_sent: "Follow-up 1 sent",
  follow_up_2_due: "Follow-up 2 due",
  follow_up_2_sent: "Follow-up 2 sent",
  positive_reply: "Positive reply",
  neutral_reply: "Neutral reply",
  negative_reply: "Negative reply",
  call_booked: "Call booked",
  won: "Won",
  lost: "Lost",
  not_fit: "Not fit",
};

const terminalRelationshipStatuses = new Set(["do_not_contact", "not_interested", "lost", "not_fit"]);

const stableDemoUrlPrefix = "https://local-growth-preview.vercel.app/";

const localDrafts: Record<string, Pick<ProspectDraft, "subject" | "body">> = {
  "brotherhood-roofing": {
    subject: "Focused DFW storm inspection page for Brotherhood",
    body: `Hi Brotherhood Roofing,

My name is Diego. I'm with DigiDap, where I help local service businesses improve their websites and turn high-intent pages into clearer customer inquiry paths.

I was reviewing DFW roofing companies and noticed your hail and storm damage page already has strong homeowner education plus a clear free inspection offer.

My thought was that the same content could work well as a shorter storm-specific landing page built around one action: helping homeowners schedule a free roof inspection after hail, wind, leaks, missing shingles, or gutter damage.

The idea is not to replace your full website. It would be a focused page you could test from Google Business Profile clicks, local ads, QR codes, or follow-up messages.

Demo:
https://local-growth-preview.vercel.app/brotherhood-roofing

If another site priority would be more useful to look at first, I can focus there instead.

Best,
Diego`,
  },
  "sixth-gen-roofing": {
    subject: "Focused Austin certified inspection page for Sixth Gen",
    body: `Hi Sixth Gen Roofing,

My name is Diego. I'm with DigiDap, where I help local service businesses improve their websites and turn high-intent pages into clearer customer inquiry paths.

I was reviewing Austin roofing companies and noticed your page already has strong inspection proof: free HAAG-certified inspections, evidence-based reports, photo documentation, and honest recommendations.

My thought was that the same proof could work well as a shorter storm-specific landing page built around one action: helping Austin homeowners schedule a free certified roof inspection after hail or wind.

The idea is not to replace your full page. It would be a focused page you could test from Google Business Profile clicks, local ads, QR codes, or follow-up messages.

Demo:
https://local-growth-preview.vercel.app/sixth-gen-roofing

If another site priority would be more useful to look at first, I can focus there instead.

Best,
Diego`,
  },
};

function absoluteDemoUrl(path: string | undefined) {
  if (!path) {
    return null;
  }

  if (path.startsWith("http")) {
    return path;
  }

  return `https://local-growth-preview.vercel.app${path}`;
}

function normalizeDraftText(value: string | null) {
  if (!value) {
    return value;
  }

  return value.replace(/\\r\\n/g, "\n").replace(/\\n/g, "\n").replace(/\\r/g, "\n");
}

function hasText(value: string | null) {
  return Boolean(value?.trim());
}

export function relationshipStatusLabel(status: string | null) {
  if (!status) {
    return "No contact status";
  }

  return relationshipStatusLabels[status] ?? status;
}

function getApprovalBlockers(draft: Pick<ProspectDraft, "businessEmail" | "body" | "contactStatus" | "demoUrl" | "subject">) {
  const blockers: string[] = [];

  if (draft.contactStatus !== "not_contacted") {
    blockers.push("Prospect relationship status must be not_contacted.");
  }

  if (draft.contactStatus && terminalRelationshipStatuses.has(draft.contactStatus)) {
    blockers.push(`${relationshipStatusLabel(draft.contactStatus)} rows are not eligible for outreach approval.`);
  }

  if (!hasText(draft.businessEmail)) {
    blockers.push("Verified contact email is required.");
  }

  if (!hasText(draft.subject)) {
    blockers.push("Outreach subject is required.");
  }

  if (!hasText(draft.body)) {
    blockers.push("Outreach body is required.");
  }

  if (!draft.demoUrl?.startsWith(stableDemoUrlPrefix)) {
    blockers.push("Demo URL must use the stable local-growth-preview.vercel.app alias.");
  }

  return blockers;
}

function rowToProspectDraft(row: SupabaseProspectRow): ProspectDraft {
  const draft = {
    businessName: row.business_name,
    businessEmail: row.contact_email,
    contactStatus: row.status,
    outreachSendStatus: row.outreach_send_status,
    outreachSendChannel: row.outreach_send_channel,
    outreachApproved: Boolean(row.outreach_approved),
    outreachApprovedAt: row.outreach_approved_at,
    outreachApprovedBy: row.outreach_approved_by,
    subject: normalizeDraftText(row.outreach_draft_subject),
    body: normalizeDraftText(row.outreach_draft_body),
    website: row.website,
    demoUrl: row.demo_url,
    notes: row.notes,
    approvalBlockers: [],
    source: "supabase" as const,
  };

  return {
    ...draft,
    approvalBlockers: getApprovalBlockers(draft),
  };
}

export function getSupabaseConfig(options: { requireServiceRole?: boolean } = {}) {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = options.requireServiceRole
    ? process.env.SUPABASE_SERVICE_ROLE_KEY
    : process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ""),
    key,
  };
}

export function getLocalProspectDraft(slug: string): ProspectDraft | null {
  const entry = getDemoEntryBySlug(slug);

  if (!entry) {
    return null;
  }

  const localDraft = localDrafts[slug];

  return {
    businessName: entry.title,
    businessEmail: entry.contactEmail ?? null,
    contactStatus: entry.status,
    outreachSendStatus: null,
    outreachSendChannel: null,
    outreachApproved: false,
    outreachApprovedAt: null,
    outreachApprovedBy: null,
    subject: normalizeDraftText(localDraft?.subject ?? null),
    body: normalizeDraftText(localDraft?.body ?? null),
    website: entry.sourceUrl ?? null,
    demoUrl: absoluteDemoUrl(entry.href),
    notes: null,
    approvalBlockers: ["Local fallback drafts cannot be approved for n8n."],
    source: "local",
  };
}

async function fetchSupabaseProspectDraft(slug: string, config = getSupabaseConfig()) {
  if (!config) {
    return null;
  }

  const params = new URLSearchParams({
    prospect_slug: `eq.${slug}`,
    select:
      "business_name,contact_email,status,outreach_send_status,outreach_send_channel,outreach_approved,outreach_approved_at,outreach_approved_by,outreach_draft_subject,outreach_draft_body,website,demo_url,notes",
    limit: "1",
  });
  const response = await fetch(`${config.url}/rest/v1/prospects?${params}`, {
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const rows = (await response.json()) as SupabaseProspectRow[];

  return rows[0] ?? null;
}

export async function getProspectDraftSummaries(slugs: string[]) {
  const config = getSupabaseConfig();

  if (!config || slugs.length === 0) {
    return {};
  }

  const uniqueSlugs = [...new Set(slugs)];
  const params = new URLSearchParams({
    prospect_slug: `in.(${uniqueSlugs.join(",")})`,
    select:
      "prospect_slug,contact_email,status,outreach_send_status,outreach_draft_subject,outreach_draft_body",
  });

  try {
    const response = await fetch(`${config.url}/rest/v1/prospects?${params}`, {
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return {};
    }

    const rows = (await response.json()) as SupabaseProspectSummaryRow[];

    return rows.reduce<Record<string, ProspectDraftSummary>>((summaries, row) => {
      if (!row.prospect_slug) {
        return summaries;
      }

      summaries[row.prospect_slug] = {
        businessEmail: row.contact_email,
        contactStatus: row.status,
        hasEmailDraft: hasText(row.outreach_draft_subject) && hasText(row.outreach_draft_body),
        outreachSendStatus: row.outreach_send_status,
        source: "supabase",
      };

      return summaries;
    }, {});
  } catch {
    return {};
  }
}

export async function getProspectDraft(slug: string): Promise<ProspectDraft | null> {
  const config = getSupabaseConfig();

  if (!config) {
    return getLocalProspectDraft(slug);
  }

  try {
    const row = await fetchSupabaseProspectDraft(slug, config);

    if (!row) {
      return getLocalProspectDraft(slug);
    }

    return rowToProspectDraft(row);
  } catch {
    return getLocalProspectDraft(slug);
  }
}

export async function updateProspectDraftApproval(slug: string, action: ProspectDraftApprovalAction) {
  const config = getSupabaseConfig({ requireServiceRole: true });

  if (!config) {
    return {
      draft: null,
      error: "Supabase is not configured for dashboard approval updates.",
      status: 503,
    };
  }

  const row = await fetchSupabaseProspectDraft(slug, config);

  if (!row) {
    return {
      draft: null,
      error: "Prospect draft was not found in Supabase.",
      status: 404,
    };
  }

  const draft = rowToProspectDraft(row);

  if (action === "approve_for_draft") {
    if (draft.approvalBlockers.length > 0) {
      return {
        draft,
        error: "Draft cannot be approved until all readiness checks pass.",
        status: 422,
      };
    }

    if (
      draft.outreachSendStatus &&
      ["approved_for_draft", "draft_created", "approved", "queued", "sent"].includes(
        draft.outreachSendStatus,
      )
    ) {
      return {
        draft,
        error: "This row is already approved, queued, drafted, or sent.",
        status: 409,
      };
    }

    if (draft.outreachSendStatus !== "ready_for_review") {
      return {
        draft,
        error: "Only ready_for_review rows can be approved for Gmail draft creation.",
        status: 409,
      };
    }
  }

  if (action === "revoke_draft_approval" && draft.outreachSendStatus !== "approved_for_draft") {
    return {
      draft,
      error: "Only approved_for_draft rows can be revoked from the dashboard.",
      status: 409,
    };
  }

  const update =
    action === "approve_for_draft"
      ? {
          outreach_approved: true,
          outreach_approved_at: new Date().toISOString(),
          outreach_approved_by: "Diego",
          outreach_send_channel: "email",
          outreach_send_status: "approved_for_draft",
          outreach_last_error: null,
        }
      : {
          outreach_approved: false,
          outreach_approved_at: null,
          outreach_approved_by: null,
          outreach_send_status: "ready_for_review",
          outreach_last_error: null,
        };

  const response = await fetch(`${config.url}/rest/v1/prospects?prospect_slug=eq.${slug}`, {
    method: "PATCH",
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(update),
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      draft,
      error: "Supabase rejected the approval update.",
      status: response.status,
    };
  }

  const rows = (await response.json()) as SupabaseUpdateResponse[];
  const updatedRow = rows[0];

  if (!updatedRow) {
    return {
      draft,
      error: "Supabase update succeeded but returned no row.",
      status: 500,
    };
  }

  return {
    draft: rowToProspectDraft(updatedRow),
    error: null,
    status: 200,
  };
}

function clampFollowUpDays(value: number | undefined) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return 7;
  }

  return Math.min(Math.max(Math.round(value), 1), 30);
}

function appendManualContactNote(
  currentNotes: string | null,
  input: Required<ManualContactInput>,
  contactedAt: Date,
  followUpAt: Date,
) {
  const noteParts = [
    `Dashboard manual contact recorded ${contactedAt.toISOString()}.`,
    `Method: ${manualContactMethodLabels[input.method]}.`,
    `Next follow-up due: ${followUpAt.toISOString()}.`,
    input.note.trim() ? `Note: ${input.note.trim()}` : null,
  ].filter(Boolean);
  const nextNote = noteParts.join(" ");

  return [currentNotes?.trim(), nextNote].filter(Boolean).join("\n\n");
}

function appendRelationshipStatusNote(
  currentNotes: string | null,
  action: ProspectRelationshipAction,
  note: string | undefined,
  changedAt: Date,
) {
  const statusLabel =
    action === "mark_do_not_contact" ? "Do not contact" : "Not interested";
  const noteParts = [
    `Dashboard relationship status updated ${changedAt.toISOString()}.`,
    `Status: ${statusLabel}.`,
    note?.trim() ? `Note: ${note.trim()}` : null,
  ].filter(Boolean);

  return [currentNotes?.trim(), noteParts.join(" ")].filter(Boolean).join("\n\n");
}

export async function updateProspectManualContact(slug: string, input: ManualContactInput) {
  const config = getSupabaseConfig({ requireServiceRole: true });

  if (!config) {
    return {
      draft: null,
      error: "Supabase is not configured for manual contact updates.",
      status: 503,
    };
  }

  const row = await fetchSupabaseProspectDraft(slug, config);

  if (!row) {
    return {
      draft: null,
      error: "Prospect draft was not found in Supabase.",
      status: 404,
    };
  }

  const draft = rowToProspectDraft(row);

  if (draft.contactStatus !== "not_contacted" || draft.outreachSendStatus === "sent") {
    return {
      draft,
      error: "Manual contact can only be recorded for not_contacted prospects.",
      status: 409,
    };
  }

  const method = input.method;

  if (!manualContactMethodLabels[method]) {
    return {
      draft,
      error: "Manual contact method is invalid.",
      status: 400,
    };
  }

  const followUpDays = clampFollowUpDays(input.followUpDays);
  const contactedAt = new Date();
  const followUpAt = new Date(contactedAt);
  followUpAt.setDate(followUpAt.getDate() + followUpDays);

  const manualContactInput: Required<ManualContactInput> = {
    method,
    note: input.note ?? "",
    followUpDays,
  };

  const update = {
    status: "contacted",
    outreach_send_channel: method === "contact_form" ? "contact_form" : "manual",
    outreach_send_status: "sent",
    outreach_last_error: null,
    date_contacted: contactedAt.toISOString(),
    last_contacted_at: contactedAt.toISOString(),
    follow_up_1_due_at: followUpAt.toISOString(),
    next_follow_up_at: followUpAt.toISOString(),
    notes: appendManualContactNote(row.notes, manualContactInput, contactedAt, followUpAt),
  };

  const response = await fetch(`${config.url}/rest/v1/prospects?prospect_slug=eq.${slug}`, {
    method: "PATCH",
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(update),
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      draft,
      error: "Supabase rejected the manual contact update.",
      status: response.status,
    };
  }

  const rows = (await response.json()) as SupabaseUpdateResponse[];
  const updatedRow = rows[0];

  if (!updatedRow) {
    return {
      draft,
      error: "Supabase update succeeded but returned no row.",
      status: 500,
    };
  }

  return {
    draft: rowToProspectDraft(updatedRow),
    error: null,
    status: 200,
  };
}

export async function updateProspectRelationshipStatus(
  slug: string,
  action: ProspectRelationshipAction,
  note?: string,
) {
  const config = getSupabaseConfig({ requireServiceRole: true });

  if (!config) {
    return {
      draft: null,
      error: "Supabase is not configured for relationship status updates.",
      status: 503,
    };
  }

  const row = await fetchSupabaseProspectDraft(slug, config);

  if (!row) {
    return {
      draft: null,
      error: "Prospect draft was not found in Supabase.",
      status: 404,
    };
  }

  const draft = rowToProspectDraft(row);
  const changedAt = new Date();
  const nextStatus = action === "mark_do_not_contact" ? "do_not_contact" : "not_interested";
  const nextOutreachSendStatus =
    action === "mark_not_interested" && draft.outreachSendStatus === "sent" ? "sent" : "skipped";

  const update = {
    status: nextStatus,
    outreach_approved: false,
    outreach_approved_at: null,
    outreach_approved_by: null,
    outreach_send_status: nextOutreachSendStatus,
    outreach_last_error: null,
    next_follow_up_at: null,
    notes: appendRelationshipStatusNote(row.notes, action, note, changedAt),
  };

  const response = await fetch(`${config.url}/rest/v1/prospects?prospect_slug=eq.${slug}`, {
    method: "PATCH",
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(update),
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      draft,
      error: "Supabase rejected the relationship status update.",
      status: response.status,
    };
  }

  const rows = (await response.json()) as SupabaseUpdateResponse[];
  const updatedRow = rows[0];

  if (!updatedRow) {
    return {
      draft,
      error: "Supabase update succeeded but returned no row.",
      status: 500,
    };
  }

  return {
    draft: rowToProspectDraft(updatedRow),
    error: null,
    status: 200,
  };
}

export function hasLocalDemoEntry(slug: string) {
  return demoEntries.some((entry) => entry.slug === slug);
}
