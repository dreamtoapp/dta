// SEO Metadata utility for Next.js App Router
import { Metadata } from 'next';
import { getPageMetadata } from '@/lib/actions/metadataActions';

export function getDefaultMetadata(locale: string): Metadata {
  const isArabic = locale === 'ar';
  const baseUrl = 'https://www.dreamto.app';
  const localeUrl = `${baseUrl}/${locale}`;

  return {
    title: isArabic
      ? 'دريم تو آب - شركة تطوير مواقع وتطبيقات في جدة'
      : 'DreamToApp - Web & Mobile Development Agency in Jeddah, Saudi Arabia',
    description: isArabic
      ? 'شركة تطوير مواقع وتطبيقات في جدة، المملكة العربية السعودية. نقدم خدمات تطوير الويب، تطبيقات الجوال، التجارة الإلكترونية، وتصميم الهوية البصرية.'
      : 'Leading web & mobile development agency in Jeddah, Saudi Arabia. We specialize in web development, mobile apps, e-commerce, UI/UX design, and digital marketing services.',
    category: isArabic ? 'خدمات تطوير البرمجيات' : 'Software Development Services',
    authors: [{ name: 'DreamToApp Team' }],
    creator: 'DreamToApp',
    publisher: 'DreamToApp',
    formatDetection: {
      telephone: true,
      email: true,
      address: true,
    },
    classification: isArabic ? 'خدمات تقنية وتطوير برمجيات' : 'Technology & Software Development Services',
    openGraph: {
      title: isArabic ? 'دريم تو آب - شركة تطوير مواقع في جدة' : 'DreamToApp - Web Development Agency in Jeddah',
      description: isArabic
        ? 'شركة تطوير مواقع وتطبيقات في جدة، المملكة العربية السعودية'
        : 'Professional web & mobile development services in Jeddah, Saudi Arabia',
      url: localeUrl,
      siteName: isArabic ? 'دريم تو آب' : 'DreamToApp',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: isArabic ? 'دريم تو آب - شركة تطوير مواقع في جدة' : 'DreamToApp - Web Development Agency in Jeddah',
          type: 'image/png',
          secureUrl: `${baseUrl}/og-image.png`,
        },
      ],
      locale: isArabic ? 'ar_SA' : 'en_US',
      alternateLocale: isArabic ? 'en_US' : 'ar_SA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@dreamtoapp',
      creator: '@dreamtoapp',
      title: isArabic ? 'دريم تو آب - شركة تطوير مواقع في جدة' : 'DreamToApp - Web Development Agency in Jeddah',
      description: isArabic
        ? 'شركة تطوير مواقع وتطبيقات في جدة، المملكة العربية السعودية'
        : 'Professional web & mobile development services in Jeddah, Saudi Arabia',
      images: [{
        url: `${baseUrl}/og-image.png`,
        alt: isArabic ? 'دريم تو آب - شركة تطوير مواقع في جدة' : 'DreamToApp - Web Development Agency in Jeddah',
      }],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: '/favicon.ico',
    },
    alternates: {
      canonical: localeUrl,
      languages: {
        'x-default': 'https://www.dreamto.app/ar',
        ar: 'https://www.dreamto.app/ar',
        en: 'https://www.dreamto.app/en',
      },
    },
    other: {
      'geo.region': 'SA-MK',
      'geo.placename': 'Jeddah',
      'geo.position': '21.4858;39.1925',
      'ICBM': '21.4858, 39.1925',
      'DC.title': isArabic ? 'دريم تو آب' : 'DreamToApp',
      'DC.creator': 'DreamToApp',
      'DC.subject': isArabic ? 'تطوير مواقع، تطبيقات جوال، تصميم' : 'Web Development, Mobile Apps, Design',
      'DC.description': isArabic
        ? 'شركة تطوير مواقع وتطبيقات في جدة'
        : 'Web development agency in Jeddah, Saudi Arabia',
      'DC.publisher': 'DreamToApp',
      'DC.contributor': 'DreamToApp Team',
      'DC.date': new Date().toISOString(),
      'DC.type': 'Service',
      'DC.format': 'text/html',
      'DC.identifier': 'https://www.dreamto.app',
      'DC.language': isArabic ? 'ar' : 'en',
      'DC.coverage': 'Jeddah, Saudi Arabia',
      'DC.rights': 'Copyright DreamToApp',
    },
  };
}

// Database-driven metadata with fallback to default
export async function getDynamicMetadata(
  pagePath: string,
  locale: string
): Promise<Metadata> {
  try {
    const dbMeta = await getPageMetadata(pagePath);

    if (!dbMeta || !dbMeta.isActive) {
      // Fallback to default if no DB record or inactive
      return getDefaultMetadata(locale);
    }

    const isArabic = locale === 'ar';
    const baseUrl = 'https://www.dreamto.app';
    const localeUrl = `${baseUrl}/${locale}${pagePath === '/' ? '' : pagePath}`;

    // Helper: compose a smart, de-duplicated, length-safe title
    const brandAr = 'دريم تو آب';
    const brandEn = 'DreamToApp';
    const brand = isArabic ? brandAr : brandEn;
    const rawTitle = (isArabic ? dbMeta.titleAr : dbMeta.titleEn) || '';
    const hasBrand = rawTitle.toLowerCase().includes(brandEn.toLowerCase()) || rawTitle.includes(brandAr);
    const composed = hasBrand ? rawTitle : (rawTitle ? `${rawTitle} | ${brand}` : brand);
    const safeTitle = composed.length > 60 ? composed.slice(0, 60) : composed;

    return {
      title: safeTitle,
      description: isArabic ? dbMeta.descriptionAr : dbMeta.descriptionEn,
      // Keywords removed - deprecated by Google since 2009, no SEO value
      category: dbMeta.category || (isArabic ? 'خدمات تطوير البرمجيات' : 'Software Development Services'),
      authors: [{ name: dbMeta.author || 'DreamToApp Team' }],
      creator: 'DreamToApp',
      publisher: 'DreamToApp',
      formatDetection: {
        telephone: true,
        email: true,
        address: true,
      },
      classification: isArabic ? 'خدمات تقنية وتطوير برمجيات' : 'Technology & Software Development Services',
      openGraph: {
        title: (isArabic ? dbMeta.ogTitleAr : dbMeta.ogTitleEn) || safeTitle,
        description: (isArabic ? dbMeta.ogDescriptionAr : dbMeta.ogDescriptionEn) || (isArabic ? dbMeta.descriptionAr : dbMeta.descriptionEn),
        url: dbMeta.canonicalUrl || localeUrl,
        siteName: isArabic ? 'دريم تو آب' : 'DreamToApp',
        images: [
          {
            url: dbMeta.ogImage || `${baseUrl}/og-image.png`,
            width: 1200,
            height: 630,
            alt: (isArabic ? dbMeta.ogTitleAr : dbMeta.ogTitleEn) || (isArabic ? dbMeta.titleAr : dbMeta.titleEn),
            type: 'image/png',
            secureUrl: dbMeta.ogImage || `${baseUrl}/og-image.png`,
          },
        ],
        locale: isArabic ? 'ar_SA' : 'en_US',
        alternateLocale: isArabic ? 'en_US' : 'ar_SA',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@dreamtoapp',
        creator: '@dreamtoapp',
        title: (isArabic ? dbMeta.twitterTitleAr : dbMeta.twitterTitleEn) || safeTitle,
        description: (isArabic ? dbMeta.twitterDescriptionAr : dbMeta.twitterDescriptionEn) || (isArabic ? dbMeta.descriptionAr : dbMeta.descriptionEn),
        images: [{
          url: dbMeta.ogImage || `${baseUrl}/og-image.png`,
          alt: (isArabic ? dbMeta.twitterTitleAr : dbMeta.twitterTitleEn) || safeTitle,
        }],
      },
      robots: {
        index: dbMeta.robotsIndex,
        follow: dbMeta.robotsFollow,
      },
      icons: {
        icon: '/favicon.ico',
      },
      alternates: {
        canonical: dbMeta.canonicalUrl || localeUrl,
        languages: {
          'x-default': `${baseUrl}/ar${pagePath === '/' ? '' : pagePath}`,
          ar: `${baseUrl}/ar${pagePath === '/' ? '' : pagePath}`,
          en: `${baseUrl}/en${pagePath === '/' ? '' : pagePath}`,
        },
      },
      other: {
        'geo.region': 'SA-MK',
        'geo.placename': 'Jeddah',
        'geo.position': '21.4858;39.1925',
        'ICBM': '21.4858, 39.1925',
        'DC.title': isArabic ? 'دريم تو آب' : 'DreamToApp',
        'DC.creator': 'DreamToApp',
        'DC.subject': isArabic ? 'تطوير مواقع، تطبيقات جوال، تصميم' : 'Web Development, Mobile Apps, Design',
        'DC.description': isArabic
          ? 'شركة تطوير مواقع وتطبيقات في جدة'
          : 'Web development agency in Jeddah, Saudi Arabia',
        'DC.publisher': 'DreamToApp',
        'DC.contributor': 'DreamToApp Team',
        'DC.date': new Date().toISOString(),
        'DC.type': 'Service',
        'DC.format': 'text/html',
        'DC.identifier': 'https://www.dreamto.app',
        'DC.language': isArabic ? 'ar' : 'en',
        'DC.coverage': 'Jeddah, Saudi Arabia',
        'DC.rights': 'Copyright DreamToApp',
      },
    };
  } catch (error) {
    console.error('Error fetching dynamic metadata:', error);
    // Safe fallback on any error
    return getDefaultMetadata(locale);
  }
}
