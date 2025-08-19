import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4">
      {/* Hero Section Skeleton */}
      <section className="w-full min-h-screen bg-gradient-to-br from-blue-950 via-amber-900 to-cyan-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-16 w-96 mx-auto" />
            <Skeleton className="h-6 w-80 mx-auto" />
            <div className="flex gap-4 justify-center">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        </div>
      </section>

      {/* Other sections skeleton */}
      <section className="py-4">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </section>
    </div>
  );
} 