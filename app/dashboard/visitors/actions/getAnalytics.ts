'use server';

import db from '@/lib/prisma';

export async function getVisitorAnalytics() {
  try {
    // Get all visitors
    const visitors = await db.visitor.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Calculate visitor trends (last 30 days)
    const trends = calculateVisitorTrends(visitors);

    // Device breakdown
    const deviceBreakdown = calculateDeviceBreakdown(visitors);

    // Geographic distribution
    const geoDistribution = calculateGeoDistribution(visitors);

    // Browser stats
    const browserStats = calculateBrowserStats(visitors);

    // Traffic sources
    const trafficSources = calculateTrafficSources(visitors);

    // OS stats
    const osStats = calculateOSStats(visitors);

    // Recent activity
    const recentActivity = calculateRecentActivity(visitors);

    return {
      success: true,
      data: {
        trends,
        deviceBreakdown,
        geoDistribution,
        browserStats,
        trafficSources,
        osStats,
        recentActivity,
        totalVisitors: visitors.length,
        totalPageViews: visitors.reduce((sum, v) => sum + v.visitCount, 0),
        uniqueVisitorsToday: calculateUniqueVisitorsToday(visitors),
        uniqueVisitorsThisWeek: calculateUniqueVisitorsThisWeek(visitors),
        avgSessionDuration: calculateAvgSessionDuration(visitors),
      }
    };
  } catch (error) {
    console.error('Analytics error:', error);
    return { success: false, error: 'Failed to fetch analytics' };
  }
}

function calculateVisitorTrends(visitors: any[]) {
  const last30Days = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    const visitorsOnDate = visitors.filter(visitor => {
      // Use lastVisitAt if available, otherwise use createdAt
      const visitDate = visitor.lastVisitAt || visitor.createdAt;
      const visitorDate = new Date(visitDate).toISOString().split('T')[0];
      return visitorDate === dateStr;
    });

    last30Days.push({
      date: dateStr,
      visitors: visitorsOnDate.length,
      pageViews: visitorsOnDate.reduce((sum, v) => sum + v.visitCount, 0)
    });
  }

  return last30Days;
}

function calculateDeviceBreakdown(visitors: any[]) {
  const deviceCounts: Record<string, number> = {};

  visitors.forEach(visitor => {
    const deviceType = visitor.deviceType || 'unknown';
    deviceCounts[deviceType] = (deviceCounts[deviceType] || 0) + 1;
  });

  return Object.entries(deviceCounts).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    percentage: ((value / visitors.length) * 100).toFixed(1)
  }));
}

function calculateGeoDistribution(visitors: any[]) {
  const countryCounts: Record<string, number> = {};

  visitors.forEach(visitor => {
    const country = visitor.country || 'Unknown';
    countryCounts[country] = (countryCounts[country] || 0) + 1;
  });

  return Object.entries(countryCounts)
    .map(([country, visitors]) => ({ country, visitors }))
    .sort((a, b) => b.visitors - a.visitors)
    .slice(0, 10);
}

function calculateBrowserStats(visitors: any[]) {
  const browserCounts: Record<string, number> = {};

  visitors.forEach(visitor => {
    const browser = visitor.browser || 'Unknown';
    browserCounts[browser] = (browserCounts[browser] || 0) + 1;
  });

  return Object.entries(browserCounts)
    .map(([browser, count]) => ({ browser, count }))
    .sort((a, b) => b.count - a.count);
}

function calculateOSStats(visitors: any[]) {
  const osCounts: Record<string, number> = {};

  visitors.forEach(visitor => {
    const os = visitor.os || 'Unknown';
    osCounts[os] = (osCounts[os] || 0) + 1;
  });

  return Object.entries(osCounts)
    .map(([os, count]) => ({ os, count }))
    .sort((a, b) => b.count - a.count);
}

function calculateTrafficSources(visitors: any[]) {
  const sourceCounts: Record<string, number> = {};

  visitors.forEach(visitor => {
    let source = 'Direct';

    if (visitor.utmSource) {
      source = `UTM: ${visitor.utmSource}`;
    } else if (visitor.referrer) {
      try {
        const url = new URL(visitor.referrer);
        source = url.hostname;
      } catch {
        source = 'Referral';
      }
    }

    sourceCounts[source] = (sourceCounts[source] || 0) + 1;
  });

  return Object.entries(sourceCounts)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

function calculateRecentActivity(visitors: any[]) {
  const now = new Date();
  const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  return visitors.filter(visitor => {
    const visitDate = visitor.lastVisitAt || visitor.createdAt;
    return new Date(visitDate) >= last24Hours;
  }).length;
}

function calculateUniqueVisitorsToday(visitors: any[]) {
  const today = new Date().toISOString().split('T')[0];

  return visitors.filter(visitor => {
    const visitDate = visitor.lastVisitAt || visitor.createdAt;
    const visitorDate = new Date(visitDate).toISOString().split('T')[0];
    return visitorDate === today;
  }).length;
}

function calculateUniqueVisitorsThisWeek(visitors: any[]) {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  return visitors.filter(visitor => {
    const visitDate = visitor.lastVisitAt || visitor.createdAt;
    return new Date(visitDate) >= weekAgo;
  }).length;
}

function calculateAvgSessionDuration(visitors: any[]) {
  const visitorsWithDuration = visitors.filter(v => v.totalDuration > 0);

  if (visitorsWithDuration.length === 0) return 0;

  const totalDuration = visitorsWithDuration.reduce((sum, v) => sum + v.totalDuration, 0);
  return Math.round(totalDuration / visitorsWithDuration.length);
}

// Get detailed visitor list with pagination
export async function getVisitorsList(page: number = 1, limit: number = 10, filters: any = {}) {
  try {
    const skip = (page - 1) * limit;

    // Build where clause based on filters
    const where: any = {};

    if (filters.country) {
      where.country = { contains: filters.country, mode: 'insensitive' };
    }

    if (filters.deviceType) {
      where.deviceType = filters.deviceType;
    }

    if (filters.browser) {
      where.browser = { contains: filters.browser, mode: 'insensitive' };
    }

    if (filters.dateFrom || filters.dateTo) {
      where.OR = [
        {
          lastVisitAt: {
            gte: filters.dateFrom ? new Date(filters.dateFrom) : undefined,
            lte: filters.dateTo ? new Date(filters.dateTo) : undefined,
          }
        },
        {
          AND: [
            { lastVisitAt: null },
            {
              createdAt: {
                gte: filters.dateFrom ? new Date(filters.dateFrom) : undefined,
                lte: filters.dateTo ? new Date(filters.dateTo) : undefined,
              }
            }
          ]
        }
      ];
    }

    const [visitors, total] = await Promise.all([
      db.visitor.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      db.visitor.count({ where })
    ]);

    return {
      success: true,
      data: {
        visitors,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    console.error('Get visitors list error:', error);
    return { success: false, error: 'Failed to fetch visitors list' };
  }
}
