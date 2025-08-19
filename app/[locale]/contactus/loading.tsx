import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Hero Section Skeleton */}
      <div className="relative bg-background border-b border-border">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Skeleton className="w-20 h-20 rounded-full" />
            </div>
            <Skeleton className="h-16 w-3/4 mx-auto mb-6" />
            <Skeleton className="h-8 w-2/3 mx-auto mb-8" />
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-8 w-32" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
          {/* Form Section Skeleton */}
          <div className="order-2 lg:order-1">
            <Card className="border-0 shadow-xl bg-card">
              <CardContent className="p-8">
                <div className="mb-8">
                  <Skeleton className="h-8 w-64 mb-2" />
                  <Skeleton className="h-6 w-96" />
                </div>

                {/* WhatsApp Section */}
                <div className="mb-8">
                  <Skeleton className="h-32 w-full rounded-xl" />
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  {/* Name and Mobile */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-12 w-full" />
                      </div>
                    ))}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-12 w-full" />
                  </div>

                  {/* Service Type */}
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-12 w-full" />
                  </div>

                  {/* Project Description */}
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-32 w-full" />
                  </div>

                  {/* Budget */}
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-12 w-full" />
                  </div>

                  {/* Timeline */}
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-12 w-full" />
                  </div>

                  {/* Additional Message */}
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-24 w-full" />
                  </div>

                  {/* Submit Button */}
                  <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-4 w-64 mx-auto" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Section Skeleton */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-8">
              <div className="mb-8">
                <Skeleton className="h-8 w-64 mb-4" />
                <Skeleton className="h-6 w-full" />
              </div>

              {/* Benefits List */}
              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start gap-4 p-6 bg-muted/50 rounded-xl">
                    <Skeleton className="w-11 h-11 rounded-lg" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-32 mb-1" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Contact */}
              <div className="mt-8">
                <Skeleton className="h-32 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 