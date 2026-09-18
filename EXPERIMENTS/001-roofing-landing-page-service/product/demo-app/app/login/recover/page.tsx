import { recoverPasswordAction } from "../actions";

export const metadata = { title: "Operator recovery", robots: { index: false, follow: false } };

export default async function RecoveryPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return <main className="preview-gate auth-page">
    <section className="preview-gate-panel auth-panel" aria-labelledby="recovery-title">
      <h1 id="recovery-title">Set your password</h1>
      <p>Use the one-time recovery code prepared by the workspace owner. Choose a password of at least 14 characters.</p>
      {error ? <p className="auth-message auth-message-error" role="alert">Recovery failed. Check the code and matching passwords, or request a new code. After repeated attempts, wait five minutes.</p> : null}
      <form className="auth-form" action={recoverPasswordAction}>
        <label>Recovery code<input name="code" type="password" autoComplete="off" required maxLength={128} /></label>
        <label>New password<input name="password" type="password" autoComplete="new-password" required minLength={14} maxLength={128} /></label>
        <label>Confirm password<input name="confirmation" type="password" autoComplete="new-password" required minLength={14} maxLength={128} /></label>
        <button className="button button-primary full-width" type="submit">Save password</button>
      </form>
      <p><a href="/login">Back to sign in</a></p>
    </section>
  </main>;
}
