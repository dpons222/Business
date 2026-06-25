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
            Username or password did not match.
          </p>
        ) : null}
        {hasLoggedOut ? <p className="auth-message">You have been logged out.</p> : null}

        <form className="auth-form" action={loginAction}>
          <input type="hidden" name="next" value={nextPath} />
          <label>
            Username
            <input
              autoComplete="username"
              autoFocus
              name="username"
              placeholder="Enter username"
              required
              type="text"
            />
          </label>
          <label>
            Password
            <input
              autoComplete="current-password"
              name="password"
              placeholder="Enter password"
              required
              type="password"
            />
          </label>
          <button className="button button-primary full-width" type="submit">
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
}
