"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2, ArrowLeft } from 'lucide-react';

import { TwitterPost, Pagination, PostFilters } from './types';
import { useCampaign } from './helpers/useCampaign';
import { usePostManagement } from './helpers/usePostManagement';
import { StatusOverview } from './components/StatusOverview';
import { PostsFilter } from './components/PostsFilter';
import { PostCard } from './components/PostCard';
import { DeletePostDialog } from './components/DeletePostDialog';
import { ViewPostDialog } from './components/ViewPostDialog';
import { WarningDialog } from './components/WarningDialog';

export default function CampaignPostsPage() {
  const router = useRouter();
  const params = useParams();
  const campaignId = params.campaignId as string;

  const [posts, setPosts] = useState<TwitterPost[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, pages: 0 });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<PostFilters>({
    status: 'ALL',
    search: '',
  });

  const campaign = useCampaign(campaignId);

  const loadPosts = async (page = 1) => {
    if (!campaignId) return;

    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        campaignId: campaignId,
        ...(filters.status && filters.status !== 'ALL' && { status: filters.status }),
        ...(filters.search && { search: filters.search }),
      });

      const response = await fetch(`/api/twitter/posts?${params}`);
      const data = await response.json();

      if (data.success) {
        setPosts(data.data.posts);
        setPagination(data.data.pagination);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (campaignId) {
      loadPosts();
    }
  }, [filters, campaignId]);

  const postManagement = usePostManagement(campaign, () => loadPosts(pagination.page));

  if (!campaign) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/dashboard/twitter/schedule')}
          className="w-fit"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Campaigns
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{campaign.name}</h1>
          <p className="text-muted-foreground">
            Manage posts for this campaign
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Details</CardTitle>
        </CardHeader>
        <CardContent>
          {campaign.description && (
            <div className="mt-4">
              <Label className="text-sm font-medium text-muted-foreground">Description</Label>
              <div className="mt-1 text-sm">{campaign.description}</div>
            </div>
          )}
        </CardContent>
      </Card>

      <StatusOverview posts={posts} pagination={pagination} />

      <PostsFilter filters={filters} onFiltersChange={setFilters} />

      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4">
            <CardTitle>Posts</CardTitle>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-muted-foreground">Posted: {posts.filter(p => p.status === 'POSTED').length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">Approved: {posts.filter(p => p.status === 'APPROVED').length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-muted-foreground">Draft: {posts.filter(p => p.status === 'DRAFT').length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-muted-foreground">Failed: {posts.filter(p => p.status === 'FAILED').length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-muted-foreground">Other: {posts.filter(p => !['POSTED', 'APPROVED', 'DRAFT', 'FAILED'].includes(p.status)).length}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Total: {pagination.total}</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Showing {posts.length} of {pagination.total} posts
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  campaign={campaign}
                  editingPost={postManagement.editingPost}
                  editData={postManagement.editData}
                  postingPost={postManagement.postingPost}
                  onEditDataChange={postManagement.setEditData}
                  onStartEdit={postManagement.startEdit}
                  onCancelEdit={postManagement.cancelEdit}
                  onSaveEdit={postManagement.saveEdit}
                  onSendPostNow={postManagement.sendPostNow}
                  onViewPost={postManagement.viewPost}
                  onDeletePost={postManagement.startDeletePost}
                />
              ))}

              {posts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No posts found for this campaign
                </div>
              )}
            </div>
          )}

          {pagination.pages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadPosts(pagination.page - 1)}
                disabled={pagination.page === 1}
              >
                Previous
              </Button>
              <span className="text-sm">
                Page {pagination.page} of {pagination.pages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadPosts(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <DeletePostDialog
        open={postManagement.isDeleteDialogOpen}
        onOpenChange={postManagement.setIsDeleteDialogOpen}
        post={postManagement.postToDelete}
        onConfirm={postManagement.handleDeletePost}
      />

      <ViewPostDialog
        open={postManagement.isViewDialogOpen}
        onOpenChange={postManagement.setIsViewDialogOpen}
        post={postManagement.viewingPost}
      />

      <WarningDialog
        open={postManagement.isWarningDialogOpen}
        onOpenChange={(open) => !open && postManagement.handleWarningCancel()}
        warnings={postManagement.warningMessages}
        onConfirm={postManagement.handleWarningConfirm}
        onCancel={postManagement.handleWarningCancel}
      />
    </div>
  );
}