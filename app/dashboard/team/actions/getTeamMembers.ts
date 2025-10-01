'use server';

import db from '@/lib/prisma';

export interface TeamMemberListItem {
  id: string;
  name: string;
  role: string;
  employeeImage?: string | null;
  experience?: string | null;
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
}

export async function getTeamMembers() {
  try {
    const teamMembers = await db.teamMember.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' }
    });

    return {
      success: true,
      data: teamMembers
    };
  } catch (error) {
    console.error('Error fetching team members:', error);
    return {
      success: false,
      data: [],
      error: 'Failed to fetch team members'
    };
  }
}















