import { getTranslations, getLocale } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      type: 'website',
      locale: locale,
      alternateLocale: locale === 'ar' ? 'en' : 'ar',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
    },
    alternates: {
      canonical: `https://dreamto.app/${locale}/terms`,
      languages: {
        ar: 'https://dreamto.app/ar/terms',
        en: 'https://dreamto.app/en/terms',
      },
    },
  };
}

export default async function TermsOfServicePage() {
  const locale = await getLocale();
  const t = await getTranslations('terms');

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('lastUpdated')}: {t('lastUpdatedDate')}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">

          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('introduction.title')}</h2>
            <p className="mb-4">{t('introduction.paragraph1')}</p>
            <p className="mb-4">{t('introduction.paragraph2')}</p>
            <p className="mb-4">{t('introduction.paragraph3')}</p>
          </section>

          {/* Definitions */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('definitions.title')}</h2>
            <div className="space-y-3">
              <div>
                <strong className="text-foreground">{t('definitions.terms.company')}</strong>
                <p className="ml-4">{t('definitions.terms.companyDesc')}</p>
              </div>
              <div>
                <strong className="text-foreground">{t('definitions.terms.client')}</strong>
                <p className="ml-4">{t('definitions.terms.clientDesc')}</p>
              </div>
              <div>
                <strong className="text-foreground">{t('definitions.terms.services')}</strong>
                <p className="ml-4">{t('definitions.terms.servicesDesc')}</p>
              </div>
              <div>
                <strong className="text-foreground">{t('definitions.terms.website')}</strong>
                <p className="ml-4">{t('definitions.terms.websiteDesc')}</p>
              </div>
              <div>
                <strong className="text-foreground">{t('definitions.terms.content')}</strong>
                <p className="ml-4">{t('definitions.terms.contentDesc')}</p>
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('services.title')}</h2>
            <p className="mb-4">{t('services.description')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('services.types.web')}</li>
              <li>{t('services.types.mobile')}</li>
              <li>{t('services.types.crm')}</li>
              <li>{t('services.types.ecommerce')}</li>
              <li>{t('services.types.consulting')}</li>
              <li>{t('services.types.maintenance')}</li>
            </ul>
          </section>

          {/* Acceptance of Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('acceptance.title')}</h2>
            <p className="mb-4">{t('acceptance.description')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('acceptance.conditions.use')}</li>
              <li>{t('acceptance.conditions.legal')}</li>
              <li>{t('acceptance.conditions.age')}</li>
              <li>{t('acceptance.conditions.capacity')}</li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('userResponsibilities.title')}</h2>
            <p className="mb-4">{t('userResponsibilities.description')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('userResponsibilities.obligations.accuracy')}</li>
              <li>{t('userResponsibilities.obligations.compliance')}</li>
              <li>{t('userResponsibilities.obligations.security')}</li>
              <li>{t('userResponsibilities.obligations.legal')}</li>
              <li>{t('userResponsibilities.obligations.cooperation')}</li>
              <li>{t('userResponsibilities.obligations.payment')}</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('intellectualProperty.title')}</h2>

            <h3 className="text-xl font-medium mb-3 text-foreground">{t('intellectualProperty.ourRights.title')}</h3>
            <p className="mb-3">{t('intellectualProperty.ourRights.description')}</p>

            <h3 className="text-xl font-medium mb-3 text-foreground">{t('intellectualProperty.yourRights.title')}</h3>
            <p className="mb-3">{t('intellectualProperty.yourRights.description')}</p>

            <h3 className="text-xl font-medium mb-3 text-foreground">{t('intellectualProperty.licensing.title')}</h3>
            <p className="mb-3">{t('intellectualProperty.licensing.description')}</p>
          </section>

          {/* Payment Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('paymentTerms.title')}</h2>
            <p className="mb-4">{t('paymentTerms.description')}</p>

            <h3 className="text-xl font-medium mb-3 text-foreground">{t('paymentTerms.pricing.title')}</h3>
            <p className="mb-3">{t('paymentTerms.pricing.description')}</p>

            <h3 className="text-xl font-medium mb-3 text-foreground">{t('paymentTerms.payment.title')}</h3>
            <p className="mb-3">{t('paymentTerms.payment.description')}</p>

            <h3 className="text-xl font-medium mb-3 text-foreground">{t('paymentTerms.latePayment.title')}</h3>
            <p className="mb-3">{t('paymentTerms.latePayment.description')}</p>

            <h3 className="text-xl font-medium mb-3 text-foreground">{t('paymentTerms.refunds.title')}</h3>
            <p className="mb-3">{t('paymentTerms.refunds.description')}</p>
          </section>

          {/* Project Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('projectTerms.title')}</h2>

            <h3 className="text-xl font-medium mb-3 text-foreground">{t('projectTerms.timeline.title')}</h3>
            <p className="mb-3">{t('projectTerms.timeline.description')}</p>

            <h3 className="text-xl font-medium mb-3 text-foreground">{t('projectTerms.changes.title')}</h3>
            <p className="mb-3">{t('projectTerms.changes.description')}</p>

            <h3 className="text-xl font-medium mb-3 text-foreground">{t('projectTerms.approval.title')}</h3>
            <p className="mb-3">{t('projectTerms.approval.description')}</p>

            <h3 className="text-xl font-medium mb-3 text-foreground">{t('projectTerms.deliverables.title')}</h3>
            <p className="mb-3">{t('projectTerms.deliverables.description')}</p>
          </section>

          {/* Confidentiality */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('confidentiality.title')}</h2>
            <p className="mb-4">{t('confidentiality.description')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('confidentiality.obligations.nonDisclosure')}</li>
              <li>{t('confidentiality.obligations.security')}</li>
              <li>{t('confidentiality.obligations.limitedAccess')}</li>
              <li>{t('confidentiality.obligations.return')}</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('limitationOfLiability.title')}</h2>
            <p className="mb-4">{t('limitationOfLiability.description')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('limitationOfLiability.exclusions.damages')}</li>
              <li>{t('limitationOfLiability.exclusions.thirdParty')}</li>
              <li>{t('limitationOfLiability.exclusions.forceMajeure')}</li>
              <li>{t('limitationOfLiability.exclusions.unauthorized')}</li>
            </ul>
          </section>

          {/* Termination */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('termination.title')}</h2>

            <h3 className="text-xl font-medium mb-3 text-foreground">{t('termination.byClient.title')}</h3>
            <p className="mb-3">{t('termination.byClient.description')}</p>

            <h3 className="text-xl font-medium mb-3 text-foreground">{t('termination.byCompany.title')}</h3>
            <p className="mb-3">{t('termination.byCompany.description')}</p>

            <h3 className="text-xl font-medium mb-3 text-foreground">{t('termination.effects.title')}</h3>
            <p className="mb-3">{t('termination.effects.description')}</p>
          </section>

          {/* Dispute Resolution */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('disputeResolution.title')}</h2>
            <p className="mb-4">{t('disputeResolution.description')}</p>

            <h3 className="text-xl font-medium mb-3 text-foreground">{t('disputeResolution.negotiation.title')}</h3>
            <p className="mb-3">{t('disputeResolution.negotiation.description')}</p>

            <h3 className="text-xl font-medium mb-3 text-foreground">{t('disputeResolution.mediation.title')}</h3>
            <p className="mb-3">{t('disputeResolution.mediation.description')}</p>

            <h3 className="text-xl font-medium mb-3 text-foreground">{t('disputeResolution.arbitration.title')}</h3>
            <p className="mb-3">{t('disputeResolution.arbitration.description')}</p>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('governingLaw.title')}</h2>
            <p className="mb-4">{t('governingLaw.description')}</p>
          </section>

          {/* Severability */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('severability.title')}</h2>
            <p className="mb-4">{t('severability.description')}</p>
          </section>

          {/* Entire Agreement */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('entireAgreement.title')}</h2>
            <p className="mb-4">{t('entireAgreement.description')}</p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('contactInformation.title')}</h2>
            <p className="mb-4">{t('contactInformation.description')}</p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="mb-2"><strong>{t('contactInformation.email')}:</strong> hi@dreamto.app</p>
              <p className="mb-2"><strong>{t('contactInformation.address')}:</strong> Jeddah, Saudi Arabia</p>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
          <p>{t('footer')}</p>
        </div>
      </div>
    </div>
  );
} 