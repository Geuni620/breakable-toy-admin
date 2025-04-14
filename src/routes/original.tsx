import { createFileRoute } from "@tanstack/react-router";
import { DataTable } from "@/components/data-table";
import { columns, payments } from "@/components/service/columns";

export const Route = createFileRoute("/original")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="p-4">
      <DataTable columns={columns} data={payments} />
    </section>
  );
}
