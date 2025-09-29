# Dashboard Influencer Actions

This directory contains server actions for managing influencers in the dashboard.

## Actions

### `createInfluencer.ts`
- **Purpose**: Create a new influencer
- **Input**: `CreateInfluencerInput` (name, username, email, bio, etc.)
- **Output**: `CreateInfluencerResponse` (success, message, influencerId)
- **Features**:
  - Validates input with Zod schema
  - Checks for duplicate username/email
  - Generates unique reference ID
  - Calculates total followers
  - Creates social platforms

### `updateInfluencer.ts`
- **Purpose**: Update an existing influencer
- **Input**: `UpdateInfluencerInput` (id + optional fields)
- **Output**: `UpdateInfluencerResponse` (success, message, influencerId)
- **Features**:
  - Validates input with Zod schema
  - Checks for duplicate username/email (excluding current)
  - Updates social platforms (delete + recreate)
  - Recalculates total followers

### `deleteInfluencer.ts`
- **Purpose**: Delete an influencer
- **Input**: `DeleteInfluencerInput` (id)
- **Output**: `DeleteInfluencerResponse` (success, message)
- **Features**:
  - Validates input with Zod schema
  - Checks for active contact requests
  - Prevents deletion if active requests exist
  - Cascade deletes related records

### `updateInfluencerStatus.ts`
- **Purpose**: Update influencer status flags
- **Input**: `UpdateInfluencerStatusInput` (id, status, isVerified, isFeatured, isActive)
- **Output**: `UpdateInfluencerStatusResponse` (success, message, influencerId)
- **Features**:
  - Validates input with Zod schema
  - Updates status, verification, featured, and active flags

### `getContactRequests.ts`
- **Purpose**: Get contact requests with filtering
- **Input**: `GetContactRequestsParams` (influencerId, status, limit, offset)
- **Output**: `GetContactRequestsResponse` (contactRequests, total, hasMore)
- **Features**:
  - Filters by influencer and status
  - Pagination support
  - Includes influencer details

### `updateContactRequestStatus.ts`
- **Purpose**: Update contact request status
- **Input**: `UpdateContactRequestStatusInput` (id, status)
- **Output**: `UpdateContactRequestStatusResponse` (success, message, contactRequestId)
- **Features**:
  - Validates input with Zod schema
  - Updates status (PENDING, RESPONDED, COMPLETED, CANCELLED)

## Usage

```typescript
import { createInfluencer } from './actions/createInfluencer'
import { updateInfluencer } from './actions/updateInfluencer'
import { deleteInfluencer } from './actions/deleteInfluencer'
import { updateInfluencerStatus } from './actions/updateInfluencerStatus'
import { getContactRequests } from './actions/getContactRequests'
import { updateContactRequestStatus } from './actions/updateContactRequestStatus'

// Create influencer
const result = await createInfluencer({
  name: 'John Doe',
  username: 'johndoe',
  email: 'john@example.com',
  // ... other fields
})

// Update influencer
const updateResult = await updateInfluencer({
  id: 'influencer-id',
  name: 'Updated Name'
})

// Delete influencer
const deleteResult = await deleteInfluencer({
  id: 'influencer-id'
})

// Update status
const statusResult = await updateInfluencerStatus({
  id: 'influencer-id',
  status: 'ACTIVE',
  isVerified: true
})

// Get contact requests
const requests = await getContactRequests({
  influencerId: 'influencer-id',
  status: 'PENDING',
  limit: 10,
  offset: 0
})

// Update contact request status
const requestStatus = await updateContactRequestStatus({
  id: 'request-id',
  status: 'RESPONDED'
})
```

## Error Handling

All actions include comprehensive error handling:
- Zod validation errors
- Database constraint violations
- Business logic errors (duplicates, active requests)
- Generic error fallbacks

## Database Relations

Actions handle the following database relations:
- `Influencer` ↔ `SocialPlatform` (one-to-many)
- `Influencer` ↔ `PortfolioItem` (one-to-many)
- `Influencer` ↔ `Review` (one-to-many)
- `Influencer` ↔ `ContactRequest` (one-to-many)
