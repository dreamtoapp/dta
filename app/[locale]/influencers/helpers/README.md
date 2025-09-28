# Influencers Helpers

This directory contains **utility functions** and **custom hooks** specifically for the influencer feature.

## Files
- `types.ts` - TypeScript type definitions
- `constants.ts` - Constants and configurations
- `utils.ts` - Utility functions (formatting, validation, etc.)
- `hooks.ts` - Custom React hooks
- `mockData.ts` - Mock data for development

## Usage
```typescript
import { Influencer, SocialPlatform } from '@/app/[locale]/influencers/helpers/types'
import { formatNumber } from '@/app/[locale]/influencers/helpers/utils'
import { useInfluencerFilters } from '@/app/[locale]/influencers/helpers/hooks'
```

## Guidelines
- Keep functions pure and testable
- Use TypeScript for all definitions
- Document complex logic
- Follow naming conventions
- Export only what's needed