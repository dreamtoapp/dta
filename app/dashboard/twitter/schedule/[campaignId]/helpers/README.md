# Helpers

This folder contains utility functions and custom React hooks.

## Files:

- **postHelpers.tsx** - Utility functions for post status and warnings
  - `getStatusBadge()` - Returns appropriate badge component for post status
  - `getPostWarnings()` - Validates post and returns array of warning messages

- **useCampaign.ts** - Custom hook for loading and managing campaign data
  - Fetches campaign by ID
  - Handles loading states and errors

- **usePostManagement.ts** - Custom hook for all post CRUD operations
  - Edit, delete, view post operations
  - Send post with validation
  - Dialog state management

All hooks follow React best practices and handle their own loading/error states.
