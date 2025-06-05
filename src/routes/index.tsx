import { createFileRoute } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { AppSkeleton } from "@/components/app-skeleton";
import { ApiResponseSchema, type Payment } from "@/model/payment";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  pendingComponent: () => <AppSkeleton />,
  loader: async () => {
    const res = await fetch("http://localhost:3000/payments");
    const rawData = await res.json();
    const validatedResponse = ApiResponseSchema.parse(rawData);
    return validatedResponse;
  },
});

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <DataTable data={data.data} columns={columns} />
    </div>
  );
}
