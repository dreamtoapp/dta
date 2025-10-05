import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TwitterPost } from '../types';

interface DeletePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: TwitterPost | null;
  onConfirm: () => void;
}

export function DeletePostDialog({ open, onOpenChange, post, onConfirm }: DeletePostDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Post</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        {post && (
          <div className="py-4">
            <div className="bg-muted p-3 rounded-lg">
              <div className="text-sm font-medium mb-2">
                Day {post.day} - {post.slot} ({post.ksaTimeLabel})
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                Target: {post.targetAudience}
              </div>
              <div className="text-sm">
                {post.content.substring(0, 100)}
                {post.content.length > 100 && '...'}
              </div>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
          >
            Delete Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
