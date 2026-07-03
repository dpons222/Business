import { NextResponse } from "next/server";
import { getDashboardSession } from "@/lib/dashboardAuth";
import {
  addDashboardFocusItem,
  getDashboardFocusState,
  removeDashboardFocusItem,
  replaceDashboardFocusItems,
  type DashboardFocusItem,
} from "@/lib/dashboardFocus";
import { getDashboardProspectData } from "@/lib/prospectDrafts";

type DashboardFocusPayload =
  | {
      action?: "add" | "remove";
      slug?: unknown;
    }
  | {
      action?: "clear";
    }
  | {
      action?: "replace";
      items?: unknown;
    };

function isValidFocusSlug(value: unknown, validSlugs: Set<string>): value is string {
  return typeof value === "string" && validSlugs.has(value);
}

function normalizeReplacementItems(
  value: unknown,
  validSlugs: Set<string>,
): DashboardFocusItem[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const seenSlugs = new Set<string>();
  const items: DashboardFocusItem[] = [];

  value.forEach((item) => {
    if (!item || typeof item !== "object") {
      return;
    }

    const candidate = item as Partial<DashboardFocusItem>;

    if (
      !candidate.slug ||
      !validSlugs.has(candidate.slug) ||
      seenSlugs.has(candidate.slug)
    ) {
      return;
    }

    const parsedAddedAt =
      typeof candidate.addedAt === "string" ? new Date(candidate.addedAt) : null;

    items.push({
      slug: candidate.slug,
      addedAt:
        parsedAddedAt && Number.isFinite(parsedAddedAt.getTime())
          ? parsedAddedAt.toISOString()
          : new Date().toISOString(),
      addedBy: typeof candidate.addedBy === "string" ? candidate.addedBy : null,
    });
    seenSlugs.add(candidate.slug);
  });

  return items.sort((first, second) => second.addedAt.localeCompare(first.addedAt));
}

async function getValidDashboardSlugs() {
  const { entries } = await getDashboardProspectData();

  return new Set(entries.map((entry) => entry.slug));
}

export async function GET() {
  const session = await getDashboardSession();

  if (!session) {
    return NextResponse.json({ error: "Dashboard session required" }, { status: 401 });
  }

  const state = await getDashboardFocusState();

  if (state.source === "unavailable") {
    return NextResponse.json(
      {
        error: "Supabase focus list is unavailable.",
        items: [],
      },
      { status: 503 },
    );
  }

  return NextResponse.json(state);
}

export async function PATCH(request: Request) {
  const session = await getDashboardSession();

  if (!session) {
    return NextResponse.json({ error: "Dashboard session required" }, { status: 401 });
  }

  const payload = (await request.json().catch(() => null)) as DashboardFocusPayload | null;

  if (!payload?.action) {
    return NextResponse.json({ error: "Invalid focus action" }, { status: 400 });
  }

  const validSlugs = await getValidDashboardSlugs();
  let didUpdate: boolean | null = null;

  if (payload.action === "add") {
    if (!isValidFocusSlug(payload.slug, validSlugs)) {
      return NextResponse.json({ error: "Dashboard entry not found" }, { status: 404 });
    }

    didUpdate = await addDashboardFocusItem(payload.slug, session.username);
  } else if (payload.action === "remove") {
    if (typeof payload.slug !== "string") {
      return NextResponse.json({ error: "Focus slug is required" }, { status: 400 });
    }

    didUpdate = await removeDashboardFocusItem(payload.slug);
  } else if (payload.action === "clear") {
    didUpdate = await replaceDashboardFocusItems([], session.username);
  } else if (payload.action === "replace") {
    const items = normalizeReplacementItems(payload.items, validSlugs);

    if (!items) {
      return NextResponse.json({ error: "Replacement focus items are invalid" }, { status: 400 });
    }

    didUpdate = await replaceDashboardFocusItems(items, session.username);
  }

  if (!didUpdate) {
    return NextResponse.json(
      {
        error: "Supabase focus list is unavailable.",
      },
      { status: 503 },
    );
  }

  const state = await getDashboardFocusState();

  if (state.source === "unavailable") {
    return NextResponse.json(
      {
        error: "Focus update succeeded, but the updated list could not be read.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json(state);
}
