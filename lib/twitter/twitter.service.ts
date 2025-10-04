import { TwitterApi } from 'twitter-api-v2';

interface TwitterConfig {
  apiKey: string;
  apiSecret: string;
  accessToken: string;
  accessTokenSecret: string;
}

interface TweetResponse {
  success: boolean;
  data?: {
    id: string;
    text: string;
  };
  error?: string;
}

interface MediaUploadResponse {
  success: boolean;
  data?: {
    media_id: string;
    media_id_string: string;
  };
  error?: string;
}

class TwitterService {
  private config: TwitterConfig;
  private client: TwitterApi;

  constructor() {
    this.config = {
      apiKey: process.env.TWITTER_API_KEY || '',
      apiSecret: process.env.TWITTER_API_SECRET || '',
      accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
      accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET || '',
    };

    this.validateConfig();

    // Initialize Twitter client with OAuth 1.0a User Context
    this.client = new TwitterApi({
      appKey: this.config.apiKey,
      appSecret: this.config.apiSecret,
      accessToken: this.config.accessToken,
      accessSecret: this.config.accessTokenSecret,
    });
  }

  private validateConfig() {
    const missing = [];
    if (!this.config.apiKey) missing.push('TWITTER_API_KEY');
    if (!this.config.apiSecret) missing.push('TWITTER_API_SECRET');
    if (!this.config.accessToken) missing.push('TWITTER_ACCESS_TOKEN');
    if (!this.config.accessTokenSecret) missing.push('TWITTER_ACCESS_TOKEN_SECRET');

    if (missing.length > 0) {
      throw new Error(`Missing Twitter environment variables: ${missing.join(', ')}`);
    }
  }

  async uploadMedia(imageUrl: string): Promise<MediaUploadResponse> {
    try {
      // Fetch the image from URL
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }

      const imageBuffer = await response.arrayBuffer();
      const imageData = Buffer.from(imageBuffer);

      // Upload media using v1.1 API (media upload endpoint)
      const mediaUpload = await this.client.v1.uploadMedia(imageData, {
        mimeType: 'image/jpeg', // Twitter API v1.1 media upload
      });

      return {
        success: true,
        data: {
          media_id: mediaUpload,
          media_id_string: mediaUpload.toString(),
        },
      };
    } catch (error: any) {
      console.error('Media upload error:', error);

      let errorMessage = 'Failed to upload media';
      if (error.message) {
        errorMessage = error.message;
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async postTweet(text: string, mediaIds?: string[]): Promise<TweetResponse> {
    try {
      // Use v2 API to post tweet with OAuth 1.0a User Context
      const tweetOptions: any = { text };

      // Add media if provided
      if (mediaIds && mediaIds.length > 0) {
        tweetOptions.media = {
          media_ids: mediaIds,
        };
      }

      const tweet = await this.client.v2.tweet(tweetOptions);

      return {
        success: true,
        data: {
          id: tweet.data.id,
          text: tweet.data.text,
        },
      };
    } catch (error: any) {
      console.error('Twitter API Error:', error);

      // Extract detailed error message
      let errorMessage = 'Failed to post tweet';

      if (error.data?.detail) {
        errorMessage = error.data.detail;
      } else if (error.data?.title) {
        errorMessage = error.data.title;
      } else if (error.message) {
        errorMessage = error.message;
      }

      // Check for specific permission errors
      if (errorMessage.includes('oauth1') || errorMessage.includes('permission')) {
        errorMessage += ' - Please ensure your app has "Read and Write" permissions and you have regenerated your Access Token after changing permissions. Also verify you have Elevated access in Twitter Developer Portal.';
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async verifyCredentials(): Promise<{ success: boolean; error?: string; username?: string }> {
    try {
      // Get authenticated user info
      const user = await this.client.v2.me();

      return {
        success: true,
        username: user.data.username,
      };
    } catch (error: any) {
      console.error('Twitter Verification Error:', error);

      let errorMessage = 'Failed to verify credentials';

      if (error.data?.detail) {
        errorMessage = error.data.detail;
      } else if (error.data?.title) {
        errorMessage = error.data.title;
      } else if (error.message) {
        errorMessage = error.message;
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async getAppPermissions(): Promise<{ success: boolean; permissions?: string; error?: string }> {
    try {
      // Try to get current user to check permissions
      const user = await this.client.v2.me();

      // If we can get user, we at least have read permissions
      // To check write permissions, we'd need to attempt a write operation
      return {
        success: true,
        permissions: 'At least READ access verified. Username: @' + user.data.username,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Could not verify permissions',
      };
    }
  }
}

export const twitterService = new TwitterService();

