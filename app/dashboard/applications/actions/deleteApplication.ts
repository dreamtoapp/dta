'use server';

import db from '@/lib/prisma';

export async function deleteJobApplication(applicationId: string) {
  try {
    await db.jobApplication.delete({
      where: {
        id: applicationId,
      },
    });

    return {
      success: true,
      message: 'Application deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting job application:', error);
    return {
      success: false,
      error: 'Failed to delete application',
    };
  }
}
