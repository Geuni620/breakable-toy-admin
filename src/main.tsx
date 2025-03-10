import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  Outlet,
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Layout } from "./layout";

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
      <TanStackRouterDevtools />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function Index() {
    return (
      <div className="bg-gray-100 w-full h-full flex items-center justify-center">
        <h3 className="text-white text-2xl font-bold">Welcome Home!</h3>
      </div>
    );
  },
});

const inboxRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/inbox",
  component: function Inbox() {
    return (
      <div className="bg-gray-200 w-full h-full flex items-center justify-center">
        <h3 className="text-white text-2xl font-bold">Welcome Inbox!</h3>
      </div>
    );
  },
});

const calendarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calendar",
  component: function Calendar() {
    return (
      <div className="bg-gray-300 w-full h-full flex items-center justify-center">
        <h3 className="text-white text-2xl font-bold">Welcome Calendar!</h3>
      </div>
    );
  },
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: function Search() {
    return (
      <div className="bg-gray-400 w-full h-full flex items-center justify-center">
        <h3 className="text-white text-2xl font-bold">Welcome Search!</h3>
      </div>
    );
  },
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: function Settings() {
    return (
      <div className="bg-gray-500 w-full h-full flex items-center justify-center">
        <h3 className="text-white text-2xl font-bold">Welcome Settings!</h3>
      </div>
    );
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  inboxRoute,
  calendarRoute,
  searchRoute,
  settingsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
