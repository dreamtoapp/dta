'use server';

import { uploadTeamMemberImage } from '@/lib/cloudinary';

export async function uploadTeamMemberImageAction(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    const teamMemberName = formData.get('teamMemberName') as string;

    if (!file) {
      return {
        success: false,
        error: 'No file provided'
      };
    }

    if (!teamMemberName) {
      return {
        success: false,
        error: 'Team member name is required'
      };
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const imageUrl = await uploadTeamMemberImage(buffer, file.name, teamMemberName);

    return {
      success: true,
      imageUrl: imageUrl
    };
  } catch (error) {
    console.error('Error uploading team member image:', error);
    return {
      success: false,
      error: 'Failed to upload image'
    };
  }
}
