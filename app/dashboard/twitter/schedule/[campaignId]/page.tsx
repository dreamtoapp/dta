"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, Check, X, Send, Eye, EyeOff, ArrowLeft, Trash, Lock, EyeIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TwitterPost {
  id: string;
  day: number;
  slot: 'AM' | 'PM';
  ksaTimeLabel: string;
  targetAudience: string;
  content: string;
  mediaUrls: string[];
  mediaAlt?: string;
  useOgFallback: boolean;
  scheduledAtKsa: string;
  status: 'DRAFT' | 'APPROVED' | 'POSTED' | 'FAILED';
  postedAt?: string;
  tweetId?: string;
  error?: string;
  source: string;
  cycle: number;
  campaign: {
    id: string;
    name: string;
    startDate: string;
    status: string;
  };
}

interface TwitterCampaign {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  totalDays: number;
  amTime: string;
  pmTime: string;
  ogImageUrl?: string;
  status: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function CampaignPostsPage() {
  const router = useRouter();
  const params = useParams();
  const campaignId = params.campaignId as string;

  const [posts, setPosts] = useState<TwitterPost[]>([]);
  const [campaign, setCampaign] = useState<TwitterCampaign | null>(null);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, pages: 0 });
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<TwitterPost>>({});
  const [filters, setFilters] = useState({
    status: 'ALL',
    search: '',
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<TwitterPost | null>(null);
  const [postingPost, setPostingPost] = useState<string | null>(null);
  const [viewingPost, setViewingPost] = useState<TwitterPost | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isWarningDialogOpen, setIsWarningDialogOpen] = useState(false);
  const [pendingPost, setPendingPost] = useState<TwitterPost | null>(null);
  const [warningMessages, setWarningMessages] = useState<string[]>([]);

  // Load campaign details
  const loadCampaign = async () => {
    try {
      const response = await fetch('/api/twitter/campaigns');
      const data = await response.json();

      if (data.success) {
        const foundCampaign = data.data.find((c: TwitterCampaign) => c.id === campaignId);
        if (foundCampaign) {
          setCampaign(foundCampaign);
        } else {
          toast.error('Campaign not found');
          router.push('/dashboard/twitter/schedule');
        }
      } else {
        toast.error(`Failed to load campaign: ${data.error}`);
      }
    } catch (error) {
      toast.error('Failed to load campaign');
      console.error(error);
    }
  };

  // Load posts
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
      } else {
        toast.error(`Failed to load posts: ${data.error}`);
      }
    } catch (error) {
      toast.error('Failed to load posts');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampaign();
  }, [campaignId]);

  useEffect(() => {
    if (campaignId) {
      loadPosts();
    }
  }, [filters, campaignId]);

  // Update post
  const updatePost = async (id: string, data: Partial<TwitterPost>) => {
    try {
      const response = await fetch('/api/twitter/posts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...data }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Post updated successfully');
        setEditingPost(null);
        setEditData({});
        loadPosts(pagination.page);
      } else {
        toast.error(`Failed to update post: ${result.error}`);
      }
    } catch (error) {
      toast.error('Failed to update post');
      console.error(error);
    }
  };

  // Post now
  const postNow = async (slot: 'am' | 'pm', dryRun = false) => {
    try {
      const response = await fetch('/api/twitter/post-now', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slot, dryRun }),
      });

      const result = await response.json();

      if (result.success) {
        if (dryRun) {
          toast.success(`Dry run successful - would post: Day ${result.data.post.day} ${result.data.post.slot}`);
        } else {
          toast.success(`Tweet posted! ID: ${result.data.tweetId}`);
          loadPosts(pagination.page);
        }
      } else {
        toast.error(`Failed to post: ${result.error}`);
      }
    } catch (error) {
      toast.error('Failed to post tweet');
      console.error(error);
    }
  };

  // Start editing
  const startEdit = (post: TwitterPost) => {
    if (post.status === 'POSTED') {
      toast.error('Cannot edit posted tweets');
      return;
    }

    setEditingPost(post.id);
    setEditData({
      content: post.content,
      status: post.status,
      mediaUrls: post.mediaUrls,
      mediaAlt: post.mediaAlt,
      useOgFallback: post.useOgFallback,
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingPost(null);
    setEditData({});
  };

  // Save edit
  const saveEdit = () => {
    if (editingPost) {
      updatePost(editingPost, editData);
    }
  };

  // Delete post
  const handleDeletePost = async () => {
    if (!postToDelete) return;

    try {
      const response = await fetch(`/api/twitter/posts?id=${postToDelete.id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Post deleted successfully');
        setIsDeleteDialogOpen(false);
        setPostToDelete(null);
        loadPosts(pagination.page);
      } else {
        toast.error(`Failed to delete post: ${result.error}`);
      }
    } catch (error) {
      toast.error('Failed to delete post');
      console.error(error);
    }
  };

  // Start delete process
  const startDeletePost = (post: TwitterPost) => {
    setPostToDelete(post);
    setIsDeleteDialogOpen(true);
  };

  // View post details
  const viewPost = (post: TwitterPost) => {
    setViewingPost(post);
    setIsViewDialogOpen(true);
  };

  // Send post now
  const sendPostNow = async (post: TwitterPost) => {
    if (post.status === 'POSTED') {
      toast.error('This post has already been sent');
      return;
    }

    // Validation checks before sending
    const warnings = [];
    const errors = [];

    // Check content
    if (!post.content || post.content.trim().length === 0) {
      errors.push('Post content is empty');
    } else if (post.content.length > 280) {
      errors.push(`Post content is too long (${post.content.length}/280 characters)`);
    }

    // Check for images
    const hasImages = post.mediaUrls && post.mediaUrls.length > 0;
    const hasOgFallback = post.useOgFallback;
    const hasCampaignOg = campaign?.ogImageUrl;

    if (!hasImages && !hasOgFallback) {
      warnings.push('No images attached and OG fallback is disabled');
    } else if (!hasImages && hasOgFallback && !hasCampaignOg) {
      warnings.push('No images attached and no campaign OG image available for fallback');
    }

    // Check media URLs validity
    if (hasImages) {
      for (let i = 0; i < post.mediaUrls.length; i++) {
        const url = post.mediaUrls[i];
        if (!url || url.trim().length === 0) {
          warnings.push(`Media URL ${i + 1} is empty`);
        } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
          warnings.push(`Media URL ${i + 1} is not a valid URL`);
        }
      }
    }

    // Check target audience
    if (!post.targetAudience || post.targetAudience.trim().length === 0) {
      warnings.push('Target audience is not specified');
    }

    // Show errors (blocking)
    if (errors.length > 0) {
      toast.error(`Cannot send post: ${errors.join(', ')}`);
      return;
    }

    // Show warnings (non-blocking, but ask for confirmation)
    if (warnings.length > 0) {
      setPendingPost(post);
      setWarningMessages(warnings);
      setIsWarningDialogOpen(true);
      return;
    }

    // Proceed with sending
    proceedWithSending(post);
  };

  // Proceed with sending the post (called after warning confirmation or when no warnings)
  const proceedWithSending = async (post: TwitterPost) => {
    setPostingPost(post.id);
    try {
      // Prepare media URLs if any
      let imageUrl: string | undefined;
      if (post.mediaUrls && post.mediaUrls.length > 0) {
        imageUrl = post.mediaUrls[0]; // Use first image for now
      } else if (post.useOgFallback && campaign?.ogImageUrl) {
        imageUrl = campaign.ogImageUrl;
      }

      const response = await fetch('/api/twitter/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: post.content,
          imageUrl: imageUrl,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Update post status to POSTED
        await updatePost(post.id, { status: 'POSTED' });
        toast.success('🎉 Post sent successfully!');
        loadPosts(pagination.page); // Refresh to show updated status
      } else {
        // Update post status to FAILED
        await updatePost(post.id, { status: 'FAILED', error: result.error });
        toast.error(`Failed to send post: ${result.error}`);
        loadPosts(pagination.page); // Refresh to show updated status
      }
    } catch (error) {
      // Update post status to FAILED
      await updatePost(post.id, { status: 'FAILED', error: 'Network error' });
      toast.error('Failed to send post');
      console.error(error);
      loadPosts(pagination.page); // Refresh to show updated status
    } finally {
      setPostingPost(null);
    }
  };

  // Handle warning dialog confirmation
  const handleWarningConfirm = () => {
    if (pendingPost) {
      setIsWarningDialogOpen(false);
      proceedWithSending(pendingPost);
      setPendingPost(null);
      setWarningMessages([]);
    }
  };

  // Handle warning dialog cancellation
  const handleWarningCancel = () => {
    setIsWarningDialogOpen(false);
    setPendingPost(null);
    setWarningMessages([]);
  };

  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <Badge variant="default" className="bg-green-500">Approved</Badge>;
      case 'POSTED':
        return <Badge variant="default" className="bg-blue-500">Posted</Badge>;
      case 'FAILED':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">Draft</Badge>;
    }
  };

  // Check if post has warnings
  const getPostWarnings = (post: TwitterPost) => {
    const warnings = [];

    // Check content
    if (!post.content || post.content.trim().length === 0) {
      warnings.push('Empty content');
    } else if (post.content.length > 280) {
      warnings.push('Content too long');
    }

    // Check for images
    const hasImages = post.mediaUrls && post.mediaUrls.length > 0;
    const hasOgFallback = post.useOgFallback;
    const hasCampaignOg = campaign?.ogImageUrl;

    if (!hasImages && !hasOgFallback) {
      warnings.push('No images');
    } else if (!hasImages && hasOgFallback && !hasCampaignOg) {
      warnings.push('No OG fallback');
    }

    // Check target audience
    if (!post.targetAudience || post.targetAudience.trim().length === 0) {
      warnings.push('No target audience');
    }

    return warnings;
  };

  if (!campaign) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/dashboard/twitter/schedule')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Campaigns
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{campaign.name}</h1>
            <p className="text-muted-foreground">
              Manage posts for this campaign
            </p>
          </div>
        </div>
      </div>

      {/* Campaign Info */}
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

      {/* Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Campaign Status Overview</CardTitle>
          <CardDescription>Real-time statistics for this campaign</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search content or audience..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <div className="w-48">
              <Label htmlFor="status">Status</Label>
              <Select
                value={filters.status}
                onValueChange={(value) => setFilters({ ...filters, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All statuses</SelectItem>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="POSTED">Posted</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Posts</CardTitle>
            <div className="flex items-center gap-4 text-sm flex-wrap">
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
              <div className="border-l pl-4">
                <span className="font-medium">Total: {pagination.total}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                (Showing {posts.length} of {pagination.total})
              </div>
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
                <div
                  key={post.id}
                  className={`border rounded-lg p-4 space-y-3 transition-all duration-200 ${post.status === 'POSTED'
                    ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                    : post.status === 'FAILED'
                      ? 'border-red-500 bg-red-50 dark:bg-red-950/20'
                      : 'border-border'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-medium">
                        Day {post.day} - {post.slot}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {post.ksaTimeLabel}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {post.targetAudience}
                      </div>
                      {getStatusBadge(post.status)}
                      {(() => {
                        const warnings = getPostWarnings(post);
                        if (warnings.length > 0) {
                          return (
                            <Badge variant="destructive" className="text-xs">
                              ⚠️ {warnings.length} warning{warnings.length > 1 ? 's' : ''}
                            </Badge>
                          );
                        }
                        return null;
                      })()}
                    </div>
                    <div className="flex items-center gap-2">
                      {editingPost === post.id ? (
                        <>
                          <Button
                            onClick={saveEdit}
                            size="sm"
                            disabled={!editData.content}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={cancelEdit}
                            size="sm"
                            variant="outline"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          {(() => {
                            const warnings = getPostWarnings(post);
                            const hasWarnings = warnings.length > 0;

                            return (
                              <Button
                                onClick={() => sendPostNow(post)}
                                size="sm"
                                variant={post.status === 'POSTED' ? 'default' : 'default'}
                                disabled={post.status === 'POSTED' || postingPost === post.id}
                                className={`${post.status === 'POSTED'
                                  ? 'bg-green-600 hover:bg-green-700 text-white'
                                  : hasWarnings
                                    ? 'bg-orange-600 hover:bg-orange-700 text-white'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                  }`}
                                title={hasWarnings ? `Warnings: ${warnings.join(', ')}` : ''}
                              >
                                {postingPost === post.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : post.status === 'POSTED' ? (
                                  <Check className="h-4 w-4" />
                                ) : hasWarnings ? (
                                  <X className="h-4 w-4" />
                                ) : (
                                  <Send className="h-4 w-4" />
                                )}
                                <span className="ml-1">
                                  {post.status === 'POSTED'
                                    ? 'Sent'
                                    : postingPost === post.id
                                      ? 'Sending...'
                                      : hasWarnings
                                        ? 'Send (⚠️)'
                                        : 'Send Now'
                                  }
                                </span>
                              </Button>
                            );
                          })()}
                          <Button
                            onClick={() => viewPost(post)}
                            size="sm"
                            variant="outline"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <EyeIcon className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button
                            onClick={() => startEdit(post)}
                            size="sm"
                            variant="outline"
                            disabled={post.status === 'POSTED'}
                            className={post.status === 'POSTED' ? 'opacity-50 cursor-not-allowed' : ''}
                          >
                            {post.status === 'POSTED' ? (
                              <>
                                <Lock className="h-4 w-4 mr-1" />
                                Locked
                              </>
                            ) : (
                              'Edit'
                            )}
                          </Button>
                          <Button
                            onClick={() => startDeletePost(post)}
                            size="sm"
                            variant="outline"
                            className="text-red-500 hover:text-red-700"
                            disabled={post.status === 'POSTED'}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  {editingPost === post.id ? (
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`content-${post.id}`}>Content</Label>
                        <Textarea
                          id={`content-${post.id}`}
                          value={editData.content || ''}
                          onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                          className="min-h-[100px]"
                          placeholder="Tweet content..."
                        />
                        <div className="text-sm text-muted-foreground mt-1">
                          {(editData.content || '').length}/280 characters
                        </div>
                      </div>

                      <div>
                        <Label htmlFor={`media-${post.id}`}>Media URLs (one per line, max 4 images)</Label>
                        <Textarea
                          id={`media-${post.id}`}
                          value={(editData.mediaUrls || []).join('\n')}
                          onChange={(e) => setEditData({
                            ...editData,
                            mediaUrls: e.target.value.split('\n').filter(url => url.trim()).slice(0, 4)
                          })}
                          placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                          className="min-h-[80px]"
                        />
                        <div className="text-sm text-muted-foreground mt-1">
                          {(editData.mediaUrls || []).length}/4 images
                        </div>

                        {/* Image Preview */}
                        {(editData.mediaUrls || []).length > 0 && (
                          <div className="mt-3">
                            <Label className="text-sm font-medium">Preview:</Label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              {(editData.mediaUrls || []).map((url, index) => (
                                <div key={index} className="relative group">
                                  <img
                                    src={url}
                                    alt={`Media ${index + 1}`}
                                    className="w-full h-20 object-cover rounded border"
                                    onError={(e) => {
                                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTAwIDIwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMjAiIGZpbGw9IiNmM2Y0ZjYiLz48dGV4dCB4PSI1MCIgeT0iMTIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzZjNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2UgRXJyb3I8L3RleHQ+PC9zdmc+';
                                    }}
                                  />
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                                    <span className="text-white text-xs">Image {index + 1}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`og-fallback-${post.id}`}
                            checked={editData.useOgFallback ?? true}
                            onCheckedChange={(checked) => setEditData({ ...editData, useOgFallback: checked })}
                          />
                          <Label htmlFor={`og-fallback-${post.id}`}>Use OG image fallback</Label>
                        </div>

                        <Select
                          value={editData.status || 'DRAFT'}
                          onValueChange={(value) => setEditData({ ...editData, status: value as any })}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DRAFT">Draft</SelectItem>
                            <SelectItem value="APPROVED">Approved</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm">{post.content}</p>

                      {/* Media Display */}
                      {post.mediaUrls.length > 0 ? (
                        <div className="mt-3">
                          <div className="text-xs text-muted-foreground mb-2">
                            📷 {post.mediaUrls.length} image(s) attached
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {post.mediaUrls.map((url, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={url}
                                  alt={`Media ${index + 1}`}
                                  className="w-full h-16 object-cover rounded border"
                                  onError={(e) => {
                                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMTAwIDE2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTYiIGZpbGw9IiNmM2Y0ZjYiLz48dGV4dCB4PSI1MCIgeT0iMTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzZjNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2UgRXJyb3I8L3RleHQ+PC9zdmc+';
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : post.useOgFallback ? (
                        <div className="mt-2 text-xs text-blue-600 bg-blue-50 p-2 rounded">
                          📷 Will use OG fallback image (campaign or site default)
                        </div>
                      ) : (
                        <div className="mt-2 text-xs text-muted-foreground">
                          📷 No images attached
                        </div>
                      )}

                      {post.tweetId && (
                        <div className="mt-2 text-sm text-blue-600">
                          Tweet ID: {post.tweetId}
                        </div>
                      )}
                      {post.error && (
                        <div className="mt-2 text-sm text-red-600">
                          Error: {post.error}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {posts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No posts found for this campaign
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
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

      {/* Delete Post Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {postToDelete && (
            <div className="py-4">
              <div className="bg-muted p-3 rounded-lg">
                <div className="text-sm font-medium mb-2">
                  Day {postToDelete.day} - {postToDelete.slot} ({postToDelete.ksaTimeLabel})
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  Target: {postToDelete.targetAudience}
                </div>
                <div className="text-sm">
                  {postToDelete.content.substring(0, 100)}
                  {postToDelete.content.length > 100 && '...'}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeletePost}
            >
              Delete Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Post Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Post Details</DialogTitle>
            <DialogDescription>
              Complete information for this post
            </DialogDescription>
          </DialogHeader>
          {viewingPost && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Day</Label>
                  <div className="text-sm font-medium">{viewingPost.day}</div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Time Slot</Label>
                  <div className="text-sm font-medium">{viewingPost.slot} ({viewingPost.ksaTimeLabel})</div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Cycle</Label>
                  <div className="text-sm font-medium">{viewingPost.cycle}</div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                  <div>{getStatusBadge(viewingPost.status)}</div>
                </div>
              </div>

              {/* Target Audience */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Target Audience</Label>
                <div className="text-sm bg-muted p-3 rounded-lg">{viewingPost.targetAudience}</div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Content</Label>
                <div className="text-sm bg-muted p-3 rounded-lg whitespace-pre-wrap">{viewingPost.content}</div>
                <div className="text-xs text-muted-foreground">
                  {viewingPost.content.length}/280 characters
                </div>
              </div>

              {/* Media */}
              {viewingPost.mediaUrls.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Media ({viewingPost.mediaUrls.length} image{viewingPost.mediaUrls.length > 1 ? 's' : ''})
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {viewingPost.mediaUrls.map((url, index) => (
                      <div key={index} className="space-y-1">
                        <div className="text-xs text-muted-foreground">Image {index + 1}</div>
                        <img
                          src={url}
                          alt={`Media ${index + 1}`}
                          className="w-full h-32 object-cover rounded border"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjMyIiB2aWV3Qm94PSIwIDAgMTAwIDMyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMzIiIGZpbGw9IiNmM2Y0ZjYiLz48dGV4dCB4PSI1MCIgeT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzZjNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2UgRXJyb3I8L3RleHQ+PC9zdmc+';
                          }}
                        />
                        <div className="text-xs text-blue-600 break-all">{url}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* OG Fallback */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Image Settings</Label>
                <div className="text-sm bg-muted p-3 rounded-lg">
                  {viewingPost.useOgFallback ? (
                    <span className="text-blue-600">✓ Will use OG fallback image</span>
                  ) : (
                    <span className="text-muted-foreground">No OG fallback</span>
                  )}
                </div>
              </div>

              {/* Media Alt Text */}
              {viewingPost.mediaAlt && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Alt Text</Label>
                  <div className="text-sm bg-muted p-3 rounded-lg">{viewingPost.mediaAlt}</div>
                </div>
              )}

              {/* Scheduling */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Scheduled Time (KSA)</Label>
                <div className="text-sm bg-muted p-3 rounded-lg">
                  {new Date(viewingPost.scheduledAtKsa).toLocaleString('en-US', {
                    timeZone: 'Asia/Riyadh',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </div>
              </div>

              {/* Posting Info */}
              {viewingPost.status === 'POSTED' && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Posted At</Label>
                  <div className="text-sm bg-green-50 p-3 rounded-lg border border-green-200">
                    {viewingPost.postedAt ? new Date(viewingPost.postedAt).toLocaleString('en-US', {
                      timeZone: 'Asia/Riyadh',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    }) : 'Unknown'}
                  </div>
                  {viewingPost.tweetId && (
                    <>
                      <Label className="text-sm font-medium text-muted-foreground">Tweet ID</Label>
                      <div className="text-sm bg-green-50 p-3 rounded-lg border border-green-200 font-mono">
                        {viewingPost.tweetId}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Error Info */}
              {viewingPost.error && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Error Details</Label>
                  <div className="text-sm bg-red-50 p-3 rounded-lg border border-red-200 text-red-700">
                    {viewingPost.error}
                  </div>
                </div>
              )}

              {/* Source Info */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Source</Label>
                <div className="text-sm bg-muted p-3 rounded-lg">{viewingPost.source}</div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Warning Dialog */}
      <Dialog open={isWarningDialogOpen} onOpenChange={setIsWarningDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <X className="h-5 w-5 text-orange-500" />
              Warning: Post Issues Detected
            </DialogTitle>
            <DialogDescription className="space-y-3">
              <p>The following issues were found with this post:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {warningMessages.map((warning, index) => (
                  <li key={index} className="text-orange-600 font-medium">
                    {warning}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                Do you still want to send this post despite these warnings?
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleWarningCancel}>
              Cancel
            </Button>
            <Button
              onClick={handleWarningConfirm}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Send Anyway
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
