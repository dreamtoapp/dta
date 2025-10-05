import { useState } from 'react';
import { toast } from 'sonner';
import { TwitterPost, TwitterCampaign } from '../types';

export function usePostManagement(campaign: TwitterCampaign | null, onRefresh: () => void) {
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<TwitterPost>>({});
  const [postingPost, setPostingPost] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<TwitterPost | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewingPost, setViewingPost] = useState<TwitterPost | null>(null);
  const [isWarningDialogOpen, setIsWarningDialogOpen] = useState(false);
  const [pendingPost, setPendingPost] = useState<TwitterPost | null>(null);
  const [warningMessages, setWarningMessages] = useState<string[]>([]);

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
        onRefresh();
      } else {
        toast.error(`Failed to update post: ${result.error}`);
      }
    } catch (error) {
      toast.error('Failed to update post');
      console.error(error);
    }
  };

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

  const cancelEdit = () => {
    setEditingPost(null);
    setEditData({});
  };

  const saveEdit = () => {
    if (editingPost) {
      updatePost(editingPost, editData);
    }
  };

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
        onRefresh();
      } else {
        toast.error(`Failed to delete post: ${result.error}`);
      }
    } catch (error) {
      toast.error('Failed to delete post');
      console.error(error);
    }
  };

  const startDeletePost = (post: TwitterPost) => {
    setPostToDelete(post);
    setIsDeleteDialogOpen(true);
  };

  const viewPost = (post: TwitterPost) => {
    setViewingPost(post);
    setIsViewDialogOpen(true);
  };

  const proceedWithSending = async (post: TwitterPost) => {
    setPostingPost(post.id);
    try {
      let imageUrl: string | undefined;
      if (post.mediaUrls && post.mediaUrls.length > 0) {
        imageUrl = post.mediaUrls[0];
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
        await updatePost(post.id, { status: 'POSTED' });
        toast.success('🎉 Post sent successfully!');
        onRefresh();
      } else {
        await updatePost(post.id, { status: 'FAILED', error: result.error });
        toast.error(`Failed to send post: ${result.error}`);
        onRefresh();
      }
    } catch (error) {
      await updatePost(post.id, { status: 'FAILED', error: 'Network error' });
      toast.error('Failed to send post');
      console.error(error);
      onRefresh();
    } finally {
      setPostingPost(null);
    }
  };

  const sendPostNow = async (post: TwitterPost) => {
    if (post.status === 'POSTED') {
      toast.error('This post has already been sent');
      return;
    }

    const warnings = [];
    const errors = [];

    if (!post.content || post.content.trim().length === 0) {
      errors.push('Post content is empty');
    } else if (post.content.length > 280) {
      errors.push(`Post content is too long (${post.content.length}/280 characters)`);
    }

    const hasImages = post.mediaUrls && post.mediaUrls.length > 0;
    const hasOgFallback = post.useOgFallback;
    const hasCampaignOg = campaign?.ogImageUrl;

    if (!hasImages && !hasOgFallback) {
      warnings.push('No images attached and OG fallback is disabled');
    } else if (!hasImages && hasOgFallback && !hasCampaignOg) {
      warnings.push('No images attached and no campaign OG image available for fallback');
    }

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

    if (!post.targetAudience || post.targetAudience.trim().length === 0) {
      warnings.push('Target audience is not specified');
    }

    if (errors.length > 0) {
      toast.error(`Cannot send post: ${errors.join(', ')}`);
      return;
    }

    if (warnings.length > 0) {
      setPendingPost(post);
      setWarningMessages(warnings);
      setIsWarningDialogOpen(true);
      return;
    }

    proceedWithSending(post);
  };

  const handleWarningConfirm = () => {
    if (pendingPost) {
      setIsWarningDialogOpen(false);
      proceedWithSending(pendingPost);
      setPendingPost(null);
      setWarningMessages([]);
    }
  };

  const handleWarningCancel = () => {
    setIsWarningDialogOpen(false);
    setPendingPost(null);
    setWarningMessages([]);
  };

  return {
    editingPost,
    editData,
    setEditData,
    postingPost,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    postToDelete,
    isViewDialogOpen,
    setIsViewDialogOpen,
    viewingPost,
    isWarningDialogOpen,
    warningMessages,
    startEdit,
    cancelEdit,
    saveEdit,
    handleDeletePost,
    startDeletePost,
    viewPost,
    sendPostNow,
    handleWarningConfirm,
    handleWarningCancel,
  };
}
