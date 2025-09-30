import { getTranslations, getLocale } from "next-intl/server"
import { Metadata } from "next"
import InfluencerRegisterClient from './components/InfluencerRegisterClient'

// ============================================================================
// METADATA
// ============================================================================

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()

  return {
    title: locale === 'ar' ? 'سجل كمؤثر - دريم تو آب' : 'Register as Influencer - DreamToApp',
    description: locale === 'ar'
      ? 'انضم إلى شبكة المؤثرين لدينا واحصل على فرص تعاون مع علامات تجارية رائدة'
      : 'Join our influencer network and get collaboration opportunities with leading brands',
    openGraph: {
      title: locale === 'ar' ? 'سجل كمؤثر' : 'Register as Influencer',
      description: locale === 'ar'
        ? 'انضم إلى شبكة المؤثرين لدينا'
        : 'Join our influencer network',
      locale: locale,
    },
  }
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default async function InfluencerRegisterPage() {
  const locale = await getLocale()

  return (
    <div className="min-h-screen bg-background">
      <InfluencerRegisterClient locale={locale} />
    </div>
  )
}






