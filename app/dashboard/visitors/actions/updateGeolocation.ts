'use server';

import db from '@/lib/prisma';
import { getGeoLocationFromIPAPI } from '@/lib/visitor-tracking';

export async function updateVisitorsGeolocation() {
  try {
    // First, get all visitors to see what data we have
    const allVisitors = await db.visitor.findMany({
      select: {
        id: true,
        ip: true,
        country: true,
        city: true
      },
      take: 100
    });

    console.log(`Total visitors in database: ${allVisitors.length}`);
    console.log('Sample visitor data:', allVisitors.slice(0, 3).map(v => ({
      ip: v.ip,
      country: v.country,
      city: v.city
    })));

    // Find all visitors with null, empty, or "Unknown" country data
    const visitorsWithoutGeo = allVisitors.filter(v =>
      !v.country ||
      v.country === '' ||
      v.country === 'Unknown' ||
      v.country === 'Unknown Country' ||
      !v.city ||
      v.city === '' ||
      v.city === 'Unknown' ||
      v.city === 'Unknown City'
    ).slice(0, 50); // Process 50 at a time

    console.log(`Found ${visitorsWithoutGeo.length} visitors without geolocation data`);

    const results = [];

    for (const visitor of visitorsWithoutGeo) {
      try {
        console.log(`Updating geolocation for IP: ${visitor.ip}`);

        // Fetch geolocation data from IP-API
        const geoData = await getGeoLocationFromIPAPI(visitor.ip);

        if (geoData && geoData.country) {
          // Update visitor with new geolocation data
          await db.visitor.update({
            where: { id: visitor.id },
            data: {
              country: geoData.country,
              city: geoData.city,
              region: geoData.region,
            }
          });

          results.push({
            ip: visitor.ip,
            success: true,
            country: geoData.country,
            city: geoData.city,
            region: geoData.region
          });

          console.log(`Updated ${visitor.ip}: ${geoData.country}, ${geoData.city}`);

          // Small delay to respect API rate limits (45 requests/minute)
          await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5 second delay
        } else {
          results.push({
            ip: visitor.ip,
            success: false,
            error: 'No geolocation data found'
          });
        }
      } catch (error) {
        console.error(`Error updating geolocation for ${visitor.ip}:`, error);
        results.push({
          ip: visitor.ip,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return {
      success: true,
      message: `Updated ${results.filter(r => r.success).length} out of ${results.length} visitors`,
      results
    };
  } catch (error) {
    console.error('Error updating visitors geolocation:', error);
    return {
      success: false,
      error: 'Failed to update geolocation data'
    };
  }
}
