import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section Skeleton */}
        <div className="text-center space-y-6 mb-12">
          <Skeleton className="w-32 h-8 mx-auto rounded-full" />
          <Skeleton className="w-96 h-12 mx-auto" />
          <Skeleton className="w-2/3 h-6 mx-auto" />
        </div>

        {/* Portfolio Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="relative overflow-hidden rounded-xl border-0 shadow-lg bg-card/50 backdrop-blur-sm">
              {/* Image Container Skeleton */}
              <div className="relative h-48 overflow-hidden">
                <Skeleton className="absolute inset-0" />

                {/* Badge Skeleton */}
                <div className="absolute top-3 left-3">
                  <Skeleton className="w-16 h-6 rounded-full" />
                </div>
              </div>

              {/* Content Skeleton */}
              <div className="p-4 space-y-4">
                <Skeleton className="w-3/4 h-6" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-10 rounded-lg" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 