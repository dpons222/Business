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
        <div>
          <span>Signed in</span>
          <strong>{session.username}</strong>
        </div>
        <form action={logoutAction}>
          <button className="button button-ghost" type="submit">
            Log out
          </button>
        </form>
      </header>
      {children}
    </div>
  );
}
