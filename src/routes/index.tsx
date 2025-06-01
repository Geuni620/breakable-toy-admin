import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold">Home</h1>
    </div>
  );
}
