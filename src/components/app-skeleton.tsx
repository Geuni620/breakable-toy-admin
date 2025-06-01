import { Skeleton } from "@/components/ui/skeleton";

export const AppSkeleton = () => {
  const numColumns = 3;
  const numRows = 5;

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-8">
      <Skeleton className="h-8 w-1/3 mb-2 rounded" />
      <Skeleton className="h-4 w-1/2 mb-6 rounded" />
      <div className="rounded-md border">
        <div className="bg-muted/50 p-3">
          <div className="flex space-x-3">
            {Array.from({ length: numColumns }).map((_, colIndex) => (
              <Skeleton
                key={`header-${colIndex}`}
                className="h-5 flex-1 rounded"
              />
            ))}
          </div>
        </div>
        <div className="divide-y divide-border">
          {Array.from({ length: numRows }).map((_, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="flex space-x-3 p-3 items-center"
            >
              {Array.from({ length: numColumns }).map((_, colIndex) => (
                <Skeleton
                  key={`cell-${rowIndex}-${colIndex}`}
                  className="h-4 flex-1 rounded"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
// ... existing code ...
