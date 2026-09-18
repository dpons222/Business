import "server-only";
import { NextResponse } from "next/server";
import { getAuthConfig } from "./auth/supabase";
import { DashboardAccessError, assertDashboardAdmin, type DashboardSession } from "./dashboardAuth";

type Handler<Context> = (request: Request, context: Context, session: DashboardSession) => Promise<Response>;

export function privateApi<Context>(handler: Handler<Context>) {
  return async (request: Request, context: Context): Promise<Response> => {
    let response: Response;
    try {
      const session = await assertDashboardAdmin();
      if (!["GET", "HEAD"].includes(request.method) &&
          (request.headers.get("origin") !== getAuthConfig()?.appOrigin ||
           request.headers.get("sec-fetch-site") === "cross-site" ||
           request.headers.get("content-type")?.split(";")[0].trim() !== "application/json")) {
        response = NextResponse.json({ error: "Same-origin JSON request required" }, { status: 403 });
      } else {
        if (!["GET", "HEAD"].includes(request.method) && request.body) {
          const reader = request.body.getReader();
          const chunks: Uint8Array[] = [];
          let size = 0;
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            size += value.byteLength;
            if (size > 16_384) {
              await reader.cancel();
              return NextResponse.json({ error: "Request too large" }, { status: 413, headers: { "Cache-Control": "private, no-store", Vary: "Cookie" } });
            }
            chunks.push(value);
          }
          request = new Request(request, { body: Buffer.concat(chunks) });
        }
        response = await handler(request, context, session);
      }
    } catch (error) {
      const status = error instanceof DashboardAccessError ? error.status : 503;
      response = NextResponse.json({ error: status === 401 ? "Dashboard sign-in required" : "Dashboard access unavailable" }, { status });
    }
    response.headers.set("Cache-Control", "private, no-store, max-age=0");
    response.headers.set("Vary", "Cookie");
    return response;
  };
}
