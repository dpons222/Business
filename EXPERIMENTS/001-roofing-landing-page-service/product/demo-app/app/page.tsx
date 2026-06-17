export const metadata = {
  title: "Preview Link Required",
  description: "Use the direct preview link you were provided.",
};

export default function Home() {
  return (
    <main className="preview-gate">
      <section className="preview-gate-panel" aria-labelledby="preview-gate-title">
        <p className="eyebrow">Roof Check Preview</p>
        <h1 id="preview-gate-title">Preview link required</h1>
        <p>Use the direct preview link you were provided.</p>
      </section>
    </main>
  );
}
