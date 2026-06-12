import Link from "next/link";
import { designVariants } from "../../lib/designVariants";

export default function VariantsIndexPage() {
  return (
    <main className="variants-index">
      <section>
        <p className="variant-eyebrow">Final Cut Roofing</p>
        <h1>Roof Inspection Page Options</h1>
        <p>
          Four homeowner-facing page options for free storm damage and roof inspection requests.
        </p>
        <div className="variants-list">
          {designVariants.map((variant) => (
            <Link href={`/variants/${variant.id}`} key={variant.id}>
              <span>{variant.name}</span>
              <strong>{variant.summary}</strong>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
