import { createFileRoute, retainSearchParams } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { AppSkeleton } from "@/components/app-skeleton";
import { paymentService } from "@/service/payment";
import { ErrorBoundary } from "@/app/error-boundary";
import { Button } from "@/components/ui/button";
import type { Payment } from "@/model/payment";
import { Input } from "@/components/ui/input";
import { z } from "zod";

const searchSchema = z.object({
  email: z.string().optional().default(""),
});

export const Route = createFileRoute("/")({
  component: RouteComponent,
  pendingComponent: () => <AppSkeleton />,
  validateSearch: zodValidator(searchSchema),
  search: {
    middlewares: [retainSearchParams(["email"])],
  },
  loaderDeps: ({ search }) => ({
    email: search.email,
  }),
  loader: async ({ deps }) => {
    const data = await paymentService.getPayments({ email: deps.email });
    return data;
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
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  return (
    <div className="p-4">
      <ErrorBoundary
        renderFallback={({ error, reset }) => (
          <div className="p-4 border-2 border-red-300 rounded bg-red-50">
            <h2 className="font-bold text-red-700">에러 발생</h2>
            <p>{error.message}</p>
            <Button variant="destructive" className="mt-2" onClick={reset}>
              수동으로 리셋
            </Button>
          </div>
        )}
      >
        <div className="mt-4">
          <Input
            type="text"
            placeholder="Search"
            className="w-3xs"
            value={search.email}
            onChange={(e) =>
              navigate({
                search: (prev) => ({
                  ...prev,
                  email: e.target.value,
                }),
              })
            }
          />
          <DataTable data={data.data} columns={columns} />
        </div>
      </ErrorBoundary>
    </div>
  );
}
