'use server';

import { z } from 'zod';
import db from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const UpdateTeamMemberSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  role: z.enum(['DEVELOPER', 'DESIGNER', 'MARKETING', 'MANAGER']),
  experience: z.string().optional(),
  displayOrder: z.number(),
  isActive: z.boolean(),
  employeeImage: z.string().optional(),
});

export async function updateTeamMember(data: any) {
  try {
    const validatedData = UpdateTeamMemberSchema.parse(data);

    const { id, ...updateData } = validatedData;

    const teamMember = await db.teamMember.update({
      where: { id },
      data: updateData
    });

    revalidatePath('/dashboard');
    revalidatePath('/dashboard/team');

    return {
      success: true,
      data: teamMember,
      message: 'Team member updated successfully'
    };
  } catch (error) {
    console.error('Error updating team member:', error);
    return {
      success: false,
      error: 'Failed to update team member'
    };
  }
}
