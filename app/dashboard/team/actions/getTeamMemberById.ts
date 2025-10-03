'use server';

import db from '@/lib/prisma';

export interface TeamMemberDetail {
  id: string;
  name: string;
  role: string;
  employeeImage?: string | null;
  experience?: string | null;
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export async function getTeamMemberById(id: string) {
  try {
    const teamMember = await db.teamMember.findUnique({
      where: { id }
    });

    if (!teamMember) {
      return {
        success: false,
        error: 'Team member not found'
      };
    }

    return {
      success: true,
      data: teamMember
    };
  } catch (error) {
    console.error('Error fetching team member:', error);
    return {
      success: false,
      error: 'Failed to fetch team member'
    };
  }
}






















