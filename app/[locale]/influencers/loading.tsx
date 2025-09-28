export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Search and Filters Loading */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
              <div className="space-y-4">
                {/* Search bar skeleton */}
                <div className="h-12 bg-muted/50 rounded-xl animate-pulse"></div>

                {/* Filter controls skeleton */}
                <div className="flex flex-wrap gap-3">
                  <div className="h-10 w-[180px] bg-muted/50 rounded-xl animate-pulse"></div>
                  <div className="h-10 w-[180px] bg-muted/50 rounded-xl animate-pulse"></div>
                  <div className="h-10 w-[200px] bg-muted/50 rounded-xl animate-pulse"></div>
                  <div className="h-10 w-[120px] bg-muted/50 rounded-xl animate-pulse"></div>
                </div>

                {/* Results summary skeleton */}
                <div className="flex items-center justify-between">
                  <div className="h-4 w-32 bg-muted/50 rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-muted/50 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Influencers Grid Loading */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
                {/* Cover image skeleton */}
                <div className="h-32 w-full bg-muted/50 animate-pulse"></div>

                {/* Card content skeleton */}
                <div className="p-6 space-y-4">
                  {/* Avatar and name */}
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-muted/50 rounded-full animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-5 w-24 bg-muted/50 rounded animate-pulse"></div>
                      <div className="h-4 w-32 bg-muted/50 rounded animate-pulse"></div>
                    </div>
                  </div>

                  {/* Category badges */}
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-muted/50 rounded-full animate-pulse"></div>
                    <div className="h-6 w-12 bg-muted/50 rounded-full animate-pulse"></div>
                  </div>

                  {/* Bio skeleton */}
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-muted/50 rounded animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-muted/50 rounded animate-pulse"></div>
                  </div>

                  {/* Platform stats skeleton */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-16 bg-muted/50 rounded-lg animate-pulse"></div>
                    <div className="h-16 bg-muted/50 rounded-lg animate-pulse"></div>
                  </div>

                  {/* Stats row skeleton */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-12 bg-muted/50 rounded-lg animate-pulse"></div>
                    <div className="h-12 bg-muted/50 rounded-lg animate-pulse"></div>
                  </div>

                  {/* CTA button skeleton */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="h-4 w-20 bg-muted/50 rounded animate-pulse"></div>
                    <div className="h-8 w-24 bg-muted/50 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
