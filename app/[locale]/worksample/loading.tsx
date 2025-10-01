import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FolderOpen } from "lucide-react";
import { WorkCardSkeleton } from "./component/WorkCard";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        {/* Filters Skeleton - Matches actual Filters component */}
        <div className="mb-6">
          <Card className="border-0 shadow-sm bg-card/50 backdrop-blur-sm">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <FolderOpen className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold text-foreground">Categories</h3>
                <Badge variant="secondary" className="ml-auto text-xs">
                  <Skeleton className="h-3 w-4" />
                </Badge>
              </div>

              {/* Filter buttons skeleton */}
              <div className="flex gap-2 pb-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-9 w-24 rounded-lg" />
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Masonry Grid Skeleton - Matches actual masonry layout */}
        <div className="masonry-grid">
          {Array.from({ length: 12 }).map((_, index) => (
            <WorkCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
} 