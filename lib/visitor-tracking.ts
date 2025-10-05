// Simplified geolocation without geoip-lite to avoid serverless issues
// In production, we'll skip geolocation to avoid build/deployment issues
import { headers } from 'next/headers';

export interface DeviceInfo {
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
}

export interface VisitorData {
  ip: string;
  country?: string;
  city?: string;
  region?: string;
  org?: string;
  timezone?: string;
  browser?: string;
  browserVersion?: string;
  os?: string;
  osVersion?: string;
  deviceType?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  currentPage: string;
}

// Parse user agent to extract device info
export function parseUserAgent(userAgent: string): DeviceInfo {
  if (!userAgent) {
    return {
      browser: 'Unknown',
      browserVersion: 'Unknown',
      os: 'Unknown',
      osVersion: 'Unknown',
      deviceType: 'desktop'
    };
  }

  // Browser detection
  let browser = 'Unknown';
  let browserVersion = 'Unknown';

  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    browser = 'Chrome';
    const match = userAgent.match(/Chrome\/([0-9.]+)/);
    browserVersion = match ? match[1] : 'Unknown';
  } else if (userAgent.includes('Firefox')) {
    browser = 'Firefox';
    const match = userAgent.match(/Firefox\/([0-9.]+)/);
    browserVersion = match ? match[1] : 'Unknown';
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    browser = 'Safari';
    const match = userAgent.match(/Version\/([0-9.]+)/);
    browserVersion = match ? match[1] : 'Unknown';
  } else if (userAgent.includes('Edg')) {
    browser = 'Edge';
    const match = userAgent.match(/Edg\/([0-9.]+)/);
    browserVersion = match ? match[1] : 'Unknown';
  } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
    browser = 'Opera';
    const match = userAgent.match(/(?:Opera|OPR)\/([0-9.]+)/);
    browserVersion = match ? match[1] : 'Unknown';
  }

  // OS detection
  let os = 'Unknown';
  let osVersion = 'Unknown';

  if (userAgent.includes('Windows NT')) {
    os = 'Windows';
    if (userAgent.includes('Windows NT 10.0')) {
      osVersion = '10/11';
    } else if (userAgent.includes('Windows NT 6.3')) {
      osVersion = '8.1';
    } else if (userAgent.includes('Windows NT 6.1')) {
      osVersion = '7';
    }
  } else if (userAgent.includes('Mac OS X')) {
    os = 'macOS';
    const match = userAgent.match(/Mac OS X ([0-9_]+)/);
    if (match) {
      osVersion = match[1].replace(/_/g, '.');
    }
  } else if (userAgent.includes('Linux')) {
    os = 'Linux';
    if (userAgent.includes('Android')) {
      os = 'Android';
      const match = userAgent.match(/Android ([0-9.]+)/);
      osVersion = match ? match[1] : 'Unknown';
    }
  } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
    os = 'iOS';
    const match = userAgent.match(/OS ([0-9_]+)/);
    if (match) {
      osVersion = match[1].replace(/_/g, '.');
    }
  }

  // Device type detection
  let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';

  if (userAgent.includes('Mobile') || userAgent.includes('iPhone') || userAgent.includes('Android.*Mobile')) {
    deviceType = 'mobile';
  } else if (userAgent.includes('iPad') || userAgent.includes('Tablet')) {
    deviceType = 'tablet';
  }

  return {
    browser,
    browserVersion,
    os,
    osVersion,
    deviceType
  };
}

// Get client IP from headers
export async function getClientIP(): Promise<string> {
  try {
    const headersList = await headers();
    return headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      headersList.get('x-real-ip') ||
      headersList.get('cf-connecting-ip') ||
      'unknown';
  } catch (error) {
    console.error('Error getting client IP:', error);
    return 'unknown';
  }
}

// Get geolocation from Vercel's built-in geolocation headers
export function getGeoLocationFromVercel(request: any) {
  try {
    // Vercel provides geolocation data in request headers
    const country = request.geo?.country;
    const city = request.geo?.city;
    const region = request.geo?.region;

    if (!country) {
      return null;
    }

    return {
      country: country || null,
      city: city || null,
      region: region || null,
    };
  } catch (error) {
    console.log('Vercel geolocation not available:', error);
    return null;
  }
}

// Fallback geolocation for development (simple IP-based detection)
export function getGeoLocationFromIP(ip: string) {
  if (!ip || ip === 'unknown' || ip.startsWith('127.') || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return null;
  }

  // Simple country detection based on IP ranges (development only)
  // This is a basic implementation for local testing
  if (process.env.NODE_ENV === 'development') {
    // Very basic IP range detection for development
    if (ip.startsWith('8.8.') || ip.startsWith('1.1.')) {
      return {
        country: 'US',
        city: 'Development',
        region: 'Test',
      };
    }
  }

  return null;
}

// Main geolocation function
export function getGeoLocation(ip: string, request?: any) {
  // Try Vercel's geolocation first (production)
  if (request?.geo) {
    return getGeoLocationFromVercel(request);
  }

  // Fallback for development
  return getGeoLocationFromIP(ip);
}

// Validate IP address
export function isValidIP(ip: string): boolean {
  if (!ip || ip === 'unknown') return false;

  // IPv4 regex
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  // IPv6 regex (simplified)
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

// Clean and validate referrer
export function cleanReferrer(referrer: string): string | null {
  if (!referrer) return null;

  try {
    const url = new URL(referrer);
    // Remove common tracking parameters
    const cleanUrl = `${url.protocol}//${url.hostname}${url.pathname}`;

    // Skip if it's the same domain
    if (url.hostname.includes('dreamtoapp.com') || url.hostname.includes('localhost')) {
      return null;
    }

    return cleanUrl;
  } catch {
    return null;
  }
}

// Extract UTM parameters from URL
export function extractUTMParameters(url: string) {
  try {
    const urlObj = new URL(url);
    return {
      utmSource: urlObj.searchParams.get('utm_source') || null,
      utmMedium: urlObj.searchParams.get('utm_medium') || null,
      utmCampaign: urlObj.searchParams.get('utm_campaign') || null,
    };
  } catch {
    return {
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
    };
  }
}
