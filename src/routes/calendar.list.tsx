import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/calendar/list")({
  component: RouteComponent,
});

const TASKS = [
  { id: "1", title: "Task 1" },
  { id: "2", title: "Task 2" },
  { id: "3", title: "Task 3" },
] as const;

function RouteComponent() {
  return (
    <div className="bg-gray-200 w-full h-full flex items-center justify-center">
      {TASKS.map((t, idx) => (
        <div key={idx}>
          <div>{t.title}</div>
          <Link to="/tasks/$taskId" params={{ taskId: t.id }}>
            View
          </Link>
          <Link to="/tasks/$taskId/edit" params={{ taskId: t.id }}>
            Edit
          </Link>
        </div>
      ))}
    </div>
  );
}
