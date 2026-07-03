import { getSupabaseConfig, getSupabaseHeaders } from "./prospectDrafts";

export type DashboardFocusItem = {
  slug: string;
  addedAt: string;
  addedBy: string | null;
};

export type DashboardFocusState = {
  items: DashboardFocusItem[];
  source: "supabase" | "unavailable";
};

type SupabaseDashboardFocusRow = {
  prospect_slug: string;
  added_at: string;
  added_by: string | null;
};

function rowToFocusItem(row: Partial<SupabaseDashboardFocusRow>): DashboardFocusItem | null {
  if (!row.prospect_slug || !row.added_at) {
    return null;
  }

  return {
    slug: row.prospect_slug,
    addedAt: row.added_at,
    addedBy: row.added_by ?? null,
  };
}

function normalizeFocusRows(rows: Partial<SupabaseDashboardFocusRow>[]) {
  return rows.reduce<DashboardFocusItem[]>((items, row) => {
    const item = rowToFocusItem(row);

    if (item) {
      items.push(item);
    }

    return items;
  }, []);
}

function focusItemsEndpoint(config: NonNullable<ReturnType<typeof getSupabaseConfig>>) {
  return `${config.url}/rest/v1/dashboard_focus_items`;
}

export async function getDashboardFocusState(): Promise<DashboardFocusState> {
  const config = getSupabaseConfig({ requireServiceRole: true });

  if (!config) {
    return {
      items: [],
      source: "unavailable",
    };
  }

  const params = new URLSearchParams({
    select: "prospect_slug,added_at,added_by",
    order: "added_at.desc",
  });

  try {
    const response = await fetch(`${focusItemsEndpoint(config)}?${params}`, {
      headers: getSupabaseHeaders(config),
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        items: [],
        source: "unavailable",
      };
    }

    const rows = (await response.json()) as Partial<SupabaseDashboardFocusRow>[];

    return {
      items: normalizeFocusRows(rows),
      source: "supabase",
    };
  } catch {
    return {
      items: [],
      source: "unavailable",
    };
  }
}

export async function addDashboardFocusItem(slug: string, addedBy: string) {
  const config = getSupabaseConfig({ requireServiceRole: true });

  if (!config) {
    return null;
  }

  const params = new URLSearchParams({
    on_conflict: "prospect_slug",
  });

  const response = await fetch(`${focusItemsEndpoint(config)}?${params}`, {
    method: "POST",
    headers: getSupabaseHeaders(config, {
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    }),
    body: JSON.stringify({
      prospect_slug: slug,
      added_at: new Date().toISOString(),
      added_by: addedBy,
    }),
    cache: "no-store",
  });

  return response.ok;
}

export async function replaceDashboardFocusItems(items: DashboardFocusItem[], addedBy: string) {
  const config = getSupabaseConfig({ requireServiceRole: true });

  if (!config) {
    return null;
  }

  const deleteResponse = await fetch(
    `${focusItemsEndpoint(config)}?prospect_slug=not.is.null`,
    {
      method: "DELETE",
      headers: getSupabaseHeaders(config),
      cache: "no-store",
    },
  );

  if (!deleteResponse.ok) {
    return false;
  }

  if (items.length === 0) {
    return true;
  }

  const response = await fetch(focusItemsEndpoint(config), {
    method: "POST",
    headers: getSupabaseHeaders(config, {
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    }),
    body: JSON.stringify(
      items.map((item) => ({
        prospect_slug: item.slug,
        added_at: item.addedAt,
        added_by: item.addedBy ?? addedBy,
      })),
    ),
    cache: "no-store",
  });

  return response.ok;
}

export async function removeDashboardFocusItem(slug: string) {
  const config = getSupabaseConfig({ requireServiceRole: true });

  if (!config) {
    return null;
  }

  const response = await fetch(`${focusItemsEndpoint(config)}?prospect_slug=eq.${slug}`, {
    method: "DELETE",
    headers: getSupabaseHeaders(config),
    cache: "no-store",
  });

  return response.ok;
}
