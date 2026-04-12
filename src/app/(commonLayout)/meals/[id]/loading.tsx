import { Skeleton } from "@/components/ui/skeleton";

export default function MealDetailsLoading() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Meal image and details */}
        <div className="flex flex-col px-4 md:px-0 md:flex-row gap-6 md:items-start">
          {/* Image skeleton */}
          <Skeleton className="w-40 h-40 md:w-56 md:h-56 rounded-lg flex-shrink-0" />

          {/* Details skeleton */}
          <div className="flex-1 space-y-3">
            <Skeleton className="w-3/4 h-10 rounded-md" />
            
            {/* Rating skeleton */}
            <div className="flex gap-2 mt-2">
              <Skeleton className="w-24 h-5 rounded-md" />
              <Skeleton className="w-20 h-5 rounded-md" />
            </div>

            {/* Category, Dietary, Cuisine skeleton */}
            <div className="flex flex-row gap-4">
              <Skeleton className="w-32 h-4 rounded-md" />
              <Skeleton className="w-32 h-4 rounded-md" />
            </div>

            {/* Price skeleton */}
            <Skeleton className="w-40 h-6 rounded-md" />

            {/* Description skeleton */}
            <div className="space-y-2 mt-4">
              <Skeleton className="w-full h-4 rounded-md" />
              <Skeleton className="w-5/6 h-4 rounded-md" />
              <Skeleton className="w-4/5 h-4 rounded-md" />
            </div>
          </div>
        </div>

        {/* Right side - Provider information skeleton */}
        <div className="justify-end text-end items-end p-6 md:p-0 space-y-4 h-fit">
          <Skeleton className="h-7 w-1/2 ml-auto rounded-md" />

          {/* Provider details skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-2/3 ml-auto rounded-md" />
            <Skeleton className="h-4 w-4/5 ml-auto rounded-md" />
            <Skeleton className="h-4 w-1/2 ml-auto rounded-md" />
            <Skeleton className="h-4 w-3/5 ml-auto rounded-md" />
          </div>

          {/* Add to Cart button skeleton */}
          <div className="mt-6">
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
