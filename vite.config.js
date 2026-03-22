import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  plugins: [react()],
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
});
