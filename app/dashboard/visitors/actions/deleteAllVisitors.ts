'use server';

import db from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteAllVisitors() {
  try {
    // Delete all visitor records
    const result = await db.visitor.deleteMany({});

    // Revalidate the visitors page to refresh data
    revalidatePath('/dashboard/visitors');

    return {
      success: true,
      deletedCount: result.count,
      message: `Successfully deleted ${result.count} visitor records`
    };
  } catch (error) {
    console.error('Delete all visitors error:', error);
    return {
      success: false,
      error: 'Failed to delete all visitors'
    };
  }
}
