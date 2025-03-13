import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Layout } from "../layout";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
      <TanStackRouterDevtools />
    </Layout>
  ),
});
