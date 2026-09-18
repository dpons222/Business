import { getDashboardSession, normalizeDashboardNextPath } from "@/lib/dashboardAuth";
import { redirect } from "next/navigation";
import { loginAction } from "./actions";

export const metadata = {
  title: "Dashboard Login | local-growth-preview",
  description: "Sign in to the internal local-growth-preview dashboard.",
};

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    loggedOut?: string;
    recovered?: string;
    next?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextPath = normalizeDashboardNextPath(params.next);
  const session = await getDashboardSession();

  if (session) {
    redirect(nextPath);
  }

  const hasInvalidLogin = params.error === "invalid";
  const hasLoggedOut = params.loggedOut === "1";

  return (
    <main className="preview-gate auth-page">
      <section className="preview-gate-panel auth-panel" aria-labelledby="login-title">
        <p className="eyebrow">local-growth-preview</p>
        <h1 id="login-title">Dashboard login</h1>
        <p>Sign in to review internal prospect demos, current focus, and niche filters.</p>

        {hasInvalidLogin ? (
          <p className="auth-message auth-message-error" role="alert">
            Sign-in was unsuccessful. Check your details or wait five minutes before trying again.
          </p>
        ) : null}
        {hasLoggedOut ? <p className="auth-message">You have been logged out.</p> : null}
        {params.recovered === "1" ? <p className="auth-message">Password updated. Sign in with your new password.</p> : null}

        <form className="auth-form" action={loginAction}>
          <input type="hidden" name="next" value={nextPath} />
          <label>
            Email
            <input
              autoComplete="username"
              autoFocus
              name="email"
              placeholder="Enter your operator email"
              maxLength={254}
              required
              type="email"
            />
          </label>
          <label>
            Password
            <input
              autoComplete="current-password"
              name="password"
              maxLength={1024}
              placeholder="Enter password"
              required
              type="password"
            />
          </label>
          <button className="button button-primary full-width" type="submit">
            Sign in
          </button>
        </form>
        <p><a href="/login/recover">Set or recover your password</a></p>
      </section>
    </main>
  );
}
