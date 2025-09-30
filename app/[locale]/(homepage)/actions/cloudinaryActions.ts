type HeroSlide = {
  id: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  header?: string;
  subheader?: string;
  discountPercentage?: number;
  isActive: boolean;
};

export async function fetchCloudinaryClientSlides(): Promise<HeroSlide[]> {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) return [];

    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`;
    const folder = process.env.CLOUDINARY_CLIENTS_FOLDER || 'website/clients';
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        expression: `folder="${folder}" AND resource_type:image`,
        max_results: 12,
      }),
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    const items = (data.resources || []) as any[];
    return items.map((r, idx) => ({
      id: r.public_id as string,
      imageUrl: r.secure_url as string,
      ctaText: 'استكشف الآن',
      ctaLink: '/clients',
      isActive: true,
    }));
  } catch {
    return [];
  }
}

export type { HeroSlide };
