'use server';

import db from '@/lib/prisma';

export async function deleteConsultation(consultationId: string) {
  try {
    await db.consultationRequest.delete({
      where: {
        id: consultationId,
      },
    });

    return {
      success: true,
      message: 'Consultation request deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting consultation:', error);
    return {
      success: false,
      error: 'Failed to delete consultation request',
    };
  }
}
