import { Skeleton } from "@/components/ui/skeleton";

export default function ProviderDetailsLoading() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-10">
      {/* PROVIDER HEADER */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        {/* LOGO skeleton */}
        <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-full flex-shrink-0" />

        {/* INFO skeleton */}
        <div className="text-center md:text-left space-y-3 flex-1 w-full">
          <Skeleton className="h-9 w-3/4 rounded-md" />
          <Skeleton className="h-5 w-2/3 rounded-md" />
          <Skeleton className="h-5 w-1/2 rounded-md" />
          <Skeleton className="h-4 w-1/3 rounded-md" />
        </div>
      </div>

      {/* MEALS HEADER skeleton */}
      <div>
        <Skeleton className="h-8 w-40 mb-6 rounded-md" />
        
        {/* Meals grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-4 flex flex-col">
              <Skeleton className="w-full h-40 mb-3 rounded-md" />
              <Skeleton className="w-3/4 h-6 mb-2 rounded-md" />
              <Skeleton className="w-full h-4 mb-2 rounded-md" />
              <Skeleton className="w-1/2 h-5 mb-4 rounded-md" />
              <Skeleton className="w-full h-10 mt-auto rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
