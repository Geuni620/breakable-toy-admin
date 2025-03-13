import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/search")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-gray-200 w-full h-full flex items-center justify-center">
      <h3 className="text-gray-600 text-2xl font-bold">Hello "/search"!</h3>
    </div>
  );
}
