import { Skeleton } from "@/components/ui/skeleton";

export default function MealsLoading() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter sidebar skeleton */}
        <div className="lg:w-64 space-y-4">
          <Skeleton className="h-8 w-40 rounded-md" />
          <Skeleton className="h-40 rounded-lg" />
          <Skeleton className="h-40 rounded-lg" />
        </div>

        {/* Meals grid skeleton */}
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4 flex flex-col">
                <Skeleton className="w-full h-40 mb-3 rounded-md" />
                <Skeleton className="w-3/4 h-6 mb-2 rounded-md" />
                <Skeleton className="w-full h-4 mb-2 rounded-md" />
                <Skeleton className="w-1/2 h-5 mb-4 rounded-md" />
                <Skeleton className="w-full h-10 mt-auto rounded-md" />
              </div>
            ))}
          </div>

          {/* Pagination skeleton */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-8 rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
