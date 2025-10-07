'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { getCachedDashboardStats } from '@/lib/cachedDb';

// Use cached version for better performance
export async function getDashboardStats() {
  try {
    return await getCachedDashboardStats();
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw new Error('Failed to fetch dashboard data');
  }
}

export async function refreshDashboardData() {
  try {
    // Revalidate dashboard cache tag to force refresh
    revalidateTag('dashboard');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error refreshing dashboard data:', error);
    throw new Error('Failed to refresh dashboard data');
  }
}
