import { getTranslations, getLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { getDynamicMetadata } from '@/app/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return await getDynamicMetadata('/privacy', locale);
}

export default async function PrivacyPolicyPage() {
  const locale = await getLocale();
  const t = await getTranslations('privacy');

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
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('informationWeCollect.title')}</h2>

            <h3 className="text-xl font-medium mb-3 text-foreground">{t('informationWeCollect.personalData.title')}</h3>
            <p className="mb-3">{t('informationWeCollect.personalData.description')}</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>{t('informationWeCollect.personalData.items.name')}</li>
              <li>{t('informationWeCollect.personalData.items.email')}</li>
              <li>{t('informationWeCollect.personalData.items.phone')}</li>
              <li>{t('informationWeCollect.personalData.items.company')}</li>
              <li>{t('informationWeCollect.personalData.items.position')}</li>
            </ul>

            <h3 className="text-xl font-medium mb-3 text-foreground">{t('informationWeCollect.technicalData.title')}</h3>
            <p className="mb-3">{t('informationWeCollect.technicalData.description')}</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>{t('informationWeCollect.technicalData.items.ip')}</li>
              <li>{t('informationWeCollect.technicalData.items.browser')}</li>
              <li>{t('informationWeCollect.technicalData.items.device')}</li>
              <li>{t('informationWeCollect.technicalData.items.cookies')}</li>
            </ul>

            <h3 className="text-xl font-medium mb-3 text-foreground">{t('informationWeCollect.usageData.title')}</h3>
            <p className="mb-3">{t('informationWeCollect.usageData.description')}</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>{t('informationWeCollect.usageData.items.pages')}</li>
              <li>{t('informationWeCollect.usageData.items.time')}</li>
              <li>{t('informationWeCollect.usageData.items.actions')}</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('howWeUse.title')}</h2>
            <p className="mb-4">{t('howWeUse.description')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('howWeUse.purposes.communication')}</li>
              <li>{t('howWeUse.purposes.services')}</li>
              <li>{t('howWeUse.purposes.improvement')}</li>
              <li>{t('howWeUse.purposes.security')}</li>
              <li>{t('howWeUse.purposes.legal')}</li>
              <li>{t('howWeUse.purposes.marketing')}</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('informationSharing.title')}</h2>
            <p className="mb-4">{t('informationSharing.description')}</p>

            <h3 className="text-xl font-medium mb-3 text-foreground">{t('informationSharing.thirdParties.title')}</h3>
            <p className="mb-3">{t('informationSharing.thirdParties.description')}</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>{t('informationSharing.thirdParties.items.service')}</li>
              <li>{t('informationSharing.thirdParties.items.analytics')}</li>
              <li>{t('informationSharing.thirdParties.items.payment')}</li>
            </ul>

            <h3 className="text-xl font-medium mb-3 text-foreground">{t('informationSharing.legal.title')}</h3>
            <p className="mb-3">{t('informationSharing.legal.description')}</p>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('dataSecurity.title')}</h2>
            <p className="mb-4">{t('dataSecurity.description')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('dataSecurity.measures.encryption')}</li>
              <li>{t('dataSecurity.measures.access')}</li>
              <li>{t('dataSecurity.measures.monitoring')}</li>
              <li>{t('dataSecurity.measures.training')}</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('yourRights.title')}</h2>
            <p className="mb-4">{t('yourRights.description')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>{t('yourRights.rights.access')}</strong> - {t('yourRights.rights.accessDesc')}</li>
              <li><strong>{t('yourRights.rights.correction')}</strong> - {t('yourRights.rights.correctionDesc')}</li>
              <li><strong>{t('yourRights.rights.deletion')}</strong> - {t('yourRights.rights.deletionDesc')}</li>
              <li><strong>{t('yourRights.rights.portability')}</strong> - {t('yourRights.rights.portabilityDesc')}</li>
              <li><strong>{t('yourRights.rights.objection')}</strong> - {t('yourRights.rights.objectionDesc')}</li>
              <li><strong>{t('yourRights.rights.withdrawal')}</strong> - {t('yourRights.rights.withdrawalDesc')}</li>
            </ul>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('cookies.title')}</h2>
            <p className="mb-4">{t('cookies.description')}</p>

            <h3 className="text-xl font-medium mb-3 text-foreground">{t('cookies.types.essential.title')}</h3>
            <p className="mb-3">{t('cookies.types.essential.description')}</p>

            <h3 className="text-xl font-medium mb-3 text-foreground">{t('cookies.types.analytics.title')}</h3>
            <p className="mb-3">{t('cookies.types.analytics.description')}</p>

            <h3 className="text-xl font-medium mb-3 text-foreground">{t('cookies.types.marketing.title')}</h3>
            <p className="mb-3">{t('cookies.types.marketing.description')}</p>

            <p className="mt-4">{t('cookies.management')}</p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('childrenPrivacy.title')}</h2>
            <p className="mb-4">{t('childrenPrivacy.description')}</p>
          </section>

          {/* International Transfers */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('internationalTransfers.title')}</h2>
            <p className="mb-4">{t('internationalTransfers.description')}</p>
          </section>

          {/* Changes to Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('changesToPolicy.title')}</h2>
            <p className="mb-4">{t('changesToPolicy.description')}</p>
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

          {/* Data Protection Officer */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('dataProtectionOfficer.title')}</h2>
            <p className="mb-4">{t('dataProtectionOfficer.description')}</p>
            <p className="mb-2"><strong>{t('dataProtectionOfficer.email')}:</strong> hi@dreamto.app</p>
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