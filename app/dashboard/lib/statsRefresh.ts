// Global event system for triggering stats refresh across components
export const STATS_REFRESH_EVENT = 'dashboard-stats-refresh';

export function triggerStatsRefresh() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(STATS_REFRESH_EVENT));
  }
}

export function onStatsRefresh(callback: () => void) {
  if (typeof window !== 'undefined') {
    window.addEventListener(STATS_REFRESH_EVENT, callback);
    return () => window.removeEventListener(STATS_REFRESH_EVENT, callback);
  }
  return () => { };
}
