import { getImagesByPrefix } from '@/lib/cloudinary';
import ClientMarqueeClient from './ClientMarqueeClient';

type LogoItem = {
  id: string;
  url: string;
};

async function loadLogos(): Promise<LogoItem[]> {
  const prefix = 'website/workSample/logo';
  const items = await getImagesByPrefix(prefix, 40);
  return items.map((it) => ({ id: it.public_id, url: it.optimized_url }));
}

export default async function ClientMarquee() {
  const logos = await loadLogos();
  if (!logos.length) return null;

  return (
    <section aria-label="Our clients" className="py-10">
      <ClientMarqueeClient logos={logos} durationSec={90} />
    </section>
  );
}


