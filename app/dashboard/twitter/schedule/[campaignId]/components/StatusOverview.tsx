import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TwitterPost, Pagination } from '../types';

interface StatusOverviewProps {
  posts: TwitterPost[];
  pagination: Pagination;
}

export function StatusOverview({ posts, pagination }: StatusOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Campaign Status Overview</CardTitle>
        <CardDescription>Real-time statistics for this campaign</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {posts.filter(p => p.status === 'POSTED').length}
            </div>
            <div className="text-sm text-green-600 dark:text-green-400 font-medium">Posted</div>
            <div className="text-xs text-muted-foreground mt-1">
              {pagination.total > 0 ? Math.round((posts.filter(p => p.status === 'POSTED').length / pagination.total) * 100) : 0}% of total
            </div>
          </div>

          <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {posts.filter(p => p.status === 'APPROVED').length}
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">Approved</div>
            <div className="text-xs text-muted-foreground mt-1">
              {pagination.total > 0 ? Math.round((posts.filter(p => p.status === 'APPROVED').length / pagination.total) * 100) : 0}% of total
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 dark:bg-gray-950/20 rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
              {posts.filter(p => p.status === 'DRAFT').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Draft</div>
            <div className="text-xs text-muted-foreground mt-1">
              {pagination.total > 0 ? Math.round((posts.filter(p => p.status === 'DRAFT').length / pagination.total) * 100) : 0}% of total
            </div>
          </div>

          <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {posts.filter(p => p.status === 'FAILED').length}
            </div>
            <div className="text-sm text-red-600 dark:text-red-400 font-medium">Failed</div>
            <div className="text-xs text-muted-foreground mt-1">
              {pagination.total > 0 ? Math.round((posts.filter(p => p.status === 'FAILED').length / pagination.total) * 100) : 0}% of total
            </div>
          </div>

          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {posts.filter(p => !['POSTED', 'APPROVED', 'DRAFT', 'FAILED'].includes(p.status)).length}
            </div>
            <div className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">Other</div>
            <div className="text-xs text-muted-foreground mt-1">
              {pagination.total > 0 ? Math.round((posts.filter(p => !['POSTED', 'APPROVED', 'DRAFT', 'FAILED'].includes(p.status)).length / pagination.total) * 100) : 0}% of total
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Campaign Progress</span>
            <span className="font-medium">
              {posts.filter(p => p.status === 'POSTED').length} / {pagination.total} posts sent
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: pagination.total > 0 ? `${(posts.filter(p => p.status === 'POSTED').length / pagination.total) * 100}%` : '0%'
              }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
