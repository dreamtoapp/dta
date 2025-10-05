import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Check, X, Send, Trash, Lock, EyeIcon } from 'lucide-react';
import { TwitterPost, TwitterCampaign } from '../types';
import { getStatusBadge, getPostWarnings } from '../helpers/postHelpers';

interface PostCardProps {
  post: TwitterPost;
  campaign: TwitterCampaign | null;
  editingPost: string | null;
  editData: Partial<TwitterPost>;
  postingPost: string | null;
  onEditDataChange: (data: Partial<TwitterPost>) => void;
  onStartEdit: (post: TwitterPost) => void;
  onCancelEdit: () => void;
  onSaveEdit: () => void;
  onSendPostNow: (post: TwitterPost) => void;
  onViewPost: (post: TwitterPost) => void;
  onDeletePost: (post: TwitterPost) => void;
}

export function PostCard({
  post,
  campaign,
  editingPost,
  editData,
  postingPost,
  onEditDataChange,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onSendPostNow,
  onViewPost,
  onDeletePost,
}: PostCardProps) {
  const warnings = getPostWarnings(post, campaign);
  const hasWarnings = warnings.length > 0;

  return (
    <div
      className={`border rounded-lg p-3 sm:p-4 lg:p-5 space-y-3 sm:space-y-4 transition-all duration-200 ${post.status === 'POSTED'
        ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
        : post.status === 'FAILED'
          ? 'border-red-500 bg-red-50 dark:bg-red-950/20'
          : 'border-border'
        }`}
    >
      <div className="flex flex-col space-y-3 sm:space-y-4">
        <div className="flex flex-col gap-2 sm:gap-3">
          {/* <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1.5 sm:gap-2">
            <div className="text-sm sm:text-base font-semibold whitespace-nowrap">
              Day {post.day} - {post.slot}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
              {post.ksaTimeLabel}
            </div>
          </div> */}
          <div className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-1">
            {post.targetAudience}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {getStatusBadge(post.status)}
            {hasWarnings && (
              <Badge variant="destructive" className="text-xs">
                ⚠️ {warnings.length} warning{warnings.length > 1 ? 's' : ''}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
          {editingPost === post.id ? (
            <div className="flex gap-2">
              <Button
                onClick={onSaveEdit}
                size="default"
                disabled={!editData.content}
                className="flex-1 sm:flex-initial min-h-[44px]"
              >
                <Check className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Save</span>
              </Button>
              <Button
                onClick={onCancelEdit}
                size="default"
                variant="outline"
                className="flex-1 sm:flex-initial min-h-[44px]"
              >
                <X className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Cancel</span>
              </Button>
            </div>
          ) : (
            <>
              <Button
                onClick={() => onSendPostNow(post)}
                size="default"
                variant={post.status === 'POSTED' ? 'default' : 'default'}
                disabled={post.status === 'POSTED' || postingPost === post.id}
                className={`w-full sm:w-auto min-h-[44px] ${post.status === 'POSTED'
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
                <span className="ml-2 text-sm sm:text-base">
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
              <div className="grid grid-cols-3 gap-2 w-full sm:w-auto sm:flex">
                <Button
                  onClick={() => onViewPost(post)}
                  size="default"
                  variant="outline"
                  className="text-blue-600 hover:text-blue-700 min-h-[44px]"
                >
                  <EyeIcon className="h-4 w-4" />
                  <span className="ml-1 text-xs sm:text-sm">View</span>
                </Button>
                <Button
                  onClick={() => onStartEdit(post)}
                  size="default"
                  variant="outline"
                  disabled={post.status === 'POSTED'}
                  className={`min-h-[44px] ${post.status === 'POSTED' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {post.status === 'POSTED' ? (
                    <>
                      <Lock className="h-4 w-4" />
                      <span className="ml-1 text-xs sm:text-sm">Lock</span>
                    </>
                  ) : (
                    <span className="text-xs sm:text-sm">Edit</span>
                  )}
                </Button>
                <Button
                  onClick={() => onDeletePost(post)}
                  size="default"
                  variant="outline"
                  className="text-red-500 hover:text-red-700 min-h-[44px]"
                  disabled={post.status === 'POSTED'}
                >
                  <Trash className="h-4 w-4" />
                  <span className="ml-1 text-xs sm:text-sm">Del</span>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {editingPost === post.id ? (
        <div className="space-y-4 sm:space-y-5">
          <div>
            <Label htmlFor={`content-${post.id}`} className="text-sm sm:text-base font-medium">Content</Label>
            <Textarea
              id={`content-${post.id}`}
              value={editData.content || ''}
              onChange={(e) => onEditDataChange({ ...editData, content: e.target.value })}
              className="min-h-[120px] sm:min-h-[100px] mt-2 text-sm sm:text-base"
              placeholder="Tweet content..."
            />
            <div className="text-xs sm:text-sm text-muted-foreground mt-2">
              {(editData.content || '').length}/280 characters
            </div>
          </div>

          <div>
            <Label htmlFor={`media-${post.id}`} className="text-sm sm:text-base font-medium">Media URLs (one per line, max 4 images)</Label>
            <Textarea
              id={`media-${post.id}`}
              value={(editData.mediaUrls || []).join('\n')}
              onChange={(e) => onEditDataChange({
                ...editData,
                mediaUrls: e.target.value.split('\n').filter(url => url.trim()).slice(0, 4)
              })}
              placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
              className="min-h-[100px] sm:min-h-[80px] mt-2 text-sm sm:text-base"
            />
            <div className="text-xs sm:text-sm text-muted-foreground mt-2">
              {(editData.mediaUrls || []).length}/4 images
            </div>

            {(editData.mediaUrls || []).length > 0 && (
              <div className="mt-4">
                <Label className="text-sm font-medium">Preview:</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 mt-2">
                  {(editData.mediaUrls || []).map((url, index) => (
                    <div key={index} className="relative group aspect-video">
                      <img
                        src={url}
                        alt={`Media ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg border"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTAwIDIwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMjAiIGZpbGw9IiNmM2Y0ZjYiLz48dGV4dCB4PSI1MCIgeT0iMTIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzZjNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2UgRXJyb3I8L3RleHQ+PC9zdmc+';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-medium">Image {index + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <Switch
                id={`og-fallback-${post.id}`}
                checked={editData.useOgFallback ?? true}
                onCheckedChange={(checked) => onEditDataChange({ ...editData, useOgFallback: checked })}
              />
              <Label htmlFor={`og-fallback-${post.id}`} className="text-sm sm:text-base cursor-pointer">Use OG image fallback</Label>
            </div>

            <div>
              <Label className="text-sm sm:text-base font-medium mb-2 block">Status</Label>
              <Select
                value={editData.status || 'DRAFT'}
                onValueChange={(value) => onEditDataChange({ ...editData, status: value as any })}
              >
                <SelectTrigger className="min-h-[44px] text-sm sm:text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
            {post.content}
          </p>

          {post.mediaUrls.length > 0 ? (
            <div className="mt-3 sm:mt-4">
              <div className="text-xs sm:text-sm text-muted-foreground mb-2 flex items-center gap-1.5">
                <span className="text-base">📷</span>
                <span>{post.mediaUrls.length} image{post.mediaUrls.length > 1 ? 's' : ''} attached</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                {post.mediaUrls.map((url, index) => (
                  <div key={index} className="relative group aspect-video">
                    <img
                      src={url}
                      alt={`Media ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg border border-border hover:border-primary transition-colors"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMTAwIDE2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTYiIGZpbGw9IiNmM2Y0ZjYiLz48dGV4dCB4PSI1MCIgeT0iMTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzZjNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2UgRXJyb3I8L3RleHQ+PC9zdmc+';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-medium">Image {index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : post.useOgFallback ? (
            <div className="mt-3 text-xs sm:text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg flex items-start gap-2">
              <span className="text-base">📷</span>
              <span>Will use OG fallback image (campaign or site default)</span>
            </div>
          ) : (
            <div className="mt-3 text-xs sm:text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg flex items-center gap-2">
              <span className="text-base">📷</span>
              <span>No images attached</span>
            </div>
          )}

          {post.tweetId && (
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <div className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium">
                Tweet ID: <span className="font-mono">{post.tweetId}</span>
              </div>
            </div>
          )}
          {post.error && (
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="text-xs sm:text-sm text-red-600 dark:text-red-400 font-medium">
                Error: {post.error}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
