'use server';

import db from '@/lib/prisma';

export async function deleteProject(projectId: string) {
  try {
    await db.projectRequest.delete({
      where: {
        id: projectId,
      },
    });

    return {
      success: true,
      message: 'Project request deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting project:', error);
    return {
      success: false,
      error: 'Failed to delete project request',
    };
  }
}
