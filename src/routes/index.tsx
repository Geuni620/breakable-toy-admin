import { createFileRoute } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  pendingComponent: () => <div>Loading...</div>,
  loader: async () => {
    const res = await fetch("http://localhost:3000/payments");
    const data = await res.json();
    return data;
  },
});

interface Payment {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
}

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
      <h1 className="text-2xl font-bold">Home</h1>
      <DataTable data={data.data} columns={columns} />
    </div>
  );
}
