import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/prisma';
import { parseUserAgent, getGeoLocation, cleanReferrer, isValidIP } from '@/lib/visitor-tracking';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ip, userAgent, referer, currentPage, utmSource, utmMedium, utmCampaign } = body;

    // Validate IP
    if (!isValidIP(ip)) {
      console.warn('Invalid IP address:', ip);
      return NextResponse.json({ success: false, error: 'Invalid IP' }, { status: 400 });
    }

    // Parse device info
    const deviceInfo = parseUserAgent(userAgent);

    // Get geolocation
    const geoData = getGeoLocation(ip);

    // Clean referrer
    const cleanRef = cleanReferrer(referer);

    // Prepare visitor data
    const visitorData = {
      ip,
      ...geoData,
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
    console.error('Track visitor error:', {
      error,
      timestamp: new Date().toISOString(),
      body: request.body ? 'present' : 'missing'
    });

    // Return success even if tracking fails to not break the user experience
    return NextResponse.json({
      success: false,
      error: 'Tracking failed but site continues normally'
    }, { status: 500 });
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
