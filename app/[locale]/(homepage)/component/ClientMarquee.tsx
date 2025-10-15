import { getAllImagesFlat } from '@/lib/cloudinary';
import ClientMarqueeClient from './ClientMarqueeClient';
import ClientMarqueeHeader from './ClientMarqueeHeader';
// import ClientMarqueeStats from './ClientMarqueeStats';

type LogoItem = {
  id: string;
  url: string;
  name?: string;
  category?: string;
};

async function loadLogos(): Promise<LogoItem[]> {
  const prefix = 'website/workSample/logo';

  try {
    // Use getAllImagesFlat to get ALL logos with pagination (up to 600)
    const items = await getAllImagesFlat(prefix, 600);
    return items.map((it) => ({
      id: it.public_id,
      url: it.optimized_url,
      name: it.public_id.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      category: 'client'
    }));
  } catch (error) {
    console.error('[ClientMarquee] Failed to fetch logos:', error);
    return [];
  }
}

export default async function ClientMarquee() {
  const logos = await loadLogos();
  if (!logos.length) return null;

  return (
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/2 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <ClientMarqueeHeader />

        {/* Stats Section */}
        {/* <ClientMarqueeStats /> */}

        {/* Logos Marquee */}
        <ClientMarqueeClient logos={logos} />
      </div>
    </section>
  );
}
