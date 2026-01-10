import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

let routerInstance: ReturnType<typeof createTanStackRouter> | undefined;

export function createRouter() {
  if (routerInstance) return routerInstance;

  routerInstance = createTanStackRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true,
  });

  return routerInstance;
}

export function getRouter() {
  if (!routerInstance) {
    return createRouter();
  }
  return routerInstance;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
