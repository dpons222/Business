const logoUrl =
  "https://recurve-customer-assets.s3.us-east-2.amazonaws.com/Pizza+Bella/Screen+Shot+2024-01-30+at+12.12.03+PM.png";

const heroImageUrl =
  "https://recurve-customer-assets.s3.us-east-2.amazonaws.com/Pizza+Bella/Screen+Shot+2024-02-28+at+12.15.56+PM.png";

const menuCards = [
  {
    title: "New York Style Pizza",
    note: "Classic pies with the toppings guests expect for an easy pickup, delivery, or family dinner order.",
    image: "https://s3.us-east-2.amazonaws.com/arrowpos-menu-images/00bd14d9-40c0-4056-a354-0c5b7c0a58f2.jpg",
  },
  {
    title: "Calzones & Strombolis",
    note: "Warm, filling favorites for lunch, dinner, or sharing at the table.",
    image: "https://s3.us-east-2.amazonaws.com/arrowpos-menu-images/2bfaec49-69fb-41ff-a266-810760303014.jpg",
  },
  {
    title: "Buffalo Wings",
    note: "Add wings to round out pizza night, game day, or a group order.",
    image: "https://s3.us-east-2.amazonaws.com/arrowpos-menu-images/f9793bcf-53dc-46f8-b02d-ddcccc1cfa86.jpg",
  },
  {
    title: "Spaghetti Special",
    note: "Check the latest specials before you order lunch or dinner.",
    image: "https://d2lton1cbsjr4x.cloudfront.net/0714ee58-f9c0-4115-8be2-a0eeb430ba1b.png",
  },
];

export function PizabellaCustomerPreview() {
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
              <p className="text-sm text-white/75">Pizza, pasta, subs, wings & more</p>
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
            Woodstock pizza, pasta, subs and wings
          </p>
          <h1 className="max-w-4xl text-[clamp(2.4rem,7vw,4.9rem)] font-black leading-none text-white">
            Pizza Bella Pizza, Pasta, Subs... and More
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">
            Order online for pickup or delivery, call the shop, or browse favorites before
            your next lunch, dinner, or family pizza night.
          </p>
          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {[
              ["Pickup", "order online and pick up at the shop"],
              ["Delivery", "have Pizza Bella brought to your door"],
              ["30-45 min", "typical wait time shown online"],
              ["Specials", "check current offers before you order"],
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
            Easy ordering
          </p>
          <h2 className="max-w-3xl text-4xl font-black leading-tight">
            Start with pizza, add a favorite, and choose pickup or delivery.
          </h2>
          <div className="mt-5 grid overflow-hidden rounded-lg border border-[#ead8c7] bg-[#ead8c7] md:grid-cols-3">
            {[
              [
                "Order online",
                "Browse the menu, choose pickup or delivery, and place your order when it is convenient.",
              ],
              [
                "Call the shop",
                "Prefer to talk through your order? Call Pizza Bella directly and the team can help.",
              ],
              [
                "Feed the table",
                "Pizza, pasta, subs, wings, calzones, strombolis, and specials make it easy to build a full meal.",
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
              Local favorite
            </p>
            <h2 className="text-2xl font-black">Pizza Bella in Woodstock</h2>
            <p className="mt-4 border-l-4 border-[#e6a756] pl-4 text-lg text-[#6b5a55]">
              Pizza, pasta, subs, wings, and comfort-food favorites for lunch, dinner, pickup,
              and delivery.
            </p>
          </article>
          <article className="rounded-lg border border-[#d8a298] bg-[#fff7ed] p-6 shadow-sm">
            <p className="mb-3 text-xs font-black uppercase tracking-normal text-[#A13D31]">
              Quick next step
            </p>
            <h2 className="text-2xl font-black">Ready to order?</h2>
            <p className="mt-4 border-l-4 border-[#e6a756] pl-4 text-lg">
              Choose online ordering for pickup or delivery, or call Pizza Bella at 540-459-5363.
            </p>
            <p className="mt-3 text-[#6b5a55]">
              Check specials before you order so you do not miss a current offer.
            </p>
          </article>
        </section>

        <section>
          <p className="mb-3 text-xs font-black uppercase tracking-normal text-[#A13D31]">
            Menu favorites
          </p>
          <h2 className="max-w-3xl text-4xl font-black leading-tight">
            Build your order around the classics.
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
          <div className="grid gap-5 md:grid-cols-[1fr_280px]">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-normal text-[#A13D31]">
                Order today
              </p>
              <h2 className="text-3xl font-black">Lunch, dinner, or pizza night is a few clicks away.</h2>
              <p className="mt-3 text-[#6b5a55]">
                Order online when you know what you want, or call Pizza Bella if you have a
                question before placing your order.
              </p>
            </div>
            <aside className="rounded-lg bg-[#FCE7CF] p-5">
              <p className="text-3xl font-black">Pizza Bella</p>
              <p className="mt-2 font-bold">Woodstock, VA</p>
              <div className="mt-4 grid gap-2">
                <a
                  className="button bg-[#A13D31] text-white"
                  href="https://onboarding.arrowpos.com/pizzabella_woodstock"
                >
                  Order Online
                </a>
                <a className="button border-[#A13D31] bg-white text-[#A13D31]" href="tel:5404595363">
                  Call the Shop
                </a>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
