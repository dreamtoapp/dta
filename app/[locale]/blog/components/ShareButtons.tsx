"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Facebook, Twitter, Linkedin, Instagram, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const t = useTranslations('blog');

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground">
        {t('share')}:
      </span>

      {/* System share (shows Instagram on mobile if installed) */}
      <Button
        variant="outline"
        size="sm"
        onClick={async () => {
          try {
            if (navigator.share) {
              await navigator.share({ title, text: title, url });
            } else {
              toast.info('Native share not supported. Link copied.');
              await navigator.clipboard.writeText(url);
            }
          } catch {
            // user cancelled or error
          }
        }}
        className="gap-2"
      >
        <Instagram className="w-4 h-4" />
        Instagram
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('facebook')}
        className="gap-2"
      >
        <Facebook className="w-4 h-4" />
        Facebook
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('twitter')}
        className="gap-2"
      >
        <Twitter className="w-4 h-4" />
        Twitter
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('linkedin')}
        className="gap-2"
      >
        <Linkedin className="w-4 h-4" />
        LinkedIn
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className="gap-2"
      >
        <LinkIcon className="w-4 h-4" />
        Copy Link
      </Button>
    </div>
  );
}
