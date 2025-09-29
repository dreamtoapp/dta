export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Header Loading */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-64 bg-muted/50 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-48 bg-muted/50 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-20 bg-muted/50 rounded animate-pulse"></div>
          <div className="h-8 w-20 bg-muted/50 rounded animate-pulse"></div>
          <div className="h-8 w-28 bg-muted/50 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Stats Cards Loading */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-muted/50 rounded animate-pulse"></div>
                <div className="h-8 w-16 bg-muted/50 rounded animate-pulse"></div>
                <div className="h-3 w-20 bg-muted/50 rounded animate-pulse"></div>
              </div>
              <div className="h-12 w-12 bg-muted/50 rounded-lg animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Loading */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="h-10 w-full bg-muted/50 rounded animate-pulse"></div>
          </div>
          <div className="w-full sm:w-48">
            <div className="h-10 w-full bg-muted/50 rounded animate-pulse"></div>
          </div>
          <div className="w-full sm:w-48">
            <div className="h-10 w-full bg-muted/50 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Influencers List Loading */}
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-muted/50 rounded-full animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-5 w-32 bg-muted/50 rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-muted/50 rounded animate-pulse"></div>
                  <div className="h-3 w-40 bg-muted/50 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="h-6 w-20 bg-muted/50 rounded-full animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-4 w-4 bg-muted/50 rounded animate-pulse"></div>
                    <div className="h-3 w-20 bg-muted/50 rounded animate-pulse"></div>
                  </div>
                  <div className="h-6 w-16 bg-muted/50 rounded animate-pulse"></div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-4 border-t">
              <div className="h-8 w-24 bg-muted/50 rounded animate-pulse"></div>
              <div className="h-8 w-16 bg-muted/50 rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-muted/50 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


