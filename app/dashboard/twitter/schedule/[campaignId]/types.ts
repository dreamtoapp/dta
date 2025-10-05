export interface TwitterPost {
  id: string;
  day: number;
  slot: 'AM' | 'PM';
  ksaTimeLabel: string;
  targetAudience: string;
  content: string;
  mediaUrls: string[];
  mediaAlt?: string;
  useOgFallback: boolean;
  scheduledAtKsa: string;
  status: 'DRAFT' | 'APPROVED' | 'POSTED' | 'FAILED';
  postedAt?: string;
  tweetId?: string;
  error?: string;
  source: string;
  cycle: number;
  campaign: {
    id: string;
    name: string;
    startDate: string;
    status: string;
  };
}

export interface TwitterCampaign {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  totalDays: number;
  amTime: string;
  pmTime: string;
  ogImageUrl?: string;
  status: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface PostFilters {
  status: string;
  search: string;
}
