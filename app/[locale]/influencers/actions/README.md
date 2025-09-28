# Influencers Actions

This directory contains **server actions** specifically for the influencer feature.

## Files
- `getInfluencers.ts` - Fetch influencers with filtering and pagination
- `contactInfluencer.ts` - Handle influencer contact requests

## Usage
```typescript
import { getInfluencers } from '@/app/[locale]/influencers/actions/getInfluencers'
import { contactInfluencer } from '@/app/[locale]/influencers/actions/contactInfluencer'
```

## Guidelines
- All actions should be async functions
- Use proper error handling with try/catch
- Validate inputs with Zod schemas
- Return consistent response formats
- Include proper TypeScript types