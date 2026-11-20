
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: "convex",
          environment: "edge-runtime",
          include: ["convex/**/*.{test,spec}.{ts,tsx}"],
        },
      },
      {
        test: {
          name: "frontend",
          environment: "jsdom",
          include: ["src/**/*.{test,spec}.{ts,tsx}"],
          setupFiles: [],
        },
      },
    ],
  },
});
