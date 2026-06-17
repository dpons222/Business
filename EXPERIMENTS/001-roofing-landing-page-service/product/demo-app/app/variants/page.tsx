import Link from "next/link";
import { designTemplateGroups } from "../../lib/designVariants";

export default function VariantsIndexPage() {
  return (
    <main className="variants-index">
      <section>
        <p className="variant-eyebrow">Final Cut Roofing</p>
        <h1>Template Variants</h1>
        <p>
          Internal comparison set: three page templates with two visual variants each. Pick
          one best-fit direction per prospect and send only that demo link.
        </p>
        {designTemplateGroups.map((group) => (
          <div className="variant-template-group" key={group.id}>
            <h2>{group.name}</h2>
            <div className="variants-list">
              {group.variants.map((variant) => (
                <Link href={`/variants/${variant.id}`} key={variant.id}>
                  <span>{variant.name}</span>
                  <strong>{variant.summary}</strong>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
