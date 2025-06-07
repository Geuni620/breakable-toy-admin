import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { AppSkeleton } from "@/components/app-skeleton";
import { paymentService } from "@/service/payment";
import { ErrorBoundary } from "@/app/error-boundary";
import { Button } from "@/components/ui/Button";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  pendingComponent: () => <AppSkeleton />,
  loader: async () => {
    const data = await paymentService.getPayments();
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

function UserDataDisplay({ userId }: { userId: string }) {
  if (userId === "error-user") {
    throw new Error(`💥 사용자 ID '${userId}'에서 에러 발생!`);
  }

  return (
    <div className="p-4 border rounded bg-green-50">
      <h3 className="font-bold">사용자 데이터</h3>
      <p>현재 사용자 ID: {userId}</p>
      <p>✅ 정상적으로 로드된 데이터</p>
    </div>
  );
}

function RouteComponent() {
  const data = Route.useLoaderData();
  const [currentUserId, setCurrentUserId] = useState("user1");

  return (
    <div className="p-4">
      <div className="mb-4 p-4 border rounded bg-gray-50">
        <h3 className="font-bold mb-2">👤 사용자 전환</h3>
        <div className="space-x-2 mb-2">
          <Button
            className="cursor-pointer"
            onClick={() => setCurrentUserId("user1")}
          >
            User 1 (정상)
          </Button>
          <Button
            className="cursor-pointer"
            onClick={() => setCurrentUserId("user2")}
          >
            User 2 (정상)
          </Button>
          <Button
            className="cursor-pointer"
            onClick={() => setCurrentUserId("error-user")}
          >
            Error User (에러 발생)
          </Button>
        </div>
        <p className="text-sm">현재 선택: {currentUserId}</p>
      </div>

      {/* ErrorBoundary (아직 resetKeys 없음) */}
      <ErrorBoundary
        renderFallback={(error, reset) => (
          <div className="p-4 border-2 border-red-300 rounded bg-red-50">
            <h2 className="font-bold text-red-700">💥 에러 발생!</h2>
            <p className="text-red-600">{error.message}</p>
            <p className="text-sm text-gray-600 mt-2">
              🤔 문제: 다른 사용자로 전환해도 에러 화면이 계속 보입니다!
            </p>
            <Button
              onClick={reset}
              className="bg-red-500 text-white cursor-pointer"
            >
              수동으로 리셋 (불편함)
            </Button>
          </div>
        )}
      >
        <UserDataDisplay userId={currentUserId} />
        <div className="mt-4">
          <DataTable data={data.data} columns={columns} />
        </div>
      </ErrorBoundary>
    </div>
  );
}
