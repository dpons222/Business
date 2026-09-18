import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(appDir, "../../../..");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return ["/dashboard/:path*", "/login/:path*", "/prospects", "/variants"].map((source) => ({
      source,
      headers: [
        { key: "Referrer-Policy", value: "no-referrer" },
        { key: "X-Robots-Tag", value: "noindex, nofollow" },
        { key: "Content-Security-Policy", value: source.startsWith("/dashboard") ? "frame-ancestors 'self'" : "frame-ancestors 'none'" },
      ],
    }));
  },
  turbopack: {
    root: repoRoot,
  },
};

export default nextConfig;
