import { Badge } from '@/components/ui/badge';
import { TwitterPost, TwitterCampaign } from '../types';

export function getStatusBadge(status: string) {
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
}

export function getPostWarnings(post: TwitterPost, campaign?: TwitterCampaign | null) {
  const warnings = [];

  if (!post.content || post.content.trim().length === 0) {
    warnings.push('Empty content');
  } else if (post.content.length > 280) {
    warnings.push('Content too long');
  }

  const hasImages = post.mediaUrls && post.mediaUrls.length > 0;
  const hasOgFallback = post.useOgFallback;
  const hasCampaignOg = campaign?.ogImageUrl;

  if (!hasImages && !hasOgFallback) {
    warnings.push('No images');
  } else if (!hasImages && hasOgFallback && !hasCampaignOg) {
    warnings.push('No OG fallback');
  }

  if (!post.targetAudience || post.targetAudience.trim().length === 0) {
    warnings.push('No target audience');
  }

  return warnings;
}
