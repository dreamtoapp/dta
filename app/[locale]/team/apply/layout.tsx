import { Metadata } from 'next';
import { getDynamicMetadata } from '@/app/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return await getDynamicMetadata('/team/apply', locale);
}

export default function TeamApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


