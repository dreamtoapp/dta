'use server';

import db from '@/lib/prisma';

export async function deleteVisitor(visitorId: string) {
  try {
    await db.visitor.delete({
      where: {
        id: visitorId,
      },
    });

    return {
      success: true,
      message: 'Visitor record deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting visitor:', error);
    return {
      success: false,
      error: 'Failed to delete visitor record',
    };
  }
}
