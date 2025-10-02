'use server';

import db from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteTeamMember(id: string) {
  try {
    await db.teamMember.delete({
      where: { id }
    });

    revalidatePath('/dashboard');
    revalidatePath('/dashboard/team');

    return {
      success: true,
      message: 'Team member deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting team member:', error);
    return {
      success: false,
      error: 'Failed to delete team member'
    };
  }
}


















