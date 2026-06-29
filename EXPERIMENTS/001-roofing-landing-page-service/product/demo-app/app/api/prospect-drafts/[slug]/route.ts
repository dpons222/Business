import { NextResponse } from "next/server";
import { getProspectDraft, hasLocalDemoEntry } from "@/lib/prospectDrafts";

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
