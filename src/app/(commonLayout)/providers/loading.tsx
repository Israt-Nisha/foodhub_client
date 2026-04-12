import { Skeleton } from "@/components/ui/skeleton";

export default function ProvidersLoading() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <Skeleton className="h-9 w-40 rounded-md" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-card rounded-2xl border border-border p-4 sm:p-5 space-y-4"
          >
            {/* Logo skeleton */}
            <div className="flex justify-center">
              <Skeleton className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full" />
            </div>

            {/* Title skeleton */}
            <Skeleton className="h-5 w-3/4 mx-auto rounded-md" />

            {/* Address skeleton */}
            <div className="space-y-1">
              <Skeleton className="h-3 w-full rounded-md" />
              <Skeleton className="h-3 w-5/6 mx-auto rounded-md" />
            </div>

            {/* Description skeleton */}
            <div className="space-y-1">
              <Skeleton className="h-3 w-full rounded-md" />
              <Skeleton className="h-3 w-4/5 mx-auto rounded-md" />
            </div>

            {/* Button skeleton */}
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
