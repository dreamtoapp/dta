/**
 * GTM Head Component - Google Tag Manager DataLayer Initialization
 * 
 * This component provides the dataLayer initialization in the document head.
 * Follows Google Tag Manager official implementation guidelines:
 * - Only initializes dataLayer array
 * - No conflicting gtag configuration
 * - Environment variable safety
 */
export default function GTMHead() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  // Early return if no GTM ID provided
  if (!gtmId) {
    return null;
  }

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
        `,
      }}
    />
  );
}
