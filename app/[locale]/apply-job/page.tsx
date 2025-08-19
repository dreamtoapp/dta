import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';

export default async function ApplyJobRedirect() {
  const locale = await getLocale();

  // Redirect to the new team/apply route
  redirect(`/${locale}/team/apply`);
} 