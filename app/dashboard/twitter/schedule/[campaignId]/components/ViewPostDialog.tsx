import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TwitterPost } from '../types';
import { getStatusBadge } from '../helpers/postHelpers';

interface ViewPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: TwitterPost | null;
}

export function ViewPostDialog({ open, onOpenChange, post }: ViewPostDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Post Details</DialogTitle>
          <DialogDescription>
            Complete information for this post
          </DialogDescription>
        </DialogHeader>
        {post && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Day</Label>
                <div className="text-sm font-medium">{post.day}</div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Time Slot</Label>
                <div className="text-sm font-medium">{post.slot} ({post.ksaTimeLabel})</div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Cycle</Label>
                <div className="text-sm font-medium">{post.cycle}</div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                <div>{getStatusBadge(post.status)}</div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Target Audience</Label>
              <div className="text-sm bg-muted p-3 rounded-lg">{post.targetAudience}</div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Content</Label>
              <div className="text-sm bg-muted p-3 rounded-lg whitespace-pre-wrap">{post.content}</div>
              <div className="text-xs text-muted-foreground">
                {post.content.length}/280 characters
              </div>
            </div>

            {post.mediaUrls.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Media ({post.mediaUrls.length} image{post.mediaUrls.length > 1 ? 's' : ''})
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {post.mediaUrls.map((url, index) => (
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

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Image Settings</Label>
              <div className="text-sm bg-muted p-3 rounded-lg">
                {post.useOgFallback ? (
                  <span className="text-blue-600">✓ Will use OG fallback image</span>
                ) : (
                  <span className="text-muted-foreground">No OG fallback</span>
                )}
              </div>
            </div>

            {post.mediaAlt && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Alt Text</Label>
                <div className="text-sm bg-muted p-3 rounded-lg">{post.mediaAlt}</div>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Scheduled Time (KSA)</Label>
              <div className="text-sm bg-muted p-3 rounded-lg">
                {new Date(post.scheduledAtKsa).toLocaleString('en-US', {
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

            {post.status === 'POSTED' && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Posted At</Label>
                <div className="text-sm bg-green-50 p-3 rounded-lg border border-green-200">
                  {post.postedAt ? new Date(post.postedAt).toLocaleString('en-US', {
                    timeZone: 'Asia/Riyadh',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  }) : 'Unknown'}
                </div>
                {post.tweetId && (
                  <>
                    <Label className="text-sm font-medium text-muted-foreground">Tweet ID</Label>
                    <div className="text-sm bg-green-50 p-3 rounded-lg border border-green-200 font-mono">
                      {post.tweetId}
                    </div>
                  </>
                )}
              </div>
            )}

            {post.error && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Error Details</Label>
                <div className="text-sm bg-red-50 p-3 rounded-lg border border-red-200 text-red-700">
                  {post.error}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Source</Label>
              <div className="text-sm bg-muted p-3 rounded-lg">{post.source}</div>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
