import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    // TanStack Start must come before React plugin
    tanstackStart({
      ssr: {
        entry: "./src/entry-server.tsx",
      },
      tsr: {
        routesDirectory: "./src/routes",
        generatedRouteTree: "./src/routeTree.gen.ts",
      },
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
});
