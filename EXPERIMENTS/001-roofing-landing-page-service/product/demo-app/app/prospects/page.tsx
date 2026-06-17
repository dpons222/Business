import Link from "next/link";
import { prospects } from "../../lib/prospects";

export default function ProspectsIndexPage() {
  const demoLinks = prospects.flatMap((prospect) => {
    if (prospect.slug !== "charger-roofing") {
      return [
        {
          href: `/prospects/${prospect.slug}`,
          label: prospect.companyName,
          variantLabel: prospect.city,
          summary: prospect.primaryService,
          prospect,
        },
      ];
    }

    return [
      {
        href: "/prospects/charger-roofing",
        label: `${prospect.companyName} - Assessment Flow`,
        variantLabel: "Charger variant 1",
        summary: "Storm damage assessment / inspection intake flow",
        prospect,
      },
      {
        href: "/prospects/charger-roofing/storm-response",
        label: `${prospect.companyName} - Storm Response Landing Page`,
        variantLabel: "Charger variant 2",
        summary: "Traditional urgent storm response landing page",
        prospect,
      },
    ];
  });

  return (
    <main className="prospects-index">
      <section>
        <p className="variant-eyebrow">Roofing demo prospects</p>
        <h1>Personalized Demo Pages</h1>
        <p>
          Each demo uses shared page systems with separate prospect data, brand assets,
          copy, photos, and contact details.
        </p>
        <div className="prospects-list">
          {demoLinks.map((demo) => (
            <Link href={demo.href} key={demo.href}>
              {demo.prospect.logoUrl ? (
                <img src={demo.prospect.logoUrl} alt={`${demo.prospect.companyName} logo`} />
              ) : null}
              <span>{demo.variantLabel}</span>
              <strong>{demo.label}</strong>
              <small>{demo.summary}</small>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
