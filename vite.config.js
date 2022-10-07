import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react({ jsxRuntime: "classic" })],
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
});
