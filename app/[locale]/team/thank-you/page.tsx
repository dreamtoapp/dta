import { getLocale } from 'next-intl/server';

import Link from '@/components/link';

export default async function ThankYouPage() {
  const locale = await getLocale();
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-4">
        Thank You for Your Application!
      </h1>
      <p className="mb-8">
        We appreciate your interest in joining our team. We'll review your
        application and get back to you soon.
      </p>
      <Link href={`/${locale}/apply-job`}>Back to Apply Job</Link>
    </div>
  );
}
