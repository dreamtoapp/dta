'use server';

import { z } from 'zod';
import db from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const CreateTeamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.enum(['DEVELOPER', 'DESIGNER', 'MARKETING', 'MANAGER']),
  experience: z.string().optional(),
  displayOrder: z.number().default(0),
  employeeImage: z.string().optional(),
});

export async function createTeamMember(data: any) {
  try {
    const validatedData = CreateTeamMemberSchema.parse(data);

    const teamMember = await db.teamMember.create({
      data: validatedData
    });

    revalidatePath('/dashboard');
    revalidatePath('/dashboard/team');

    return {
      success: true,
      data: teamMember,
      message: 'Team member created successfully'
    };
  } catch (error) {
    console.error('Error creating team member:', error);
    return {
      success: false,
      error: 'Failed to create team member'
    };
  }
}
