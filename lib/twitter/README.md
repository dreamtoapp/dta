# Twitter Service

Twitter API integration service for posting tweets.

## Files
- `twitter.service.ts` - Core Twitter API service with OAuth 1.0a authentication

## Usage
```typescript
import { twitterService } from '@/lib/twitter/twitter.service';

// Post a tweet
const result = await twitterService.postTweet("Hello from my app!");

// Verify credentials
const verified = await twitterService.verifyCredentials();
```

## Environment Variables Required
- `TWITTER_API_KEY`
- `TWITTER_API_SECRET`
- `TWITTER_ACCESS_TOKEN`
- `TWITTER_ACCESS_TOKEN_SECRET`


