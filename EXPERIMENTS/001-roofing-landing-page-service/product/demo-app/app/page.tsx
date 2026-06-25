import { VercelDashboardRedirect } from "../components/VercelDashboardRedirect";

export const metadata = {
  title: "Preview Link Required",
  description: "Use the direct preview link you were provided.",
};

export default function Home() {
  return (
    <main className="preview-gate">
      <VercelDashboardRedirect />
      <section className="preview-gate-panel" aria-labelledby="preview-gate-title">
        <p className="eyebrow">local-growth-preview</p>
        <h1 id="preview-gate-title">Preview link required</h1>
        <p>Use the direct preview link you were provided.</p>
      </section>
    </main>
  );
}
