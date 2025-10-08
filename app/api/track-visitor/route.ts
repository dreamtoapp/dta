import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/prisma';
import { parseUserAgent, getGeoLocation, getGeoLocationFromIPAPI, cleanReferrer, isValidIP } from '@/lib/visitor-tracking';

export async function POST(request: NextRequest) {
  try {
    let body: any = null;
    try {
      body = await request.json();
    } catch {
      // Empty or invalid JSON in dev — return early with 200
      return NextResponse.json({ success: true, skipped: true });
    }
    const { ip, userAgent, referer, currentPage, utmSource, utmMedium, utmCampaign, geo } = body;

    // Validate IP
    if (!isValidIP(ip)) {
      return NextResponse.json({ success: true, skipped: true });
    }

    // Parse device info
    const deviceInfo = parseUserAgent(userAgent);

    // Get geolocation data (try multiple sources)
    let geoData = null;
    let shouldUpdateGeoData = false;

    try {
      // 1. Try Vercel's geolocation first (if available from middleware)
      if (geo && geo.country) {
        geoData = {
          country: geo.country,
          city: geo.city,
          region: geo.region,
        };
        console.log('Using Vercel geolocation for IP:', ip);
      } else {
        // 2. Check database cache for existing visitor WITH valid country data
        const existingVisitor = await db.visitor.findUnique({
          where: { ip },
          select: { country: true, city: true, region: true },
        });

        // Only use cached data if country exists (not null/undefined)
        if (existingVisitor?.country) {
          geoData = {
            country: existingVisitor.country,
            city: existingVisitor.city,
            region: existingVisitor.region,
          };
          console.log('Using cached geolocation for IP:', ip);
        } else {
          // 3. Call ip-api.com for new visitors OR visitors without geo data
          console.log('Fetching geolocation from IP-API for IP:', ip);
          geoData = await getGeoLocationFromIPAPI(ip);
          shouldUpdateGeoData = true; // Flag to update database with new geo data

          if (geoData) {
            console.log('Fetched geolocation from IP-API for IP:', ip, geoData);
          } else {
            console.log('IP-API returned no data for IP:', ip);
          }
        }
      }
    } catch (geoError) {
      console.error('Geolocation lookup error:', geoError);
      // Continue without geolocation data
    }

    // Clean referrer
    const cleanRef = cleanReferrer(referer);

    // Prepare visitor data
    const visitorData = {
      ip,
      ...(geoData || {}), // Only spread geoData if it exists
      ...deviceInfo,
      referrer: cleanRef,
      utmSource,
      utmMedium,
      utmCampaign,
      landingPage: currentPage,
      lastPage: currentPage,
      pagesVisited: [currentPage],
      visitCount: 1,
      lastVisitAt: new Date(),
    };

    // Upsert visitor record
    const visitor = await db.visitor.upsert({
      where: { ip },
      create: visitorData,
      update: {
        visitCount: { increment: 1 },
        lastPage: currentPage,
        pagesVisited: { push: currentPage },
        lastVisitAt: new Date(),
        // Update device info if changed
        browser: deviceInfo.browser,
        browserVersion: deviceInfo.browserVersion,
        os: deviceInfo.os,
        osVersion: deviceInfo.osVersion,
        deviceType: deviceInfo.deviceType,
        // Update geolocation data if we fetched new data
        ...(shouldUpdateGeoData && geoData ? {
          country: geoData.country,
          city: geoData.city,
          region: geoData.region,
        } : {}),
      },
    });

    return NextResponse.json({
      success: true,
      visitor: {
        id: visitor.id,
        ip: visitor.ip,
        visitCount: visitor.visitCount,
        country: visitor.country,
        city: visitor.city,
      }
    });
  } catch (error) {
    return NextResponse.json({ success: true, skipped: true });
  }
}

// Health check endpoint
export async function GET() {
  try {
    // Quick health check to verify tracking API is working
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'visitor-tracking'
    });
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json({
      status: 'error',
      error: 'Health check failed'
    }, { status: 500 });
  }
}
