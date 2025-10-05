import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from 'lucide-react';

interface WarningDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  warnings: string[];
  onConfirm: () => void;
  onCancel: () => void;
}

export function WarningDialog({ open, onOpenChange, warnings, onConfirm, onCancel }: WarningDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <X className="h-5 w-5 text-orange-500" />
            Warning: Post Issues Detected
          </DialogTitle>
          <DialogDescription className="space-y-3">
            <p>The following issues were found with this post:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {warnings.map((warning, index) => (
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
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            Send Anyway
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
