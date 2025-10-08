'use client';

import { Button } from '@/components/ui/button';
import { Twitter, Copy } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TweetButtonProps {
  postId: string;
  titleEn: string;
  titleAr: string;
  excerptEn?: string | null;
  excerptAr?: string | null;
  slugEn: string;
  slugAr: string;
  tags?: string[] | null;
  featuredImage?: string | null;
}

export function TweetButton({ postId, titleEn, titleAr, excerptEn, excerptAr, slugEn, slugAr, tags, featuredImage }: TweetButtonProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedLocale, setSelectedLocale] = useState<'en' | 'ar'>('en');

  // Prefer public site URL to avoid localhost in previews
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://www.dreamto.app');

  // Create both encoded (for API) and decoded (for display) URLs
  const encodedPermalink = selectedLocale === 'en'
    ? `${siteUrl}/en/blog/${encodeURIComponent(slugEn)}`
    : `${siteUrl}/ar/blog/${encodeURIComponent(slugAr)}`;

  const displayPermalink = selectedLocale === 'en'
    ? `${siteUrl}/en/blog/${slugEn}`
    : `${siteUrl}/ar/blog/${slugAr}`;

  const { tweetText, displayText, totalLength, charCount, hashtags } = useMemo(() => {
    const max = 200; // Reduced to 200 for safety margin
    const hash = (tags && tags.length > 0) ? tags.slice(0, 3).map(t => {
      // Remove spaces AND hyphens, convert to lowercase for hashtag format
      const cleanTag = t.replace(/[\s-]+/g, '').toLowerCase();
      return `#${cleanTag}`;
    }) : [];
    const hashStr = hash.length ? hash.join(' ') : '';

    const title = selectedLocale === 'en' ? titleEn : titleAr;
    const excerpt = selectedLocale === 'en' ? excerptEn : excerptAr;

    let text = title?.trim() || '';
    const extra = (excerpt || '').trim();
    if (extra) {
      const sep = text ? ' — ' : '';
      text = `${text}${sep}${extra}`;
    }

    // Professional formatting: content + hashtags + URL
    const hashtagLength = hashStr.length;
    const urlLength = encodedPermalink.length; // Use encoded URL for character count
    const spacing = hashStr ? 4 : 2; // Newlines for spacing (2 for hashtags + 2 for URL)
    const availableSpace = max - hashtagLength - urlLength - spacing;

    const truncatedText = text.slice(0, Math.max(0, availableSpace));
    const finalText = hashStr
      ? `${truncatedText}\n\n${hashStr}\n\n${encodedPermalink}` // Use encoded URL for actual tweet
      : `${truncatedText}\n\n${encodedPermalink}`;

    const total = finalText.length;
    return {
      tweetText: finalText,
      displayText: hashStr // Create display version with readable URL
        ? `${truncatedText}\n\n${hashStr}\n\n${displayPermalink}`
        : `${truncatedText}\n\n${displayPermalink}`,
      totalLength: total,
      charCount: `${total}/${max}`,
      hashtags: hash
    };
  }, [titleEn, titleAr, excerptEn, excerptAr, tags, selectedLocale, encodedPermalink, displayPermalink]);

  const [resolvedImage, setResolvedImage] = useState<string | null>(null);
  const [imgLoading, setImgLoading] = useState(false);

  const resolveImage = useCallback(async () => {
    try {
      setImgLoading(true);
      // Prefer DB featuredImage; if not, ask preview API to resolve from metadata
      if (featuredImage) {
        setResolvedImage(featuredImage);
      } else {
        const res = await fetch(`/api/twitter/post-blog/preview?postId=${encodeURIComponent(postId)}&locale=en`);
        const data = await res.json();
        if (data?.success && data.imageUrl) setResolvedImage(data.imageUrl);
        else setResolvedImage(`${siteUrl}/og-image.png`);
      }
    } catch {
      setResolvedImage(`${siteUrl}/og-image.png`);
    } finally {
      setImgLoading(false);
    }
  }, [featuredImage, postId, siteUrl]);

  const confirmPost = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/twitter/post-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, locale: selectedLocale }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to post');
      }
      toast.success(`Tweet posted in ${selectedLocale === 'en' ? 'English' : 'Arabic'}`);
      setOpen(false);
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || 'Failed to post');
    } finally {
      setLoading(false);
    }
  }, [postId, selectedLocale]);

  const copyTweet = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(tweetText);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 1200);
    } catch {
      toast.error('Copy failed');
    }
  }, [tweetText]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" aria-label="Post to X (Twitter)" onClick={resolveImage}>
                <Twitter className="w-4 h-4" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>Post to X (Twitter)</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="max-h-[80vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Post to X (Twitter)</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          <div className="flex gap-2 mb-4">
            <Button
              variant={selectedLocale === 'en' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedLocale('en')}
            >
              English
            </Button>
            <Button
              variant={selectedLocale === 'ar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedLocale('ar')}
            >
              العربية
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">Preview</div>
          <div className="rounded-lg border p-4 bg-card">
            <div className="whitespace-pre-wrap text-sm" dir={selectedLocale === 'ar' ? 'rtl' : 'ltr'}>{displayText}</div>
            <div
              className="mt-2 text-xs"
              style={{
                color:
                  totalLength > 260
                    ? 'hsl(var(--danger-foreground))'
                    : totalLength > 240
                      ? 'hsl(var(--warning-foreground))'
                      : 'hsl(var(--muted-foreground))',
              }}
            >
              {charCount}
            </div>
          </div>
          <div className="rounded-lg border p-2">
            <div className="text-xs text-muted-foreground mb-2">Image preview</div>
            {imgLoading ? (
              <Skeleton className="h-48 w-full" />
            ) : (
              <img
                src={resolvedImage || `${siteUrl}/og-image.png`}
                alt="Tweet image preview"
                className="max-h-48 w-auto rounded-md object-cover"
                loading="lazy"
              />
            )}
          </div>
          {hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {hashtags.map((h) => (
                <Badge key={h} variant="secondary">{h}</Badge>
              ))}
            </div>
          )}
          <Separator />
          <div className="text-sm">This will post immediately to the agency account using server credentials.</div>
        </div>
        <DialogFooter className="flex-shrink-0">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>Cancel</Button>
          <Button variant="ghost" onClick={copyTweet} disabled={loading} aria-label="Copy tweet">
            <Copy className="w-4 h-4 mr-1" /> {copied ? 'Copied' : 'Copy'}
          </Button>
          <Button onClick={confirmPost} disabled={loading}>
            {loading ? 'Posting…' : `Post ${selectedLocale === 'en' ? 'English' : 'Arabic'}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


