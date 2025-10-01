import { getAllImagesFlat } from '@/lib/cloudinary';
import ClientMarqueeClient from './ClientMarqueeClient';

type LogoItem = {
  id: string;
  url: string;
};

async function loadLogos(): Promise<LogoItem[]> {
  const prefix = 'website/workSample/logo';

  try {
    // Use getAllImagesFlat to get ALL logos with pagination (up to 600)
    const items = await getAllImagesFlat(prefix, 600);
    return items.map((it) => ({ id: it.public_id, url: it.optimized_url }));
  } catch (error) {
    console.error('[ClientMarquee] Failed to fetch logos:', error);
    return [];
  }
}


export default async function ClientMarquee() {
  const logos = await loadLogos();
  if (!logos.length) return null;

  return <ClientMarqueeClient logos={logos} />;
}
