import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL(".", import.meta.url)), "server-only": fileURLToPath(new URL("./tests/server-only.ts", import.meta.url)) } },
  test: {
    environment: "node", include: ["tests/**/*.test.ts"],
    exclude: process.env.SECURITY_INTEGRATION === "1" ? [] : ["tests/integration/**"],
    testTimeout: 30_000, hookTimeout: 60_000,
  },
});
