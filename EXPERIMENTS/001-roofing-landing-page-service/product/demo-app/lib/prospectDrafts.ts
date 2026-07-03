import { demoEntries, getDemoEntryBySlug } from "./demoRegistry";
import type { DemoEntry, DemoNiche, DemoStatus } from "./demoRegistry";

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

export type FollowUpSendStatus =
  | "not_ready"
  | "ready_for_review"
  | "approved"
  | "queued"
  | "sent"
  | "failed"
  | "skipped";

export type FollowUpStep = "follow_up_1" | "follow_up_2";
export type FollowUpChannelPolicyKey = "email" | "contact_form" | "manual" | "unknown";

export type FollowUpChannelPolicy = {
  key: FollowUpChannelPolicyKey;
  label: string;
  canAutoSendFollowUps: boolean;
  reminderOnly: boolean;
  requiresManualEvidence: boolean;
  approvalBlocker: string | null;
};

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
  dateContacted: string | null;
  lastContactedAt: string | null;
  followUp1DueAt: string | null;
  followUp1SentAt: string | null;
  followUp2DueAt: string | null;
  followUp2SentAt: string | null;
  nextFollowUpAt: string | null;
  followUpSendStatus: FollowUpSendStatus | null;
  followUpApproved: boolean;
  followUpApprovedAt: string | null;
  followUpApprovedBy: string | null;
  followUpStep: FollowUpStep | null;
  followUpSubject: string | null;
  followUpBody: string | null;
  followUpLastError: string | null;
  followUpChannelPolicy: FollowUpChannelPolicy;
  replyStatus: string | null;
  notes: string | null;
  approvalBlockers: string[];
  followUpApprovalBlockers: string[];
  source: "supabase" | "local";
};

export type ProspectDraftSummary = {
  businessEmail: string | null;
  contactStatus: ProspectRelationshipStatus | string | null;
  hasEmailDraft: boolean;
  outreachSendStatus: OutreachSendStatus | null;
  dateContacted: string | null;
  lastContactedAt: string | null;
  followUp1DueAt: string | null;
  followUp1SentAt: string | null;
  followUp2DueAt: string | null;
  followUp2SentAt: string | null;
  nextFollowUpAt: string | null;
  followUpSendStatus: FollowUpSendStatus | null;
  followUpApproved: boolean;
  followUpStep: FollowUpStep | null;
  hasFollowUpDraft: boolean;
  replyStatus: string | null;
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
  date_contacted: string | null;
  last_contacted_at: string | null;
  follow_up_1_due_at: string | null;
  follow_up_1_sent_at: string | null;
  follow_up_2_due_at: string | null;
  follow_up_2_sent_at: string | null;
  next_follow_up_at: string | null;
  follow_up_send_status: FollowUpSendStatus | null;
  follow_up_approved: boolean | null;
  follow_up_approved_at: string | null;
  follow_up_approved_by: string | null;
  follow_up_step: FollowUpStep | null;
  follow_up_draft_subject: string | null;
  follow_up_draft_body: string | null;
  follow_up_last_error: string | null;
  reply_status: string | null;
  notes: string | null;
};

type SupabaseProspectSummaryRow = {
  prospect_slug: string | null;
  contact_email: string | null;
  status: ProspectRelationshipStatus | string | null;
  outreach_send_status: OutreachSendStatus | null;
  outreach_draft_subject: string | null;
  outreach_draft_body: string | null;
  date_contacted: string | null;
  last_contacted_at: string | null;
  follow_up_1_due_at: string | null;
  follow_up_1_sent_at: string | null;
  follow_up_2_due_at: string | null;
  follow_up_2_sent_at: string | null;
  next_follow_up_at: string | null;
  follow_up_send_status: FollowUpSendStatus | null;
  follow_up_approved: boolean | null;
  follow_up_step: FollowUpStep | null;
  follow_up_draft_subject: string | null;
  follow_up_draft_body: string | null;
  reply_status: string | null;
};

type SupabaseDashboardProspectRow = SupabaseProspectSummaryRow & {
  business_name: string | null;
  city_state: string | null;
  vertical: string | null;
  website: string | null;
  demo_url: string | null;
  source_page: string | null;
  observed_issue: string | null;
  outreach_angle: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string | null;
};

type SupabaseUpdateResponse = SupabaseProspectRow & {
  prospect_slug: string | null;
};

const prospectDraftSelect =
  "business_name,contact_email,status,outreach_send_status,outreach_send_channel,outreach_approved,outreach_approved_at,outreach_approved_by,outreach_draft_subject,outreach_draft_body,website,demo_url,date_contacted,last_contacted_at,follow_up_1_due_at,follow_up_1_sent_at,follow_up_2_due_at,follow_up_2_sent_at,next_follow_up_at,follow_up_send_status,follow_up_approved,follow_up_approved_at,follow_up_approved_by,follow_up_step,follow_up_draft_subject,follow_up_draft_body,follow_up_last_error,reply_status,notes";
const legacyProspectDraftSelect =
  "business_name,contact_email,status,outreach_send_status,outreach_send_channel,outreach_approved,outreach_approved_at,outreach_approved_by,outreach_draft_subject,outreach_draft_body,website,demo_url,date_contacted,last_contacted_at,follow_up_1_due_at,follow_up_1_sent_at,follow_up_2_due_at,follow_up_2_sent_at,next_follow_up_at,reply_status,notes";
const prospectSummarySelect =
  "prospect_slug,contact_email,status,outreach_send_status,outreach_draft_subject,outreach_draft_body,date_contacted,last_contacted_at,follow_up_1_due_at,follow_up_1_sent_at,follow_up_2_due_at,follow_up_2_sent_at,next_follow_up_at,follow_up_send_status,follow_up_approved,follow_up_step,follow_up_draft_subject,follow_up_draft_body,reply_status";
const legacyProspectSummarySelect =
  "prospect_slug,contact_email,status,outreach_send_status,outreach_draft_subject,outreach_draft_body,date_contacted,last_contacted_at,follow_up_1_due_at,follow_up_1_sent_at,follow_up_2_due_at,follow_up_2_sent_at,next_follow_up_at,reply_status";
const dashboardProspectSelect =
  `${prospectSummarySelect},business_name,city_state,vertical,website,demo_url,source_page,observed_issue,outreach_angle,metadata,created_at`;
const legacyDashboardProspectSelect =
  `${legacyProspectSummarySelect},business_name,city_state,vertical,website,demo_url,source_page,observed_issue,outreach_angle,metadata,created_at`;

export type ProspectDraftApprovalAction = "approve_for_send" | "revoke_send_approval";
export type ProspectFollowUpApprovalAction =
  | "approve_follow_up_send"
  | "revoke_follow_up_send";
export type ProspectRelationshipAction = "mark_do_not_contact" | "mark_not_interested";
export type ProspectManualFollowUpStep = FollowUpStep;
export type ManualContactMethod =
  | "contact_form"
  | "email"
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

export type ManualFollowUpInput = {
  note?: string;
  nextFollowUpDays?: number;
};

const manualContactMethodLabels: Record<ManualContactMethod, string> = {
  contact_form: "contact form",
  email: "email",
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

const stoppedRelationshipStatuses = new Set([
  "do_not_contact",
  "not_interested",
  "positive_reply",
  "negative_reply",
  "won",
  "lost",
  "not_fit",
]);
const replyRelationshipStatuses = new Set(["positive_reply", "neutral_reply", "negative_reply"]);

const stableDemoUrlPrefix = "https://local-growth-preview.vercel.app/";

export function getFollowUpChannelPolicy(channel: string | null): FollowUpChannelPolicy {
  if (channel === "email") {
    return {
      key: "email",
      label: "Email",
      canAutoSendFollowUps: true,
      reminderOnly: false,
      requiresManualEvidence: false,
      approvalBlocker: null,
    };
  }

  if (channel === "contact_form") {
    return {
      key: "contact_form",
      label: "Contact form",
      canAutoSendFollowUps: false,
      reminderOnly: true,
      requiresManualEvidence: true,
      approvalBlocker:
        "Contact-form follow-ups must be sent manually and recorded with Record Follow-up.",
    };
  }

  if (channel === "manual") {
    return {
      key: "manual",
      label: "Manual",
      canAutoSendFollowUps: false,
      reminderOnly: true,
      requiresManualEvidence: true,
      approvalBlocker:
        "Manual-channel follow-ups must be sent manually and recorded with Record Follow-up.",
    };
  }

  return {
    key: "unknown",
    label: "Unspecified channel",
    canAutoSendFollowUps: false,
    reminderOnly: true,
    requiresManualEvidence: true,
    approvalBlocker:
      "Follow-up send approval is email-only. Set the outreach channel to email or record the follow-up manually.",
  };
}

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

function prospectSummaryFromRow(row: Partial<SupabaseProspectSummaryRow>): ProspectDraftSummary {
  return {
    businessEmail: row.contact_email ?? null,
    contactStatus: row.status ?? null,
    hasEmailDraft: hasText(row.outreach_draft_subject ?? null) && hasText(row.outreach_draft_body ?? null),
    outreachSendStatus: row.outreach_send_status ?? null,
    dateContacted: row.date_contacted ?? null,
    lastContactedAt: row.last_contacted_at ?? null,
    followUp1DueAt: row.follow_up_1_due_at ?? null,
    followUp1SentAt: row.follow_up_1_sent_at ?? null,
    followUp2DueAt: row.follow_up_2_due_at ?? null,
    followUp2SentAt: row.follow_up_2_sent_at ?? null,
    nextFollowUpAt: row.next_follow_up_at ?? null,
    followUpSendStatus: row.follow_up_send_status ?? null,
    followUpApproved: Boolean(row.follow_up_approved),
    followUpStep: row.follow_up_step ?? null,
    hasFollowUpDraft: hasText(row.follow_up_draft_subject ?? null) && hasText(row.follow_up_draft_body ?? null),
    replyStatus: row.reply_status ?? null,
    source: "supabase",
  };
}

function demoNicheFromVertical(vertical: string | null | undefined): DemoNiche {
  if (vertical === "med_spa") {
    return "med_spa";
  }

  if (vertical === "roofing" || vertical === "restaurant" || vertical === "hvac" || vertical === "plumbing") {
    return vertical;
  }

  return "other";
}

function demoStatusFromProspect(row: Partial<SupabaseDashboardProspectRow>): DemoStatus {
  if (row.status === "contacted") {
    return "contacted";
  }

  if (
    row.status === "follow_up_1_due" ||
    row.status === "follow_up_1_sent" ||
    row.status === "follow_up_2_due" ||
    row.status === "follow_up_2_sent"
  ) {
    return "follow_up";
  }

  if (row.outreach_send_status === "ready_for_review" || row.outreach_send_status === "approved") {
    return "outreach_ready";
  }

  if (row.metadata?.package_status === "recommendation_created" || row.demo_url) {
    return "ready_for_review";
  }

  return "researching";
}

function stageLabelFromProspect(row: Partial<SupabaseDashboardProspectRow>) {
  if (row.metadata?.package_status === "recommendation_created") {
    return "Recommendation package created";
  }

  if (row.outreach_send_status === "ready_for_review") {
    return "Outreach ready for review";
  }

  if (row.outreach_send_status === "approved") {
    return "Outreach approved";
  }

  if (row.outreach_send_status === "sent") {
    return "Outreach sent";
  }

  return "Qualified prospect";
}

function primaryServiceFromProspect(row: Partial<SupabaseDashboardProspectRow>) {
  if (typeof row.metadata?.primary_recommendation === "string") {
    return row.metadata.primary_recommendation;
  }

  if (row.vertical === "med_spa") {
    return "Med spa growth system";
  }

  return "Local growth system";
}

function initialsFromBusinessName(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part.replace(/[^a-z0-9]/gi, ""))
    .filter(Boolean)
    .slice(0, 3)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function dashboardEntryFromSupabaseRow(row: Partial<SupabaseDashboardProspectRow>): DemoEntry | null {
  if (!row.prospect_slug || !row.business_name) {
    return null;
  }

  const href = row.demo_url ?? row.website ?? "#";
  const hasDemo = Boolean(row.demo_url);

  return {
    slug: row.prospect_slug,
    title: row.business_name,
    shortName: initialsFromBusinessName(row.business_name) || row.business_name,
    createdAt: row.created_at?.slice(0, 10) ?? "2026-07-03",
    city: row.city_state ?? "Unknown city, US",
    niche: demoNicheFromVertical(row.vertical),
    status: demoStatusFromProspect(row),
    stageLabel: stageLabelFromProspect(row),
    primaryService: primaryServiceFromProspect(row),
    observedIssue: row.observed_issue ?? row.outreach_angle ?? "Qualified prospect in Supabase.",
    href,
    previewLabel: hasDemo ? "Preview" : "Website",
    isExternalHref: href.startsWith("http"),
    sourceUrl: row.website ?? undefined,
    contactEmail: row.contact_email ?? undefined,
    hasEmailDraft: hasText(row.outreach_draft_subject ?? null) && hasText(row.outreach_draft_body ?? null),
  };
}

function normalizeSupabaseProspectRow(row: Partial<SupabaseProspectRow>): SupabaseProspectRow {
  return {
    business_name: row.business_name ?? "",
    contact_email: row.contact_email ?? null,
    status: row.status ?? null,
    outreach_send_status: row.outreach_send_status ?? null,
    outreach_send_channel: row.outreach_send_channel ?? null,
    outreach_approved: row.outreach_approved ?? false,
    outreach_approved_at: row.outreach_approved_at ?? null,
    outreach_approved_by: row.outreach_approved_by ?? null,
    outreach_draft_subject: row.outreach_draft_subject ?? null,
    outreach_draft_body: row.outreach_draft_body ?? null,
    website: row.website ?? null,
    demo_url: row.demo_url ?? null,
    date_contacted: row.date_contacted ?? null,
    last_contacted_at: row.last_contacted_at ?? null,
    follow_up_1_due_at: row.follow_up_1_due_at ?? null,
    follow_up_1_sent_at: row.follow_up_1_sent_at ?? null,
    follow_up_2_due_at: row.follow_up_2_due_at ?? null,
    follow_up_2_sent_at: row.follow_up_2_sent_at ?? null,
    next_follow_up_at: row.next_follow_up_at ?? null,
    follow_up_send_status: row.follow_up_send_status ?? null,
    follow_up_approved: row.follow_up_approved ?? false,
    follow_up_approved_at: row.follow_up_approved_at ?? null,
    follow_up_approved_by: row.follow_up_approved_by ?? null,
    follow_up_step: row.follow_up_step ?? null,
    follow_up_draft_subject: row.follow_up_draft_subject ?? null,
    follow_up_draft_body: row.follow_up_draft_body ?? null,
    follow_up_last_error: row.follow_up_last_error ?? null,
    reply_status: row.reply_status ?? null,
    notes: row.notes ?? null,
  };
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

  if (draft.contactStatus && stoppedRelationshipStatuses.has(draft.contactStatus)) {
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

function getCurrentFollowUpStep(row: {
  contactStatus: string | null;
  followUp1SentAt: string | null;
  followUp2SentAt: string | null;
}): FollowUpStep | null {
  if (row.followUp2SentAt || row.contactStatus === "follow_up_2_sent") {
    return null;
  }

  if (
    row.followUp1SentAt ||
    row.contactStatus === "follow_up_1_sent" ||
    row.contactStatus === "follow_up_2_due"
  ) {
    return "follow_up_2";
  }

  return "follow_up_1";
}

function getFollowUpApprovalBlockers(
  draft: Pick<
    ProspectDraft,
    | "businessEmail"
    | "contactStatus"
    | "demoUrl"
    | "followUp1SentAt"
    | "followUp2SentAt"
    | "followUpBody"
    | "followUpStep"
    | "followUpSubject"
    | "nextFollowUpAt"
    | "outreachSendStatus"
    | "outreachSendChannel"
    | "replyStatus"
  >,
) {
  const blockers: string[] = [];
  const expectedStep = getCurrentFollowUpStep(draft);
  const channelPolicy = getFollowUpChannelPolicy(draft.outreachSendChannel);

  if (!channelPolicy.canAutoSendFollowUps && channelPolicy.approvalBlocker) {
    blockers.push(channelPolicy.approvalBlocker);
  }

  if (draft.outreachSendStatus !== "sent") {
    blockers.push("First outreach must be marked sent before follow-up approval.");
  }

  if (draft.contactStatus === "not_contacted") {
    blockers.push("Prospect must be contacted before follow-up approval.");
  }

  if (draft.contactStatus && stoppedRelationshipStatuses.has(draft.contactStatus)) {
    blockers.push(`${relationshipStatusLabel(draft.contactStatus)} rows are not eligible for follow-up approval.`);
  }

  if (draft.contactStatus && replyRelationshipStatuses.has(draft.contactStatus)) {
    blockers.push("Prospects with a reply status should be reviewed manually before more follow-up.");
  }

  if (draft.replyStatus?.trim()) {
    blockers.push("Prospects with reply_status set are not eligible for follow-up approval.");
  }

  if (!expectedStep) {
    blockers.push("Both supported follow-ups are already complete.");
  }

  if (draft.followUpStep && expectedStep && draft.followUpStep !== expectedStep) {
    blockers.push(`Stored follow-up step must match ${expectedStep}.`);
  }

  if (!draft.nextFollowUpAt) {
    blockers.push("Next follow-up due date is required.");
  }

  if (!hasText(draft.businessEmail)) {
    blockers.push("Verified contact email is required for n8n follow-up sending.");
  }

  if (!hasText(draft.followUpSubject)) {
    blockers.push("Stored follow-up subject is required.");
  }

  if (!hasText(draft.followUpBody)) {
    blockers.push("Stored follow-up body is required.");
  }

  if (!draft.demoUrl?.startsWith(stableDemoUrlPrefix)) {
    blockers.push("Demo URL must use the stable local-growth-preview.vercel.app alias.");
  }

  if (expectedStep === "follow_up_1" && draft.followUp1SentAt) {
    blockers.push("Follow-up 1 is already recorded as sent.");
  }

  if (expectedStep === "follow_up_2") {
    if (!draft.followUp1SentAt) {
      blockers.push("Follow-up 1 must be sent before follow-up 2 can be approved.");
    }

    if (draft.followUp2SentAt) {
      blockers.push("Follow-up 2 is already recorded as sent.");
    }
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
    dateContacted: row.date_contacted,
    lastContactedAt: row.last_contacted_at,
    followUp1DueAt: row.follow_up_1_due_at,
    followUp1SentAt: row.follow_up_1_sent_at,
    followUp2DueAt: row.follow_up_2_due_at,
    followUp2SentAt: row.follow_up_2_sent_at,
    nextFollowUpAt: row.next_follow_up_at,
    followUpSendStatus: row.follow_up_send_status,
    followUpApproved: Boolean(row.follow_up_approved),
    followUpApprovedAt: row.follow_up_approved_at,
    followUpApprovedBy: row.follow_up_approved_by,
    followUpStep: row.follow_up_step,
    followUpSubject: normalizeDraftText(row.follow_up_draft_subject),
    followUpBody: normalizeDraftText(row.follow_up_draft_body),
    followUpLastError: row.follow_up_last_error,
    followUpChannelPolicy: getFollowUpChannelPolicy(row.outreach_send_channel),
    replyStatus: row.reply_status,
    notes: row.notes,
    approvalBlockers: [],
    followUpApprovalBlockers: [],
    source: "supabase" as const,
  };

  return {
    ...draft,
    approvalBlockers: getApprovalBlockers(draft),
    followUpApprovalBlockers: getFollowUpApprovalBlockers(draft),
  };
}

export function getSupabaseConfig(options: { requireServiceRole?: boolean } = {}) {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey =
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const key = options.requireServiceRole
    ? serviceRoleKey
    : serviceRoleKey ?? publishableKey;
  const isJwtKey = key?.split(".").length === 3;
  const isSecretKey = key?.startsWith("sb_secret_");
  const apiKey = isSecretKey ? key : publishableKey ?? key;
  const authorizationKey = isJwtKey ? key : null;

  if (!url || !key || !apiKey) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ""),
    key,
    apiKey,
    authorizationKey,
  };
}

function getSupabaseHeaders(
  config: NonNullable<ReturnType<typeof getSupabaseConfig>>,
  extraHeaders: Record<string, string> = {},
) {
  return {
    apikey: config.apiKey,
    ...(config.authorizationKey
      ? {
          Authorization: `Bearer ${config.authorizationKey}`,
        }
      : {}),
    ...extraHeaders,
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
    dateContacted: null,
    lastContactedAt: null,
    followUp1DueAt: null,
    followUp1SentAt: null,
    followUp2DueAt: null,
    followUp2SentAt: null,
    nextFollowUpAt: null,
    followUpSendStatus: null,
    followUpApproved: false,
    followUpApprovedAt: null,
    followUpApprovedBy: null,
    followUpStep: null,
    followUpSubject: null,
    followUpBody: null,
    followUpLastError: null,
    followUpChannelPolicy: getFollowUpChannelPolicy(null),
    replyStatus: null,
    notes: null,
    approvalBlockers: ["Local fallback drafts cannot be approved for n8n."],
    followUpApprovalBlockers: ["Local fallback drafts cannot be approved for n8n follow-up sending."],
    source: "local",
  };
}

async function fetchSupabaseProspectDraft(slug: string, config = getSupabaseConfig()) {
  if (!config) {
    return null;
  }

  const supabaseConfig = config;

  async function requestProspect(select: string) {
    const params = new URLSearchParams({
      prospect_slug: `eq.${slug}`,
      select,
      limit: "1",
    });

    return fetch(`${supabaseConfig.url}/rest/v1/prospects?${params}`, {
      headers: getSupabaseHeaders(supabaseConfig),
      cache: "no-store",
    });
  }

  let response = await requestProspect(prospectDraftSelect);

  if (!response.ok) {
    response = await requestProspect(legacyProspectDraftSelect);
  }

  if (!response.ok) {
    return null;
  }

  const rows = (await response.json()) as Partial<SupabaseProspectRow>[];
  const row = rows[0];

  return row ? normalizeSupabaseProspectRow(row) : null;
}

export async function getProspectDraftSummaries(slugs: string[]) {
  const config = getSupabaseConfig();

  if (!config || slugs.length === 0) {
    return {};
  }

  const supabaseConfig = config;
  const uniqueSlugs = [...new Set(slugs)];
  try {
    async function requestSummaries(select: string) {
      const params = new URLSearchParams({
        prospect_slug: `in.(${uniqueSlugs.join(",")})`,
        select,
      });

      return fetch(`${supabaseConfig.url}/rest/v1/prospects?${params}`, {
        headers: getSupabaseHeaders(supabaseConfig),
        cache: "no-store",
      });
    }

    let response = await requestSummaries(prospectSummarySelect);

    if (!response.ok) {
      response = await requestSummaries(legacyProspectSummarySelect);
    }

    if (!response.ok) {
      return {};
    }

    const rows = (await response.json()) as Partial<SupabaseProspectSummaryRow>[];

    return rows.reduce<Record<string, ProspectDraftSummary>>((summaries, row) => {
      if (!row.prospect_slug) {
        return summaries;
      }

      summaries[row.prospect_slug] = prospectSummaryFromRow(row);

      return summaries;
    }, {});
  } catch {
    return {};
  }
}

export async function getSupabaseDashboardEntries(excludedSlugs: string[] = []) {
  const config = getSupabaseConfig();

  if (!config) {
    return {
      entries: [],
      summaries: {},
    };
  }

  const excludedSlugSet = new Set(excludedSlugs);
  const supabaseConfig = config;

  try {
    async function requestEntries(select: string) {
      const params = new URLSearchParams({
        select,
        order: "created_at.desc",
      });

      return fetch(`${supabaseConfig.url}/rest/v1/prospects?${params}`, {
        headers: getSupabaseHeaders(supabaseConfig),
        cache: "no-store",
      });
    }

    let response = await requestEntries(dashboardProspectSelect);

    if (!response.ok) {
      response = await requestEntries(legacyDashboardProspectSelect);
    }

    if (!response.ok) {
      return {
        entries: [],
        summaries: {},
      };
    }

    const rows = (await response.json()) as Partial<SupabaseDashboardProspectRow>[];
    const entries: DemoEntry[] = [];
    const summaries: Record<string, ProspectDraftSummary> = {};

    rows.forEach((row) => {
      if (!row.prospect_slug || excludedSlugSet.has(row.prospect_slug)) {
        return;
      }

      const entry = dashboardEntryFromSupabaseRow(row);

      if (!entry) {
        return;
      }

      entries.push(entry);
      summaries[row.prospect_slug] = prospectSummaryFromRow(row);
    });

    return {
      entries,
      summaries,
    };
  } catch {
    return {
      entries: [],
      summaries: {},
    };
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

export async function updateProspectDraftApproval(
  slug: string,
  action: ProspectDraftApprovalAction,
  approvedBy: string,
) {
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

  if (action === "approve_for_send") {
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
        error: "Only ready_for_review rows can be approved for n8n sending.",
        status: 409,
      };
    }
  }

  if (action === "revoke_send_approval" && draft.outreachSendStatus !== "approved") {
    return {
      draft,
      error: "Only approved rows can be revoked from the dashboard.",
      status: 409,
    };
  }

  const update =
    action === "approve_for_send"
      ? {
          outreach_approved: true,
          outreach_approved_at: new Date().toISOString(),
          outreach_approved_by: approvedBy,
          outreach_send_channel: "email",
          outreach_send_status: "approved",
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
    headers: getSupabaseHeaders(config, {
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }),
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

export async function updateProspectFollowUpApproval(
  slug: string,
  action: ProspectFollowUpApprovalAction,
  approvedBy: string,
) {
  const config = getSupabaseConfig({ requireServiceRole: true });

  if (!config) {
    return {
      draft: null,
      error: "Supabase is not configured for follow-up approval updates.",
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
  const expectedStep = getCurrentFollowUpStep(draft);

  if (action === "approve_follow_up_send") {
    if (draft.followUpApprovalBlockers.length > 0) {
      return {
        draft,
        error: "Follow-up cannot be approved until all readiness checks pass.",
        status: 422,
      };
    }

    if (!expectedStep) {
      return {
        draft,
        error: "There is no supported follow-up step left to approve.",
        status: 409,
      };
    }

    if (draft.followUpSendStatus && ["approved", "queued", "sent"].includes(draft.followUpSendStatus)) {
      return {
        draft,
        error: "This follow-up row is already approved, queued, or sent.",
        status: 409,
      };
    }

    if (draft.followUpSendStatus !== "ready_for_review") {
      return {
        draft,
        error: "Only ready_for_review follow-up rows can be approved for n8n sending.",
        status: 409,
      };
    }
  }

  if (action === "revoke_follow_up_send" && draft.followUpSendStatus !== "approved") {
    return {
      draft,
      error: "Only approved follow-up rows can be revoked from the dashboard.",
      status: 409,
    };
  }

  const now = new Date().toISOString();
  const update =
    action === "approve_follow_up_send"
      ? {
          follow_up_approved: true,
          follow_up_approved_at: now,
          follow_up_approved_by: approvedBy,
          follow_up_send_status: "approved",
          follow_up_step: expectedStep,
          follow_up_pre_send_checked_at: now,
          follow_up_pre_send_checked_by: approvedBy,
          follow_up_pre_send_checklist: {
            copy_reviewed: true,
            demo_url_verified: true,
            recipient_verified: true,
            follow_up_step_verified: true,
            manual_reply_check_complete: true,
            approved_from_dashboard: true,
            reviewed_by: approvedBy,
            reviewed_at: now,
          },
          follow_up_last_error: null,
        }
      : {
          follow_up_approved: false,
          follow_up_approved_at: null,
          follow_up_approved_by: null,
          follow_up_send_status: "ready_for_review",
          follow_up_pre_send_checked_at: null,
          follow_up_pre_send_checked_by: null,
          follow_up_pre_send_checklist: {},
          follow_up_last_error: null,
        };

  const response = await fetch(`${config.url}/rest/v1/prospects?prospect_slug=eq.${slug}`, {
    method: "PATCH",
    headers: getSupabaseHeaders(config, {
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }),
    body: JSON.stringify(update),
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      draft,
      error: "Supabase rejected the follow-up approval update.",
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

function clearFollowUpApprovalFields() {
  return {
    follow_up_approved: false,
    follow_up_approved_at: null,
    follow_up_approved_by: null,
    follow_up_send_status: "not_ready",
    follow_up_step: null,
    follow_up_draft_subject: null,
    follow_up_draft_body: null,
    follow_up_pre_send_checked_at: null,
    follow_up_pre_send_checked_by: null,
    follow_up_pre_send_checklist: {},
    follow_up_last_error: null,
  };
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

function getNextManualFollowUpStep(row: SupabaseProspectRow): ProspectManualFollowUpStep | null {
  if (row.follow_up_2_sent_at || row.status === "follow_up_2_sent") {
    return null;
  }

  if (
    row.follow_up_1_sent_at ||
    row.status === "follow_up_1_sent" ||
    row.status === "follow_up_2_due"
  ) {
    return "follow_up_2";
  }

  return "follow_up_1";
}

function isFollowUpStopped(row: SupabaseProspectRow) {
  return (
    Boolean(row.status && stoppedRelationshipStatuses.has(row.status)) ||
    Boolean(row.status && replyRelationshipStatuses.has(row.status)) ||
    Boolean(row.reply_status?.trim())
  );
}

function appendManualFollowUpNote(
  currentNotes: string | null,
  step: ProspectManualFollowUpStep,
  note: string | undefined,
  sentAt: Date,
  nextFollowUpAt: Date | null,
) {
  const noteParts = [
    `Dashboard manual ${step === "follow_up_1" ? "follow-up 1" : "follow-up 2"} recorded ${sentAt.toISOString()}.`,
    nextFollowUpAt ? `Next follow-up due: ${nextFollowUpAt.toISOString()}.` : "Follow-up sequence complete.",
    note?.trim() ? `Note: ${note.trim()}` : null,
  ].filter(Boolean);

  return [currentNotes?.trim(), noteParts.join(" ")].filter(Boolean).join("\n\n");
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
    outreach_send_channel:
      method === "contact_form" ? "contact_form" : method === "email" ? "email" : "manual",
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
    headers: getSupabaseHeaders(config, {
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }),
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

export async function updateProspectManualFollowUp(slug: string, input: ManualFollowUpInput) {
  const config = getSupabaseConfig({ requireServiceRole: true });

  if (!config) {
    return {
      draft: null,
      error: "Supabase is not configured for manual follow-up updates.",
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

  if (draft.outreachSendStatus !== "sent") {
    return {
      draft,
      error: "Follow-ups can only be recorded after the first outreach send is marked sent.",
      status: 409,
    };
  }

  if (isFollowUpStopped(row)) {
    return {
      draft,
      error: "Stopped or replied prospects are not eligible for manual follow-up recording.",
      status: 409,
    };
  }

  if (draft.contactStatus === "not_contacted") {
    return {
      draft,
      error: "Follow-ups can only be recorded for already contacted prospects.",
      status: 409,
    };
  }

  const step = getNextManualFollowUpStep(row);

  if (!step) {
    return {
      draft,
      error: "This prospect already has both supported follow-ups recorded.",
      status: 409,
    };
  }

  const sentAt = new Date();
  const nextFollowUpDays = clampFollowUpDays(input.nextFollowUpDays);
  const followUp2DueAt = new Date(sentAt);
  followUp2DueAt.setDate(followUp2DueAt.getDate() + nextFollowUpDays);

  const update =
    step === "follow_up_1"
      ? {
          status: "follow_up_1_sent",
          last_contacted_at: sentAt.toISOString(),
          follow_up_1_sent_at: sentAt.toISOString(),
          follow_up_2_due_at: followUp2DueAt.toISOString(),
          next_follow_up_at: followUp2DueAt.toISOString(),
          outreach_last_error: null,
          ...clearFollowUpApprovalFields(),
          notes: appendManualFollowUpNote(
            row.notes,
            step,
            input.note,
            sentAt,
            followUp2DueAt,
          ),
        }
      : {
          status: "follow_up_2_sent",
          last_contacted_at: sentAt.toISOString(),
          follow_up_2_sent_at: sentAt.toISOString(),
          next_follow_up_at: null,
          outreach_last_error: null,
          ...clearFollowUpApprovalFields(),
          notes: appendManualFollowUpNote(row.notes, step, input.note, sentAt, null),
        };

  const response = await fetch(`${config.url}/rest/v1/prospects?prospect_slug=eq.${slug}`, {
    method: "PATCH",
    headers: getSupabaseHeaders(config, {
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }),
    body: JSON.stringify(update),
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      draft,
      error: "Supabase rejected the manual follow-up update.",
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
    ...clearFollowUpApprovalFields(),
    notes: appendRelationshipStatusNote(row.notes, action, note, changedAt),
  };

  const response = await fetch(`${config.url}/rest/v1/prospects?prospect_slug=eq.${slug}`, {
    method: "PATCH",
    headers: getSupabaseHeaders(config, {
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }),
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
