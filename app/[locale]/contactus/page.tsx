// Enable ISR with 2 hour revalidation (mostly static with dynamic form)
export const revalidate = 7200;

import { getTranslations, getLocale } from "next-intl/server";
import { Metadata } from 'next';
import { getDynamicMetadata } from '@/app/seo/metadata';
import ContactForm from "./components/ContactForm";
import { Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return await getDynamicMetadata('/contactus', locale);
}

export default async function ContactUs({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  const t = await getTranslations("contact");

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'ContactPage',
              name: 'Contact Us - DreamToApp',
              description: 'Get in touch with DreamToApp. Contact us for web development, mobile apps, and digital solutions. We\'re here to help bring your ideas to life.',
              url: 'https://www.dreamto.app/contactus',
              publisher: {
                '@type': 'LocalBusiness',
                name: 'DreamToApp',
                url: 'https://www.dreamto.app',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Jeddah',
                  addressCountry: 'SA'
                },
                telephone: '+966554113107',
                email: 'info@dreamto.app'
              }
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://www.dreamto.app'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Contact Us',
                  item: 'https://www.dreamto.app/contactus'
                }
              ]
            }
          ])
        }}
      />

      {/* Hero Section */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Rocket className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {t("heroTitle")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              {t("heroSubtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="border shadow-lg bg-card">
            <CardContent className="p-8">
              <ContactForm locale={locale} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 