import { Skeleton } from "@/components/ui/skeleton";

export default function PrivacyLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-48 mx-auto" />
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-4 w-full mb-3" />
            <Skeleton className="h-4 w-full mb-3" />
            <Skeleton className="h-4 w-3/4" />
          </section>

          {/* Information We Collect */}
          <section>
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-6 w-40 mb-3" />
            <Skeleton className="h-4 w-full mb-3" />
            <div className="space-y-2 ml-6">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </section>

          {/* How We Use */}
          <section>
            <Skeleton className="h-8 w-56 mb-4" />
            <Skeleton className="h-4 w-full mb-3" />
            <div className="space-y-2 ml-6">
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-4 w-full mb-3" />
            <div className="space-y-3 ml-6">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-4 w-full mb-3" />
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-56" />
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
      </div>
    </div>
  );
} 