# Influencer Service Backend Integration & Dashboard Action Plan

## 📋 Current State Analysis

### **Frontend Implementation Status**
✅ **Completed:**
- Complete UI/UX with mock data
- Influencer listing page with filters and search
- Individual influencer detail pages
- Platform-specific statistics display
- Client testimonials marquee
- Contact form functionality
- Responsive design and animations
- Internationalization support (English/Arabic)

### **Current Architecture**
```
app/[locale]/influencers/
├── page.tsx (Main listing page)
├── [id]/page.tsx (Individual influencer pages)
├── components/ (UI components)
│   ├── cards/ (InfluencerBadges, InfluencerBio, InfluencerFooter, etc.)
│   ├── filters/ (AdvancedFilters, CategoryFilter, LocationFilter, etc.)
│   ├── icons/ (Platform-specific icons)
│   ├── InfluencerCard.tsx
│   ├── InfluencerFilters.tsx
│   ├── InfluencersClientSection.tsx
│   ├── InfluencersGrid.tsx
│   └── PlatformMarquee.tsx
├── actions/ (Server actions with mock data)
│   ├── getInfluencers.ts
│   └── contactInfluencer.ts
├── helpers/ (Types, utils, constants, mock data)
│   ├── types.ts (Complete TypeScript interfaces)
│   ├── constants.ts (Platform configs, categories, filters)
│   ├── mockData.ts (10 sample influencers)
│   ├── utils.ts (Filtering, sorting, formatting)
│   └── hooks.ts (Custom React hooks)
└── loading.tsx (Loading states)
```

### **Existing Infrastructure**
✅ **Already Available:**
- **Database**: MongoDB with Prisma ORM
- **Email System**: Nodemailer with Gmail SMTP (lib/email.ts)
- **Authentication**: Basic dashboard auth system
- **Form Validation**: Zod schemas throughout
- **Internationalization**: next-intl with Arabic/English support
- **UI Components**: shadcn/ui with Tailwind CSS
- **File Upload**: Cloudinary integration
- **WhatsApp Integration**: Basic messaging system
- **Dashboard**: Admin dashboard with statistics

## 🎯 Integration Goals

1. **Replace mock data with real database**
2. **Implement admin dashboard for influencer management**
3. **Add real-time data synchronization**
4. **Implement user authentication and authorization**
5. **Add analytics and reporting features**
6. **Implement payment and booking system**

## 🗄️ Database Schema Implementation

### **Phase 1: Core Database Setup**

#### **1.1 Prisma Schema Extension**
```prisma
// Add to existing schema.prisma (MongoDB with ObjectId)

enum SocialPlatformType {
  INSTAGRAM
  TIKTOK
  YOUTUBE
  SNAPCHAT
  FACEBOOK
  TWITTER
  LINKEDIN
  WHATSAPP
  TELEGRAM
}

enum InfluencerCategory {
  LIFESTYLE
  TECH
  FASHION
  FOOD
  TRAVEL
  FITNESS
  BEAUTY
  GAMING
  EDUCATION
  BUSINESS
  ENTERTAINMENT
  SPORTS
  AUTOMOTIVE
  REAL_ESTATE
  HEALTH
}

enum InfluencerStatus {
  ACTIVE
  INACTIVE
  PENDING_VERIFICATION
  SUSPENDED
}

model Influencer {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  referenceId String   @unique // INF-001, INF-002, etc.
  name        String
  username    String   @unique
  email       String   @unique
  phone       String?
  bio         String
  avatar      String?
  coverImage  String?
  
  // Social Media Stats
  socialPlatforms SocialPlatform[]
  
  // Business Info
  category    InfluencerCategory
  location    String
  languages   String[] // ["Arabic", "English"]
  startingRate Int     // Starting rate in USD
  totalFollowers Int   // Calculated from all platforms
  avgEngagement Float  // Average engagement rate
  
  // Portfolio
  portfolio   PortfolioItem[]
  
  // Reviews & Testimonials
  reviews     Review[]
  
  
  // Status
  status      InfluencerStatus @default(PENDING_VERIFICATION)
  isActive    Boolean  @default(true)
  isVerified  Boolean  @default(false)
  isFeatured  Boolean  @default(false)
  
  // Timestamps
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("influencers")
}

model SocialPlatform {
  id           String @id @default(auto()) @map("_id") @db.ObjectId
  platform     SocialPlatformType
  username     String
  followers    Int
  engagement   Float  // Engagement rate percentage
  avgViews     Int?
  avgLikes     Int?
  avgComments  Int?
  avgShares    Int?
  lastUpdated  DateTime @default(now())
  isVerified   Boolean @default(false)
  isActive     Boolean @default(true)
  
  // Platform-specific fields
  platformData Json? // Store platform-specific metrics
  
  influencerId String @db.ObjectId
  influencer   Influencer @relation(fields: [influencerId], references: [id], onDelete: Cascade)
  
  @@unique([influencerId, platform])
  @@map("social_platforms")
}

model PortfolioItem {
  id           String @id @default(auto()) @map("_id") @db.ObjectId
  title        String
  description  String
  image        String
  platform     SocialPlatformType
  views        Int?
  likes        Int?
  date         DateTime
  
  influencerId String @db.ObjectId
  influencer   Influencer @relation(fields: [influencerId], references: [id], onDelete: Cascade)
  
  @@map("portfolio_items")
}

model Review {
  id           String @id @default(auto()) @map("_id") @db.ObjectId
  clientName   String
  clientTitle  String
  clientCompany String?
  rating       Int     // 1-5 stars
  comment      String
  campaignType String?
  campaignName String?
  isVerified   Boolean @default(false)
  
  influencerId String @db.ObjectId
  influencer   Influencer @relation(fields: [influencerId], references: [id], onDelete: Cascade)
  
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  @@map("reviews")
}

```

#### **1.2 Database Migration**
```bash
# Generate and apply migration
npx prisma migrate dev --name add-influencer-schema
npx prisma generate
```

### **Phase 2: API Routes Implementation**

#### **2.1 Influencer API Routes**
```typescript
// app/api/influencers/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '12')
  const category = searchParams.get('category')
  const platform = searchParams.get('platform')
  const location = searchParams.get('location')
  const verified = searchParams.get('verified') === 'true'
  const featured = searchParams.get('featured') === 'true'
  const sortBy = searchParams.get('sortBy') || 'followers'
  const sortOrder = searchParams.get('sortOrder') || 'desc'
  const search = searchParams.get('search') || ''

  // Implement database query with Prisma
  const influencers = await prisma.influencer.findMany({
    where: {
      isActive: true,
      ...(category && category !== 'all' && { category }),
      ...(location && location !== 'all' && { location }),
      ...(verified && { isVerified: true }),
      ...(featured && { isFeatured: true }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { username: { contains: search, mode: 'insensitive' } },
          { bio: { contains: search, mode: 'insensitive' } },
        ]
      })
    },
    include: {
      socialPlatforms: true,
      reviews: true,
      _count: {
        select: {
          reviews: true
        }
      }
    },
    orderBy: {
      [sortBy]: sortOrder
    },
    skip: (page - 1) * limit,
    take: limit
  })

  return Response.json({ influencers, total: influencers.length })
}
```

#### **2.2 Individual Influencer API**
```typescript
// app/api/influencers/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const influencer = await prisma.influencer.findUnique({
    where: { id: params.id },
    include: {
      socialPlatforms: true,
      portfolio: true,
      reviews: {
        orderBy: { createdAt: 'desc' },
        take: 10
      },
      _count: {
        select: {
          reviews: true
        }
      }
    }
  })

  if (!influencer) {
    return Response.json({ error: 'Influencer not found' }, { status: 404 })
  }

  return Response.json(influencer)
}
```


## 🔧 Backend Integration Tasks

### **Phase 3: Server Actions Migration**

#### **3.1 Update getInfluencers Action**
```typescript
// app/[locale]/influencers/actions/getInfluencers.ts
import db from '@/lib/prisma'
import type { Influencer, FilterState } from '../helpers/types'

export async function getInfluencers(params: GetInfluencersParams = {}): Promise<GetInfluencersResponse> {
  try {
    const { filters = {}, limit = 12, offset = 0 } = params

    // Build where clause based on filters
    const whereClause = buildWhereClause(filters)
    
    // Replace mock data with Prisma query
    const influencers = await db.influencer.findMany({
      where: {
        isActive: true,
        ...whereClause
      },
      include: {
        socialPlatforms: true,
        reviews: {
          select: {
            rating: true
          }
        }
      },
      orderBy: buildOrderBy(filters),
      skip: offset,
      take: limit
    })

    const total = await db.influencer.count({
      where: {
        isActive: true,
        ...whereClause
      }
    })

    return {
      influencers: influencers.map(transformInfluencer),
      total,
      hasMore: offset + limit < total
    }
  } catch (error) {
    console.error('Error fetching influencers:', error)
    throw new Error('Failed to fetch influencers')
  }
}

// Helper function to build where clause
function buildWhereClause(filters: Partial<FilterState>) {
  const where: any = {}
  
  if (filters.category && filters.category !== 'all') {
    where.category = filters.category
  }
  
  if (filters.location && filters.location !== 'all') {
    where.location = filters.location
  }
  
  if (filters.verified) {
    where.isVerified = true
  }
  
  if (filters.featured) {
    where.isFeatured = true
  }
  
  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { username: { contains: filters.search, mode: 'insensitive' } },
      { bio: { contains: filters.search, mode: 'insensitive' } }
    ]
  }
  
  if (filters.platform && filters.platform !== 'all') {
    where.socialPlatforms = {
      some: { platform: filters.platform }
    }
  }
  
  if (filters.followers && filters.followers !== 'all') {
    const [minStr, maxStr] = filters.followers.split('-')
    const min = parseInt(minStr.replace('K', '000').replace('M', '000000'))
    const max = maxStr ? parseInt(maxStr.replace('K', '000').replace('M', '000000')) : Infinity
    
    where.totalFollowers = {
      gte: min,
      ...(max !== Infinity && { lte: max })
    }
  }
  
  return where
}

// Helper function to build order by clause
function buildOrderBy(filters: Partial<FilterState>) {
  const sortBy = filters.sortBy || 'followers'
  const sortOrder = filters.sortOrder || 'desc'
  
  switch (sortBy) {
    case 'followers':
      return { totalFollowers: sortOrder }
    case 'engagement':
      return { avgEngagement: sortOrder }
    case 'rate':
      return { startingRate: sortOrder }
    case 'name':
      return { name: sortOrder }
    default:
      return { totalFollowers: 'desc' }
  }
}

// Transform database result to frontend format
function transformInfluencer(dbInfluencer: any): Influencer {
  return {
    id: dbInfluencer.id,
    referenceId: dbInfluencer.referenceId,
    name: dbInfluencer.name,
    username: dbInfluencer.username,
    bio: dbInfluencer.bio,
    avatar: dbInfluencer.avatar,
    category: dbInfluencer.category,
    location: dbInfluencer.location,
    languages: dbInfluencer.languages,
    socialPlatforms: dbInfluencer.socialPlatforms,
    totalFollowers: dbInfluencer.totalFollowers,
    avgEngagement: dbInfluencer.avgEngagement,
    startingRate: dbInfluencer.startingRate,
    isVerified: dbInfluencer.isVerified,
    isFeatured: dbInfluencer.isFeatured
  }
}
```

#### **3.2 Update contactInfluencer Action**
```typescript
// app/[locale]/influencers/actions/contactInfluencer.ts
import db from '@/lib/prisma'
import { sendEmail } from '@/lib/email'
import { z } from 'zod'

// Validation schema for contact form
const ContactInfluencerSchema = z.object({
  influencerId: z.string().min(1, 'Influencer ID is required'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  budget: z.string().optional(),
  campaignType: z.enum(['sponsored_post', 'story', 'reel', 'video', 'collaboration', 'other']).optional(),
  timeline: z.string().optional(),
})

export type ContactInfluencerInput = z.infer<typeof ContactInfluencerSchema>

export interface ContactInfluencerResponse {
  success: boolean
  message: string
}

export async function contactInfluencer(input: ContactInfluencerInput): Promise<ContactInfluencerResponse> {
  try {
    const validatedInput = ContactInfluencerSchema.parse(input)

    // Get influencer details for email
    const influencer = await db.influencer.findUnique({
      where: { id: validatedInput.influencerId },
      select: { name: true, email: true }
    })

    // Send email notifications using existing email system
    if (influencer?.email) {
      await sendEmail({
        to: influencer.email,
        subject: `New Contact Request from ${validatedInput.name}`,
        html: createInfluencerNotificationEmail(validatedInput, influencer.name)
      })
    }

    // Send confirmation to client
    await sendEmail({
      to: validatedInput.email,
      subject: 'Contact Request Confirmation',
      html: createClientConfirmationEmail(validatedInput.name, influencer?.name || 'Influencer')
    })

    return {
      success: true,
      message: 'Your contact request has been sent successfully!'
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0]?.message || 'Validation error'
      }
    }

    console.error('Error processing contact request:', error)
    return {
      success: false,
      message: 'Failed to send contact request. Please try again.'
    }
  }
}

// Email template functions
function createInfluencerNotificationEmail(input: ContactInfluencerInput, influencerName: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>New Contact Request</h2>
      <p>Hello ${influencerName},</p>
      <p>You have received a new contact request:</p>
      <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
        <p><strong>Name:</strong> ${input.name}</p>
        <p><strong>Email:</strong> ${input.email}</p>
        ${input.phone ? `<p><strong>Phone:</strong> ${input.phone}</p>` : ''}
        ${input.company ? `<p><strong>Company:</strong> ${input.company}</p>` : ''}
        <p><strong>Message:</strong> ${input.message}</p>
        ${input.budget ? `<p><strong>Budget:</strong> ${input.budget}</p>` : ''}
        ${input.campaignType ? `<p><strong>Campaign Type:</strong> ${input.campaignType}</p>` : ''}
        ${input.timeline ? `<p><strong>Timeline:</strong> ${input.timeline}</p>` : ''}
      </div>
    </div>
  `
}

function createClientConfirmationEmail(clientName: string, influencerName: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Contact Request Confirmation</h2>
      <p>Hello ${clientName},</p>
      <p>Thank you for your interest in working with ${influencerName}!</p>
      <p>Your contact request has been sent successfully. The influencer will review your message and get back to you soon.</p>
      <p>Best regards,<br>DreamToApp Team</p>
    </div>
  `
}
```

### **Phase 4: Admin Dashboard Implementation**

#### **4.1 Admin Dashboard Structure**
```
app/admin/
├── layout.tsx (Admin layout with sidebar)
├── page.tsx (Dashboard overview)
├── influencers/
│   ├── page.tsx (Influencer list)
│   ├── [id]/page.tsx (Edit influencer)
│   ├── new/page.tsx (Add new influencer)
│   └── components/
│       ├── InfluencerForm.tsx
│       ├── InfluencerTable.tsx
│       └── InfluencerStats.tsx
├── analytics/
│   ├── page.tsx (Analytics dashboard)
│   └── components/
│       ├── EngagementChart.tsx
│       ├── PlatformStats.tsx
│       └── RevenueChart.tsx
└── settings/
    ├── page.tsx (System settings)
    └── components/
        ├── PlatformSettings.tsx
        └── EmailTemplates.tsx
```

#### **4.2 Admin Authentication**
```typescript
// app/admin/layout.tsx
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Use existing dashboard authentication system
  // This will be integrated with the current dashboard auth
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="ml-64 p-6">
        {children}
      </main>
    </div>
  )
}

// Admin authentication middleware
export async function requireAdminAuth() {
  // This will use the existing dashboard authentication
  // Extend the current system to support admin roles
  const isAuthenticated = await checkDashboardAuth()
  
  if (!isAuthenticated) {
    redirect('/dashboard')
  }
}
```

#### **4.3 Influencer Management**
```typescript
// app/admin/influencers/components/InfluencerForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const InfluencerSchema = z.object({
  name: z.string().min(2),
  username: z.string().min(2),
  email: z.string().email(),
  bio: z.string().min(10),
  category: z.enum(['LIFESTYLE', 'TECH', 'FASHION', ...]),
  location: z.string().min(2),
  languages: z.array(z.string()),
  socialPlatforms: z.array(z.object({
    platform: z.enum(['INSTAGRAM', 'TIKTOK', ...]),
    username: z.string(),
    followers: z.number(),
    engagement: z.number(),
    verified: z.boolean()
  })),
  isVerified: z.boolean(),
  isFeatured: z.boolean(),
  isActive: z.boolean()
})

export function InfluencerForm({ influencer, onSubmit }: InfluencerFormProps) {
  const form = useForm({
    resolver: zodResolver(InfluencerSchema),
    defaultValues: influencer || {}
  })

  const handleSubmit = async (data: z.infer<typeof InfluencerSchema>) => {
    try {
      await fetch(`/api/admin/influencers${influencer ? `/${influencer.id}` : ''}`, {
        method: influencer ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      // Handle success
    } catch (error) {
      // Handle error
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      {/* Form fields */}
    </form>
  )
}
```

### **Phase 5: Real-time Data Synchronization**

#### **5.1 Social Media API Integration**
```typescript
// lib/social-apis/instagram.ts
export class InstagramAPI {
  private accessToken: string

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  async getProfile(username: string) {
    const response = await fetch(
      `https://graph.instagram.com/${username}?fields=id,username,followers_count,media_count&access_token=${this.accessToken}`
    )
    return response.json()
  }

  async getEngagementRate(username: string) {
    // Calculate engagement rate from recent posts
    const posts = await this.getRecentPosts(username)
    const totalEngagement = posts.reduce((sum, post) => 
      sum + post.likes_count + post.comments_count, 0
    )
    const totalFollowers = await this.getFollowersCount(username)
    
    return (totalEngagement / (posts.length * totalFollowers)) * 100
  }
}
```

#### **5.2 Data Sync Service**
```typescript
// lib/services/data-sync.ts
export class DataSyncService {
  async syncInfluencerData(influencerId: string) {
    const influencer = await prisma.influencer.findUnique({
      where: { id: influencerId },
      include: { socialPlatforms: true }
    })

    if (!influencer) return

    for (const platform of influencer.socialPlatforms) {
      try {
        const api = this.getPlatformAPI(platform.platform)
        const data = await api.getProfile(platform.username)
        
        await prisma.socialPlatform.update({
          where: { id: platform.id },
          data: {
            followers: data.followers_count,
            engagement: await api.getEngagementRate(platform.username),
            lastUpdated: new Date()
          }
        })
      } catch (error) {
        console.error(`Failed to sync ${platform.platform}:`, error)
      }
    }
  }

  async syncAllInfluencers() {
    const influencers = await prisma.influencer.findMany({
      where: { isActive: true },
      include: { socialPlatforms: true }
    })

    for (const influencer of influencers) {
      await this.syncInfluencerData(influencer.id)
      // Add delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
}
```

#### **5.3 Scheduled Jobs**
```typescript
// lib/cron-jobs.ts
import { CronJob } from 'cron'
import { DataSyncService } from './services/data-sync'

// Sync influencer data every 6 hours
const syncJob = new CronJob('0 */6 * * *', async () => {
  console.log('Starting influencer data sync...')
  const syncService = new DataSyncService()
  await syncService.syncAllInfluencers()
  console.log('Influencer data sync completed')
})

// Start the job
syncJob.start()
```

## 📊 Analytics & Reporting

### **Phase 6: Analytics Dashboard**

#### **6.1 Analytics API**
```typescript
// app/api/analytics/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const period = searchParams.get('period') || '30d'

  const [
    totalInfluencers,
    totalFollowers,
    avgEngagement,
    platformStats,
    categoryStats,
    revenueStats
  ] = await Promise.all([
    prisma.influencer.count({ where: { isActive: true } }),
    prisma.socialPlatform.aggregate({
      _sum: { followers: true }
    }),
    prisma.socialPlatform.aggregate({
      _avg: { engagement: true }
    }),
    getPlatformStatistics(),
    getCategoryStatistics(),
    getRevenueStatistics(period)
  ])

  return Response.json({
    overview: {
      totalInfluencers,
      totalFollowers: totalFollowers._sum.followers || 0,
      avgEngagement: avgEngagement._avg.engagement || 0
    },
    platformStats,
    categoryStats,
    revenueStats
  })
}
```

#### **6.2 Analytics Components**
```typescript
// app/admin/analytics/components/EngagementChart.tsx
'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function EngagementChart({ data }: { data: any[] }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Engagement Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="engagement" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
```

## 🔐 Authentication & Authorization

### **Phase 7: User Management**

#### **7.1 NextAuth Configuration**
```typescript
// lib/auth.ts
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          }
        }

        return null
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.role = user.role
      }
      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.role = token.role
      }
      return session
    }
  }
}
```

#### **7.2 Role-based Access Control**
```typescript
// lib/rbac.ts
export enum Role {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  INFLUENCER = 'influencer',
  CLIENT = 'client'
}

export const permissions = {
  [Role.ADMIN]: [
    'influencers:read',
    'influencers:write',
    'influencers:delete',
    'analytics:read',
    'users:read',
    'users:write',
    'settings:read',
    'settings:write'
  ],
  [Role.MODERATOR]: [
    'influencers:read',
    'influencers:write',
    'analytics:read',
    'contact-requests:read',
    'contact-requests:write'
  ],
  [Role.INFLUENCER]: [
    'profile:read',
    'profile:write',
    'analytics:read'
  ],
  [Role.CLIENT]: [
    'influencers:read',
    'contact:write'
  ]
}

export function hasPermission(userRole: Role, permission: string): boolean {
  return permissions[userRole]?.includes(permission) || false
}
```

## 💳 Payment & Booking System

### **Phase 8: Payment Integration**

#### **8.1 Booking System**
```typescript
// app/api/bookings/route.ts
export async function POST(request: Request) {
  const body = await request.json()
  
  // Create booking
  const booking = await prisma.booking.create({
    data: {
      influencerId: body.influencerId,
      clientId: body.clientId,
      campaignType: body.campaignType,
      budget: body.budget,
      timeline: body.timeline,
      status: 'pending_payment',
      requirements: body.requirements
    }
  })

  // Create payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: body.budget * 100, // Convert to cents
    currency: 'usd',
    metadata: {
      bookingId: booking.id,
      influencerId: body.influencerId
    }
  })

  return Response.json({
    bookingId: booking.id,
    clientSecret: paymentIntent.client_secret
  })
}
```

#### **8.2 Payment Webhooks**
```typescript
// app/api/webhooks/stripe/route.ts
export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return Response.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      await handlePaymentSuccess(paymentIntent)
      break
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent
      await handlePaymentFailure(failedPayment)
      break
  }

  return Response.json({ received: true })
}
```

## 🚀 Implementation Timeline

### **Week 1-2: Database & Core APIs**
- [ ] Set up Prisma schema
- [ ] Create database migrations
- [ ] Implement core API routes
- [ ] Update server actions to use database

### **Week 3-4: Admin Dashboard**
- [ ] Create admin authentication
- [ ] Build influencer management interface
- [ ] Implement CRUD operations
- [ ] Add contact request management

### **Week 5-6: Data Synchronization**
- [ ] Integrate social media APIs
- [ ] Implement data sync service
- [ ] Set up scheduled jobs
- [ ] Add real-time updates

### **Week 7-8: Analytics & Reporting**
- [ ] Build analytics dashboard
- [ ] Implement reporting features
- [ ] Add data visualization
- [ ] Create export functionality

### **Week 9-10: Payment & Booking**
- [ ] Integrate payment system
- [ ] Build booking workflow
- [ ] Implement payment webhooks
- [ ] Add invoice generation

### **Week 11-12: Testing & Optimization**
- [ ] Comprehensive testing
- [ ] Performance optimization
- [ ] Security audit
- [ ] Documentation

## 🔧 Technical Requirements

### **Dependencies to Add**
```json
{
  "dependencies": {
    "recharts": "^2.8.0",
    "cron": "^3.1.0",
    "stripe": "^14.0.0"
  }
}
```

**Note**: Most dependencies are already available:
- ✅ `@prisma/client` and `prisma` - Already installed
- ✅ `zod` and `@hookform/resolvers` - Already installed  
- ✅ `nodemailer` - Already installed for email system
- ✅ `next-intl` - Already installed for internationalization
- ✅ `framer-motion` - Already installed for animations
- ✅ `cloudinary` - Already installed for file uploads

### **Environment Variables**
```env
# Database (Already configured)
DATABASE_URL="mongodb://localhost:27017/dreamtoapp"

# Email (Already configured)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
ADMIN_EMAIL="admin@dreamtoapp.com"

# New variables to add:
# Stripe (for payment system)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Social Media APIs (for data sync)
INSTAGRAM_ACCESS_TOKEN="your-instagram-token"
TIKTOK_ACCESS_TOKEN="your-tiktok-token"
YOUTUBE_API_KEY="your-youtube-key"
```

## 📋 Success Metrics

### **Technical Metrics**
- [ ] Page load time < 2 seconds
- [ ] API response time < 500ms
- [ ] 99.9% uptime
- [ ] Zero security vulnerabilities

### **Business Metrics**
- [ ] 100+ active influencers
- [ ] 1000+ monthly email notifications
- [ ] 95%+ user satisfaction
- [ ] 50%+ conversion rate

## 🎯 Next Steps

### **Immediate Actions (Week 1)**
1. **Database Schema**: Add influencer models to existing Prisma schema
2. **Data Migration**: Create script to migrate mock data to database
3. **Server Actions**: Update existing actions to use database instead of mock data
4. **Email Integration**: Extend existing email system for influencer notifications

### **Short Term (Weeks 2-4)**
1. **Admin Dashboard**: Extend existing dashboard with influencer management
2. **Contact System**: Direct email notifications without database storage
3. **Authentication**: Extend current dashboard auth for admin roles
4. **Testing**: Comprehensive testing of all integrations

### **Medium Term (Weeks 5-8)**
1. **Social Media APIs**: Implement data synchronization
2. **Analytics**: Add influencer analytics to existing dashboard
3. **Payment System**: Integrate Stripe for booking system
4. **Performance**: Optimize database queries and caching

### **Long Term (Weeks 9-12)**
1. **Advanced Features**: AI recommendations, advanced filtering
2. **Mobile App**: Consider mobile application
3. **API Documentation**: Create comprehensive API docs
4. **Monitoring**: Set up production monitoring and alerts

## 🔒 Production Safety Considerations

Based on the **khalidnadish.yml** production safety protocol:

- **Zero Breaking Changes**: All existing functionality must remain intact
- **Gradual Migration**: Implement database integration without affecting current users
- **Backward Compatibility**: Maintain existing API contracts
- **Testing**: Comprehensive testing before any production deployment
- **Rollback Plan**: Ability to revert to mock data if issues arise

This plan leverages the existing infrastructure and follows production-safe practices to transform the current frontend-only implementation into a full-featured influencer management platform.
