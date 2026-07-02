import { NextResponse } from "next/server";
import { getDashboardSession } from "@/lib/dashboardAuth";
import {
  getProspectDraft,
  hasLocalDemoEntry,
  updateProspectRelationshipStatus,
  updateProspectDraftApproval,
  updateProspectFollowUpApproval,
  updateProspectManualContact,
  updateProspectManualFollowUp,
  type ManualContactMethod,
  type ProspectDraftApprovalAction,
  type ProspectFollowUpApprovalAction,
  type ProspectRelationshipAction,
} from "@/lib/prospectDrafts";

type ProspectDraftRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: Request, context: ProspectDraftRouteContext) {
  const { slug } = await context.params;

  if (!hasLocalDemoEntry(slug)) {
    return NextResponse.json({ error: "Prospect not found" }, { status: 404 });
  }

  const draft = await getProspectDraft(slug);

  if (!draft) {
    return NextResponse.json({ error: "Draft not found" }, { status: 404 });
  }

  return NextResponse.json(draft);
}

function isApprovalAction(value: unknown): value is ProspectDraftApprovalAction {
  return value === "approve_for_send" || value === "revoke_send_approval";
}

function isFollowUpApprovalAction(value: unknown): value is ProspectFollowUpApprovalAction {
  return value === "approve_follow_up_send" || value === "revoke_follow_up_send";
}

function isRelationshipAction(value: unknown): value is ProspectRelationshipAction {
  return value === "mark_do_not_contact" || value === "mark_not_interested";
}

function isManualContactMethod(value: unknown): value is ManualContactMethod {
  return (
    value === "contact_form" ||
    value === "email" ||
    value === "phone" ||
    value === "facebook" ||
    value === "instagram" ||
    value === "linkedin" ||
    value === "other"
  );
}

export async function PATCH(request: Request, context: ProspectDraftRouteContext) {
  const session = await getDashboardSession();

  if (!session) {
    return NextResponse.json({ error: "Dashboard session required" }, { status: 401 });
  }

  const { slug } = await context.params;

  if (!hasLocalDemoEntry(slug)) {
    return NextResponse.json({ error: "Prospect not found" }, { status: 404 });
  }

  const payload = (await request.json().catch(() => null)) as
    | {
        action?: unknown;
        method?: unknown;
        note?: unknown;
        followUpDays?: unknown;
      }
    | null;

  if (!payload) {
    return NextResponse.json({ error: "Invalid prospect draft action" }, { status: 400 });
  }

  if (isApprovalAction(payload.action)) {
    const result = await updateProspectDraftApproval(slug, payload.action, session.username);

    if (result.error) {
      return NextResponse.json(
        {
          error: result.error,
          draft: result.draft,
        },
        { status: result.status },
      );
    }

    return NextResponse.json(result.draft);
  }

  if (isFollowUpApprovalAction(payload.action)) {
    const result = await updateProspectFollowUpApproval(
      slug,
      payload.action,
      session.username,
    );

    if (result.error) {
      return NextResponse.json(
        {
          error: result.error,
          draft: result.draft,
        },
        { status: result.status },
      );
    }

    return NextResponse.json(result.draft);
  }

  if (isRelationshipAction(payload.action)) {
    const result = await updateProspectRelationshipStatus(
      slug,
      payload.action,
      typeof payload.note === "string" ? payload.note : "",
    );

    if (result.error) {
      return NextResponse.json(
        {
          error: result.error,
          draft: result.draft,
        },
        { status: result.status },
      );
    }

    return NextResponse.json(result.draft);
  }

  if (payload.action !== "record_manual_contact") {
    if (payload.action !== "record_manual_follow_up") {
      return NextResponse.json({ error: "Invalid prospect draft action" }, { status: 400 });
    }

    const result = await updateProspectManualFollowUp(slug, {
      note: typeof payload.note === "string" ? payload.note : "",
      nextFollowUpDays:
        typeof payload.followUpDays === "number" ? payload.followUpDays : undefined,
    });

    if (result.error) {
      return NextResponse.json(
        {
          error: result.error,
          draft: result.draft,
        },
        { status: result.status },
      );
    }

    return NextResponse.json(result.draft);
  }

  if (!isManualContactMethod(payload.method)) {
    return NextResponse.json({ error: "Manual contact method is invalid" }, { status: 400 });
  }

  const result = await updateProspectManualContact(slug, {
    method: payload.method,
    note: typeof payload.note === "string" ? payload.note : "",
    followUpDays: typeof payload.followUpDays === "number" ? payload.followUpDays : undefined,
  });

  if (result.error) {
    return NextResponse.json(
      {
        error: result.error,
        draft: result.draft,
      },
      { status: result.status },
    );
  }

  return NextResponse.json(result.draft);
}
