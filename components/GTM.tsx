import Script from 'next/script';

/**
 * GTM Component - Google Tag Manager Implementation
 * 
 * Following Next.js and Google official best practices:
 * - Uses afterInteractive strategy for optimal performance
 * - Includes noscript fallback for accessibility
 * - Environment variable safety with conditional rendering
 * - Zero hardcoded values
 */
export default function GTM() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  // Early return if no GTM ID provided
  if (!gtmId) {
    return null;
  }

  return (
    <>
      {/* GTM Script - Next.js Official Method with afterInteractive strategy */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
      />

      {/* GTM NoScript - For users with JavaScript disabled */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}
