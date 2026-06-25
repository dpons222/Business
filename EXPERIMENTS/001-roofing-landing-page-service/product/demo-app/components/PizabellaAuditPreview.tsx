const logoUrl =
  "https://recurve-customer-assets.s3.us-east-2.amazonaws.com/Pizza+Bella/Screen+Shot+2024-01-30+at+12.12.03+PM.png";

const heroImageUrl =
  "https://recurve-customer-assets.s3.us-east-2.amazonaws.com/Pizza+Bella/Screen+Shot+2024-02-28+at+12.15.56+PM.png";

const menuCards = [
  {
    title: "New York Style Pizza",
    note: "Add a short category blurb and feature the first few high-intent pizza choices before the full menu list.",
    image: "https://s3.us-east-2.amazonaws.com/arrowpos-menu-images/00bd14d9-40c0-4056-a354-0c5b7c0a58f2.jpg",
  },
  {
    title: "Calzones & Strombolis",
    note: "Clarify fillings, portion expectations, and whether these are solo meals or shareable options.",
    image: "https://s3.us-east-2.amazonaws.com/arrowpos-menu-images/2bfaec49-69fb-41ff-a266-810760303014.jpg",
  },
  {
    title: "Buffalo Wings",
    note: "Make sauce choices, quantity, and group-order fit easier to scan before the guest adds wings to cart.",
    image: "https://s3.us-east-2.amazonaws.com/arrowpos-menu-images/f9793bcf-53dc-46f8-b02d-ddcccc1cfa86.jpg",
  },
  {
    title: "Spaghetti Special",
    note: "Move the active lunch special into a visible homepage and weekly posting workflow.",
    image: "https://d2lton1cbsjr4x.cloudfront.net/0714ee58-f9c0-4115-8be2-a0eeb430ba1b.png",
  },
];

export function PizabellaAuditPreview() {
  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#1f1714]">
      <header className="bg-[#A13D31] text-white">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img
              className="h-16 w-16 rounded-lg bg-white object-contain p-2"
              src={logoUrl}
              alt="Pizza Bella logo"
            />
            <div>
              <p className="text-xl font-black leading-tight">Pizza Bella</p>
              <p className="text-sm text-white/75">Customer Journey Audit Preview</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a className="button border-white/35 bg-transparent text-white" href="tel:5404595363">
              Call 540-459-5363
            </a>
            <a
              className="button bg-[#e6a756] text-black"
              href="https://onboarding.arrowpos.com/pizzabella_woodstock"
            >
              Order Online
            </a>
          </div>
        </div>
      </header>

      <section
        className="bg-cover bg-center text-white"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.86), rgba(0,0,0,0.45)), url("${heroImageUrl}")`,
        }}
      >
        <div className="mx-auto w-full max-w-[1120px] px-4 py-16 md:py-24">
          <p className="mb-3 text-xs font-black uppercase tracking-normal text-[#e6a756]">
            Lightweight preview - not a full rebuild
          </p>
          <h1 className="max-w-4xl text-[clamp(2.4rem,7vw,4.9rem)] font-black leading-none text-white">
            Clean up the public path around Pizza Bella&apos;s existing online ordering.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">
            The ordering system is already live. The first practical project is to make the
            homepage, About content, menu merchandising, specials, and public links work harder
            before a guest clicks order.
          </p>
          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {[
              ["184", "visible menu item navigation records observed"],
              ["22", "public order categories observed"],
              ["1", "active online special observed"],
              ["30-45 min", "pickup/delivery wait times shown in order flow"],
            ].map(([value, label]) => (
              <div className="rounded-lg border border-white/20 bg-black/45 p-4" key={label}>
                <strong className="block text-2xl">{value}</strong>
                <span className="text-sm text-white/75">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-[1120px] gap-10 px-4 py-12">
        <section>
          <p className="mb-3 text-xs font-black uppercase tracking-normal text-[#A13D31]">
            Current snapshot
          </p>
          <h2 className="max-w-3xl text-4xl font-black leading-tight">
            What is already working, and what needs cleanup first.
          </h2>
          <div className="mt-5 grid overflow-hidden rounded-lg border border-[#ead8c7] bg-[#ead8c7] md:grid-cols-3">
            {[
              [
                "Ordering is active",
                "Pickup and delivery are available through the ArrowPOS order flow, with future ordering enabled.",
              ],
              [
                "Public site is thin",
                "The homepage does not yet surface best sellers, specials, ordering clarity, or a stronger local reason to order.",
              ],
              [
                "Menu has room to sell",
                "The first pass should improve top categories and high-intent items instead of rewriting everything at once.",
              ],
            ].map(([title, copy]) => (
              <article className="bg-white p-6" key={title}>
                <h3 className="text-lg font-black">{title}</h3>
                <p className="mt-2 text-[#6b5a55]">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <article className="rounded-lg border border-[#ead8c7] bg-white p-6 shadow-sm">
            <p className="mb-3 text-xs font-black uppercase tracking-normal text-[#A13D31]">
              Current
            </p>
            <h2 className="text-2xl font-black">Thin homepage message</h2>
            <p className="mt-4 border-l-4 border-[#e6a756] pl-4 text-lg text-[#6b5a55]">
              Pizza Bella Pizza, Pasta, Subs... and More
            </p>
          </article>
          <article className="rounded-lg border border-[#d8a298] bg-[#fff7ed] p-6 shadow-sm">
            <p className="mb-3 text-xs font-black uppercase tracking-normal text-[#A13D31]">
              Suggested
            </p>
            <h2 className="text-2xl font-black">Clear local order path</h2>
            <p className="mt-4 border-l-4 border-[#e6a756] pl-4 text-lg">
              Woodstock&apos;s neighborhood spot for pizza, pasta, subs, wings, and easy online
              ordering.
            </p>
            <p className="mt-3 text-[#6b5a55]">
              Order pickup or delivery, call the shop, or check today&apos;s special before you
              decide.
            </p>
          </article>
        </section>

        <section>
          <p className="mb-3 text-xs font-black uppercase tracking-normal text-[#A13D31]">
            Menu merchandising
          </p>
          <h2 className="max-w-3xl text-4xl font-black leading-tight">
            Start with the menu areas most likely to guide a fast order.
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {menuCards.map((card) => (
              <article className="overflow-hidden rounded-lg border border-[#ead8c7] bg-white" key={card.title}>
                <img className="h-40 w-full object-cover" src={card.image} alt="" />
                <div className="p-4">
                  <h3 className="font-black">{card.title}</h3>
                  <p className="mt-2 text-sm text-[#6b5a55]">{card.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-[#ead8c7] bg-white p-6">
          <p className="mb-3 text-xs font-black uppercase tracking-normal text-[#A13D31]">
            Pilot offer
          </p>
          <div className="grid gap-5 md:grid-cols-[1fr_280px]">
            <div>
              <h2 className="text-3xl font-black">Restaurant Customer Journey Cleanup</h2>
              <p className="mt-3 text-[#6b5a55]">
                Fix Home/About/Hours copy, tighten order CTAs, review menu/category presentation,
                create a weekly specials workflow, and document public link/tracking recommendations.
              </p>
            </div>
            <aside className="rounded-lg bg-[#FCE7CF] p-5">
              <p className="text-5xl font-black">$750</p>
              <p className="mt-2 font-bold">Fixed-scope pilot</p>
              <p className="mt-2 text-sm text-[#6b5a55]">
                Optional support after the pilot: $250/month for specials updates, tracking review,
                menu copy cleanup, and public link checks.
              </p>
            </aside>
          </div>
        </section>

        <p className="border-t border-[#ead8c7] pt-5 text-sm text-[#6b5a55]">
          Preview notes: This page is based on public pages and public order-flow data reviewed on
          June 25, 2026. Pizza Bella has not approved this copy or design. No claim is made about
          guaranteed orders, revenue, rankings, leads, review results, or platform outcomes.
        </p>
      </div>
    </main>
  );
}
