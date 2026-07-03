import { logoutAction } from "@/app/login/actions";
import { requireDashboardSession } from "@/lib/dashboardAuth";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireDashboardSession("/dashboard");

  return (
    <div className="dashboard-protected-shell">
      <header className="dashboard-auth-bar">
        <div className="dashboard-auth-identity">
          <span>Signed in</span>
          <strong>{session.username}</strong>
        </div>
        <div className="dashboard-auth-actions">
          <nav className="dashboard-section-nav" aria-label="Dashboard sections">
            <a className="button button-ghost dashboard-nav-button" href="#current-focus">
              Current focus
            </a>
            <a
              className="button button-ghost dashboard-nav-button"
              href="#available-prospect-previews"
            >
              Available prospects
            </a>
          </nav>
          <form action={logoutAction}>
            <button className="button button-ghost" type="submit">
              Log out
            </button>
          </form>
        </div>
      </header>
      {children}
    </div>
  );
}
