import { Skeleton } from "@/components/ui/skeleton";

export default function LoginLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Skeleton className="h-8 w-32 mx-auto rounded-md" />
          <Skeleton className="h-4 w-48 mx-auto rounded-md" />
        </div>

        <div className="space-y-4 border rounded-lg p-6">
          <div>
            <Skeleton className="h-4 w-20 mb-2 rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          <div>
            <Skeleton className="h-4 w-20 mb-2 rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="flex-1 h-px" />
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="flex-1 h-px" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-4 w-40 mx-auto rounded-md" />
        </div>
      </div>
    </div>
  );
}
