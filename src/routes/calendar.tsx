import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/calendar")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-gray-200 w-full h-full flex items-center justify-center gap-4 flex-col">
      <h3 className="text-gray-600 text-2xl font-bold">Hello "/calendar"!</h3>
      <Outlet />
    </div>
  );
}
