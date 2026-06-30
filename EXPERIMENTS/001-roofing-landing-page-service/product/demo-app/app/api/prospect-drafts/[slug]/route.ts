import { NextResponse } from "next/server";
import { getDashboardSession } from "@/lib/dashboardAuth";
import {
  getProspectDraft,
  hasLocalDemoEntry,
  updateProspectDraftApproval,
  type ProspectDraftApprovalAction,
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
  return value === "approve_for_draft" || value === "revoke_draft_approval";
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

  const payload = (await request.json().catch(() => null)) as { action?: unknown } | null;

  if (!payload || !isApprovalAction(payload.action)) {
    return NextResponse.json({ error: "Invalid approval action" }, { status: 400 });
  }

  const result = await updateProspectDraftApproval(slug, payload.action);

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
