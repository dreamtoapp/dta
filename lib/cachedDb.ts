import { unstable_cache } from "next/cache";
import db from "@/lib/prisma";

/**
 * Cached Database Queries Wrapper
 * 
 * This module provides cached versions of frequently-accessed database queries
 * using Next.js unstable_cache for optimal performance.
 * 
 * Revalidation times are tuned based on data update frequency:
 * - Influencers: 300s (5 min) - moderate update frequency
 * - Team members: 600s (10 min) - rarely updated
 * - Newsletter stats: 60s (1 min) - frequently accessed stats
 * - Visitor stats: 120s (2 min) - analytics data
 * - Applications: 300s (5 min) - job applications
 * - Consultations: 180s (3 min) - consultation requests
 * - Projects: 600s (10 min) - project portfolio
 */

// ============================================================================
// INFLUENCERS
// ============================================================================

export const getCachedInfluencers = unstable_cache(
  async () => {
    return await db.influencer.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },
  ['influencers-list'],
  {
    revalidate: 300, // 5 minutes
    tags: ['influencers'],
  }
);

export const getCachedInfluencerById = (id: string) =>
  unstable_cache(
    async () => {
      return await db.influencer.findUnique({
        where: { id },
      });
    },
    [`influencer-${id}`],
    {
      revalidate: 300,
      tags: ['influencers', `influencer-${id}`],
    }
  )();

// ============================================================================
// TEAM MEMBERS
// ============================================================================

export const getCachedTeamMembers = unstable_cache(
  async () => {
    return await db.teamMember.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },
  ['team-members-list'],
  {
    revalidate: 600, // 10 minutes
    tags: ['team-members'],
  }
);

export const getCachedTeamMemberById = (id: string) =>
  unstable_cache(
    async () => {
      return await db.teamMember.findUnique({
        where: { id },
      });
    },
    [`team-member-${id}`],
    {
      revalidate: 600,
      tags: ['team-members', `team-member-${id}`],
    }
  )();

// ============================================================================
// NEWSLETTER
// ============================================================================

export const getCachedNewsletterStats = unstable_cache(
  async () => {
    const totalActive = await db.newsletterSubscription.count({
      where: { isActive: true },
    });

    const recentSubscribers = await db.newsletterSubscription.count({
      where: {
        isActive: true,
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        },
      },
    });

    return {
      totalActive,
      recentSubscribers,
    };
  },
  ['newsletter-stats'],
  {
    revalidate: 60, // 1 minute
    tags: ['newsletter'],
  }
);

export const getCachedNewsletterSubscribers = unstable_cache(
  async () => {
    return await db.newsletterSubscription.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  },
  ['newsletter-subscribers'],
  {
    revalidate: 120, // 2 minutes
    tags: ['newsletter'],
  }
);

// ============================================================================
// VISITORS
// ============================================================================

export const getCachedVisitorStats = unstable_cache(
  async () => {
    const totalVisitors = await db.visitor.count();
    // Since ip is unique in schema, totalVisitors = uniqueIPs
    const uniqueIPs = totalVisitors;

    const last7Days = await db.visitor.count({
      where: {
        lastVisitAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });

    const last30Days = await db.visitor.count({
      where: {
        lastVisitAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    });

    return {
      totalVisitors,
      uniqueIPs,
      last7Days,
      last30Days,
    };
  },
  ['visitor-stats'],
  {
    revalidate: 120, // 2 minutes
    tags: ['visitors'],
  }
);

export const getCachedVisitors = unstable_cache(
  async (limit: number = 100) => {
    return await db.visitor.findMany({
      take: limit,
      orderBy: { lastVisitAt: 'desc' },
    });
  },
  ['visitors-list'],
  {
    revalidate: 120,
    tags: ['visitors'],
  }
);

// ============================================================================
// JOB APPLICATIONS
// ============================================================================

export const getCachedJobApplications = unstable_cache(
  async () => {
    return await db.jobApplication.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },
  ['job-applications-list'],
  {
    revalidate: 300, // 5 minutes
    tags: ['job-applications'],
  }
);

export const getCachedJobApplicationById = (id: string) =>
  unstable_cache(
    async () => {
      return await db.jobApplication.findUnique({
        where: { id },
      });
    },
    [`job-application-${id}`],
    {
      revalidate: 300,
      tags: ['job-applications', `job-application-${id}`],
    }
  )();

// ============================================================================
// CONSULTATION REQUESTS
// ============================================================================

export const getCachedConsultationRequests = unstable_cache(
  async () => {
    return await db.consultationRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },
  ['consultation-requests-list'],
  {
    revalidate: 180, // 3 minutes
    tags: ['consultation-requests'],
  }
);

export const getCachedConsultationRequestById = (id: string) =>
  unstable_cache(
    async () => {
      return await db.consultationRequest.findUnique({
        where: { id },
      });
    },
    [`consultation-request-${id}`],
    {
      revalidate: 180,
      tags: ['consultation-requests', `consultation-request-${id}`],
    }
  )();

// ============================================================================
// PROJECT REQUESTS
// ============================================================================

export const getCachedProjectRequests = unstable_cache(
  async () => {
    return await db.projectRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },
  ['project-requests-list'],
  {
    revalidate: 300, // 5 minutes
    tags: ['project-requests'],
  }
);

export const getCachedContactUsSubmissions = unstable_cache(
  async () => {
    return await db.contactus.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },
  ['contactus-list'],
  {
    revalidate: 600, // 10 minutes
    tags: ['contactus'],
  }
);

export const getCachedStartDreamSubmissions = unstable_cache(
  async () => {
    return await db.expressQuery.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },
  ['startdream-list'],
  {
    revalidate: 600,
    tags: ['startdream'],
  }
);

// ============================================================================
// DASHBOARD STATS (Aggregated)
// ============================================================================

export const getCachedDashboardStats = unstable_cache(
  async () => {
    const [
      totalJobApplications,
      activeJobApplications,
      totalVisitors,
      recentSubmissions,
      totalProjects,
      totalConsultations,
      totalInfluencers,
      activeInfluencers,
      verifiedInfluencers,
      totalFollowers,
      recentContactRequests,
      totalTeamMembers,
      activeTeamMembers,
      jobApplications,
      contacts,
      visitors,
      consultations
    ] = await Promise.all([
      // Job Applications Stats
      db.jobApplication.count(),
      db.jobApplication.count({
        where: {
          status: {
            in: ['SUBMITTED', 'UNDER_REVIEW']
          }
        }
      }),

      // Visitors Stats
      db.visitor.count(),

      // Recent submissions (last 7 days)
      db.jobApplication.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      }),

      // Total Projects
      db.projectRequest.count(),

      // Total Consultations
      db.consultationRequest.count(),

      // Influencer Stats
      db.influencer.count(),
      db.influencer.count({
        where: { isActive: true }
      }),
      db.influencer.count({
        where: { isVerified: true }
      }),
      db.influencer.aggregate({
        _sum: { totalFollowers: true }
      }),

      // Recent Contact Requests (last 7 days)
      db.projectRequest.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      }),

      // Team Member Stats
      db.teamMember.count(),
      db.teamMember.count({
        where: { isActive: true }
      }),

      // Recent Job Applications
      db.jobApplication.findMany({
        take: 10,
        orderBy: {
          createdAt: 'desc'
        }
      }),

      // Recent Contact Submissions
      db.projectRequest.findMany({
        take: 10,
        orderBy: {
          createdAt: 'desc'
        }
      }),

      // Recent Visitors
      db.visitor.findMany({
        take: 10,
        orderBy: {
          createdAt: 'desc'
        }
      }),

      // Recent Consultations
      db.consultationRequest.findMany({
        take: 10,
        orderBy: {
          createdAt: 'desc'
        }
      })
    ]);

    return {
      stats: {
        totalJobApplications,
        activeJobApplications,
        totalVisitors,
        recentSubmissions,
        totalProjects,
        totalConsultations,
        totalInfluencers,
        activeInfluencers,
        verifiedInfluencers,
        totalFollowers: totalFollowers._sum.totalFollowers || 0,
        recentContactRequests,
        totalTeamMembers,
        activeTeamMembers
      },
      jobApplications,
      contacts,
      visitors,
      consultations
    };
  },
  ['dashboard-stats'],
  {
    revalidate: 60, // 1 minute - frequently accessed dashboard data
    tags: ['dashboard'],
  }
);

// ============================================================================
// HELPER: Revalidate specific cache tags
// ============================================================================

/**
 * Usage in server actions after mutations:
 * 
 * import { revalidateTag } from 'next/cache';
 * 
 * // After creating/updating/deleting an influencer:
 * revalidateTag('influencers');
 * 
 * // After updating a specific influencer:
 * revalidateTag(`influencer-${id}`);
 */

