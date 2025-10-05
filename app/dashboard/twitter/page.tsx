"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ImageIcon, X, Loader2 } from "lucide-react";

export default function TwitterTestPage() {
  const [tweetText, setTweetText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isValidatingImage, setIsValidatingImage] = useState(false);

  const characterCount = tweetText.length;
  const isOverLimit = characterCount > 280;

  async function handleVerifyCredentials() {
    setIsVerifying(true);
    try {
      const response = await fetch("/api/twitter/verify");
      const data = await response.json();

      if (data.success) {
        toast.success("✅ Twitter credentials verified successfully!");
      } else {
        toast.error(`❌ Verification failed: ${data.error}`);
      }
    } catch (error) {
      toast.error("Failed to verify credentials");
      console.error(error);
    } finally {
      setIsVerifying(false);
    }
  }

  async function validateImageUrl(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok && !!response.headers.get('content-type')?.startsWith('image/');
    } catch {
      return false;
    }
  }

  async function handleImageUrlChange(url: string) {
    setImageUrl(url);

    if (!url.trim()) return;

    setIsValidatingImage(true);
    try {
      const isValid = await validateImageUrl(url);
      if (!isValid) {
        toast.error("Invalid image URL or image not accessible");
      }
    } catch (error) {
      toast.error("Failed to validate image URL");
    } finally {
      setIsValidatingImage(false);
    }
  }

  async function handlePostTweet(e: React.FormEvent) {
    e.preventDefault();

    if (!tweetText.trim()) {
      toast.error("Please enter some text");
      return;
    }

    if (isOverLimit) {
      toast.error("Tweet is too long");
      return;
    }

    if (imageUrl.trim() && !await validateImageUrl(imageUrl)) {
      toast.error("Invalid image URL");
      return;
    }

    setIsPosting(true);
    try {
      const response = await fetch("/api/twitter/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: tweetText,
          imageUrl: imageUrl.trim() || undefined
        }),
      });

      const data = await response.json();

      if (data.success) {
        const message = data.mediaUploaded
          ? "🎉 Tweet with image posted successfully!"
          : "🎉 Tweet posted successfully!";
        toast.success(message);
        setTweetText("");
        setImageUrl("");
      } else {
        toast.error(`Failed to post tweet: ${data.error}`);
      }
    } catch (error) {
      toast.error("Failed to post tweet");
      console.error(error);
    } finally {
      setIsPosting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            🐦 Twitter Test
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Test your Twitter API integration
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Verify Credentials</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Check if your Twitter API credentials are working
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleVerifyCredentials}
              disabled={isVerifying}
              className="w-full min-h-[44px] text-base"
              variant="outline"
            >
              {isVerifying ? "Verifying..." : "Verify Twitter Credentials"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Post a Tweet</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Write and post a test tweet from your app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePostTweet} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tweet" className="text-sm sm:text-base">Tweet Text</Label>
                <textarea
                  id="tweet"
                  value={tweetText}
                  onChange={(e) => setTweetText(e.target.value)}
                  placeholder="What's happening?"
                  className={`w-full min-h-[150px] p-3 border rounded-md resize-none text-base focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${isOverLimit ? "border-red-500" : ""
                    }`}
                />
                <div className="flex justify-between items-center text-sm">
                  <span
                    className={`font-medium ${isOverLimit
                      ? "text-red-500"
                      : characterCount > 260
                        ? "text-yellow-500"
                        : "text-gray-500 dark:text-gray-400"
                      }`}
                  >
                    {characterCount} / 280
                  </span>
                  {isOverLimit && (
                    <span className="text-red-500 text-xs">
                      {characterCount - 280} characters over limit
                    </span>
                  )}
                </div>
              </div>

              {/* Image URL Input */}
              <div className="space-y-2">
                <Label htmlFor="image-url" className="flex items-center gap-2 text-sm sm:text-base">
                  <ImageIcon className="h-4 w-4" />
                  Image URL (Optional)
                </Label>
                <div className="relative">
                  <Input
                    id="image-url"
                    type="url"
                    value={imageUrl}
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="pr-10 min-h-[44px] text-base"
                  />
                  {imageUrl && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setImageUrl("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  {isValidatingImage && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </div>
                {imageUrl && (
                  <div className="text-xs text-muted-foreground">
                    Supported formats: JPG, PNG, GIF, WebP (Max 5MB)
                  </div>
                )}
              </div>

              {/* Image Preview */}
              {imageUrl && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Preview</Label>
                  <div className="relative">
                    <img
                      src={imageUrl}
                      alt="Tweet preview"
                      className="w-full h-auto max-h-64 rounded-lg border object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        toast.error("Failed to load image preview");
                      }}
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={isPosting || !tweetText.trim() || isOverLimit}
                className="w-full min-h-[44px] text-base"
              >
                {isPosting ? "Posting..." : "Post Tweet"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-gray-800 border-blue-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-sm">📝 Quick Tips</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
            <p>• Maximum 280 characters per tweet</p>
            <p>• Add images by providing a public URL</p>
            <p>• Supported image formats: JPG, PNG, GIF, WebP (Max 5MB)</p>
            <p>• Verify credentials before posting</p>
            <p>• Check your Twitter account after posting</p>
            <p>• Environment variables must be set in .env.local</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

