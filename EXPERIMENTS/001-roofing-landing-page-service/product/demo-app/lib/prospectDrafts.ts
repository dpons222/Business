import { demoEntries, getDemoEntryBySlug } from "./demoRegistry";

export type ProspectDraft = {
  businessName: string;
  businessEmail: string | null;
  contactStatus: string | null;
  outreachSendStatus: string | null;
  outreachSendChannel: string | null;
  subject: string | null;
  body: string | null;
  website: string | null;
  demoUrl: string | null;
  source: "supabase" | "local";
};

type SupabaseProspectRow = {
  business_name: string;
  contact_email: string | null;
  status: string | null;
  outreach_send_status: string | null;
  outreach_send_channel: string | null;
  outreach_draft_subject: string | null;
  outreach_draft_body: string | null;
  website: string | null;
  demo_url: string | null;
};

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

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY;

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
    subject: localDraft?.subject ?? null,
    body: localDraft?.body ?? null,
    website: entry.sourceUrl ?? null,
    demoUrl: absoluteDemoUrl(entry.href),
    source: "local",
  };
}

export async function getProspectDraft(slug: string): Promise<ProspectDraft | null> {
  const config = getSupabaseConfig();

  if (!config) {
    return getLocalProspectDraft(slug);
  }

  try {
    const params = new URLSearchParams({
      prospect_slug: `eq.${slug}`,
      select:
        "business_name,contact_email,status,outreach_send_status,outreach_send_channel,outreach_draft_subject,outreach_draft_body,website,demo_url",
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
      return getLocalProspectDraft(slug);
    }

    const rows = (await response.json()) as SupabaseProspectRow[];
    const row = rows[0];

    if (!row) {
      return getLocalProspectDraft(slug);
    }

    return {
      businessName: row.business_name,
      businessEmail: row.contact_email,
      contactStatus: row.status,
      outreachSendStatus: row.outreach_send_status,
      outreachSendChannel: row.outreach_send_channel,
      subject: row.outreach_draft_subject,
      body: row.outreach_draft_body,
      website: row.website,
      demoUrl: row.demo_url,
      source: "supabase",
    };
  } catch {
    return getLocalProspectDraft(slug);
  }
}

export function hasLocalDemoEntry(slug: string) {
  return demoEntries.some((entry) => entry.slug === slug);
}
