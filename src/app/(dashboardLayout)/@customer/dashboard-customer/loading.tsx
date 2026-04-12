import { Skeleton } from "@/components/ui/skeleton";

export default function CustomerDashboardLoading() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <Skeleton className="h-9 w-48 rounded-md" />
      
      {/* Profile skeleton */}
      <div className="bg-card border border-border rounded-3xl p-8 flex flex-col gap-6 max-w-md mx-auto">
        <Skeleton className="w-32 h-32 rounded-full mx-auto" />
        <Skeleton className="h-8 w-3/4 mx-auto rounded-md" />
        <Skeleton className="h-4 w-1/2 mx-auto rounded-md" />
        <div className="space-y-3 py-4">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
        </div>
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Orders skeleton */}
      <div className="max-w-2xl mx-auto space-y-4">
        <Skeleton className="h-6 w-40 rounded-md" />
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
