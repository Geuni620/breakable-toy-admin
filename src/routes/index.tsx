import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: function Index() {
    return (
      <div className="bg-gray-100 w-full h-full flex items-center justify-center">
        <h3 className="text-gray-900 text-2xl font-bold">Welcome Home!</h3>
      </div>
    );
  },
});
