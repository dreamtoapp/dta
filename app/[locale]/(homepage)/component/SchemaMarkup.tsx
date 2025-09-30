interface SchemaMarkupProps {
  organizationName: string;
  description: string;
  breadcrumbHome: string;
}

export default function SchemaMarkup({
  organizationName,
  description,
  breadcrumbHome
}: SchemaMarkupProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: organizationName,
            url: 'https://www.dreamto.app',
            logo: 'https://www.dreamto.app/og-image.png',
            description: description,
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Jeddah',
              addressCountry: 'SA'
            },
            sameAs: [
              'https://www.linkedin.com/company/dreamto',
              'https://twitter.com/dreamtoapp'
            ],
            contactPoint: [{
              '@type': 'ContactPoint',
              telephone: '+966554113107',
              contactType: 'customer service',
              areaServed: 'SA',
              availableLanguage: ['English', 'Arabic']
            }],
            serviceArea: {
              '@type': 'Country',
              name: 'Saudi Arabia'
            }
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Web Development Services',
            provider: {
              '@type': 'Organization',
              name: organizationName
            },
            description: 'Professional web development, mobile app development, and digital marketing services',
            serviceType: 'Web Development',
            areaServed: 'Saudi Arabia'
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: breadcrumbHome,
                item: 'https://www.dreamto.app'
              }
            ]
          }
        ])
      }}
    />
  );
}
