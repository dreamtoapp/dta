# Dashboard Lib

This folder contains utility functions and helpers for the dashboard.

## Files:

### **statsRefresh.ts**
Global event system for refreshing sidebar statistics across dashboard pages.

**Usage:**
```typescript
import { triggerStatsRefresh } from '../lib/statsRefresh';

// After creating/updating/deleting data that affects stats:
triggerStatsRefresh();
```

**How it works:**
1. Any page can call `triggerStatsRefresh()` after data changes
2. The `useDashboardAuth` hook listens for refresh events
3. Sidebar stats automatically reload when event is triggered
4. No prop drilling or complex context needed

**When to use:**
- After deleting job applications
- After deleting team members
- After deleting influencers
- After any operation that changes sidebar badge counts
