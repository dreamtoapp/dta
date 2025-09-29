'use server'

import { uploadInfluencerAvatar, uploadInfluencerCoverImage } from "@/lib/cloudinary";

export async function uploadAvatarImage(formData: FormData): Promise<string> {
  try {
    const file = formData.get('file') as File;
    const influencerName = formData.get('influencerName') as string;

    if (!file) {
      throw new Error('No file provided');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    return await uploadInfluencerAvatar(buffer, file.name, influencerName);
  } catch (error) {
    console.error('Avatar upload error:', error);
    throw new Error('Failed to upload avatar image');
  }
}

export async function uploadCoverImage(formData: FormData): Promise<string> {
  try {
    const file = formData.get('file') as File;
    const influencerName = formData.get('influencerName') as string;

    if (!file) {
      throw new Error('No file provided');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    return await uploadInfluencerCoverImage(buffer, file.name, influencerName);
  } catch (error) {
    console.error('Cover image upload error:', error);
    throw new Error('Failed to upload cover image');
  }
}
