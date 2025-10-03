"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Users,
  Search,
  Filter,
  Plus,
  Star,
  TrendingUp,
  Eye,
  MessageSquare,
  RefreshCw,
  Settings,
  Quote
} from 'lucide-react';
import { getDashboardStats } from '../action/action';
import { getInfluencers, InfluencerListItem } from './actions/getInfluencers';
import { toggleInfluencerVerification } from './actions/toggleVerification';
import { PLATFORM_DISPLAY_NAMES } from "@/lib/enums/influencerEnums";
import IconComponent from "@/app/[locale]/influencers/components/icons/IconComponent";
import Image from "next/image";
import { toast } from "sonner";

export default function InfluencersPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [influencers, setInfluencers] = useState<InfluencerListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsResult, influencersResult] = await Promise.all([
        getDashboardStats(),
        getInfluencers()
      ]);

      setData(statsResult);

      if (influencersResult.success && influencersResult.data) {
        setInfluencers(influencersResult.data);
      } else {
        toast.error(influencersResult.message || 'Failed to load influencers');
      }
    } catch (error) {
      console.error('Error loading influencer data:', error);
      toast.error('Failed to load influencer data');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVerification = async (influencerId: string) => {
    try {
      setVerifying(influencerId);
      const result = await toggleInfluencerVerification(influencerId);

      if (result.success) {
        // Update the local state
        setInfluencers(prev => prev.map(inf =>
          inf.id === influencerId
            ? { ...inf, isVerified: result.isVerified ?? false }
            : inf
        ));
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error toggling verification:', error);
      toast.error('Failed to update verification status');
    } finally {
      setVerifying(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'INACTIVE': return 'bg-gray-100 text-gray-800';
      case 'PENDING_VERIFICATION': return 'bg-yellow-100 text-yellow-800';
      case 'SUSPENDED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInfluencers = influencers.filter((influencer) => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || influencer.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || influencer.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(influencers.map(inf => inf.category))];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Influencer Management</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-muted rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-24"></div>
                    <div className="h-3 bg-muted rounded w-16"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded w-full"></div>
                  <div className="h-3 bg-muted rounded w-full"></div>
                  <div className="h-3 bg-muted rounded w-3/4"></div>
                </div>
                <div className="flex gap-2 pt-4 border-t">
                  <div className="h-8 bg-muted rounded flex-1"></div>
                  <div className="h-8 bg-muted rounded flex-1"></div>
                  <div className="h-8 bg-muted rounded flex-1"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Influencer Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor your influencer network ({filteredInfluencers.length} total)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={loadData}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button
            onClick={() => router.push('/dashboard/influencers/new')}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Influencer
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-card/60 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Influencers</p>
                <p className="text-3xl font-bold text-foreground">{influencers.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Active profiles</p>
              </div>
              <div className="h-12 w-12 bg-[#ff6b6b]/10 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-[#ff6b6b]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/60 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Followers</p>
                <p className="text-3xl font-bold text-foreground">
                  {influencers.reduce((sum, inf) => sum + inf.totalFollowers, 0).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Combined reach</p>
              </div>
              <div className="h-12 w-12 bg-[#99e4ff]/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-[#99e4ff]" />
              </div>
            </div>
          </CardContent>
        </Card>


        <Card className="bg-card/60 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Verified</p>
                <p className="text-3xl font-bold text-foreground">
                  {influencers.filter(inf => inf.isVerified).length}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Verified profiles</p>
              </div>
              <div className="h-12 w-12 bg-[#10b981]/10 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-[#10b981]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search influencers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="PENDING_VERIFICATION">Pending</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="SUSPENDED">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Influencers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInfluencers.map((influencer) => (
          <Card key={influencer.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-gradient-to-br from-[#0d3ad7] to-[#99e4ff] flex items-center justify-center">
                    {influencer.avatar ? (
                      <Image
                        src={influencer.avatar}
                        alt={influencer.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-sm">
                        {influencer.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      {influencer.name}
                      {influencer.isVerified && (
                        <Star className="h-3 w-3 text-blue-500 fill-current" />
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">@{influencer.username}</p>
                    <p className="text-xs text-muted-foreground mt-1">{influencer.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Category</span>
                  <span className="text-sm font-medium">{influencer.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Location</span>
                  <span className="text-sm font-medium">{influencer.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Followers</span>
                  <span className="text-sm font-medium">{influencer.totalFollowers.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Starting Rate</span>
                  <span className="text-sm font-medium">${influencer.influencerRate}</span>
                </div>
              </div>

              {influencer.isFeatured && (
                <div className="mb-4">
                  <Badge variant="secondary" className="text-xs">Featured</Badge>
                </div>
              )}

              {/* Social Platforms */}
              <div className="mb-4">
                <div className="text-sm text-muted-foreground mb-2">Social Platforms</div>
                <div className="flex flex-wrap gap-2">
                  {influencer.socialPlatforms
                    ?.filter(platform => platform.followers > 0)
                    .map((platform, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="flex items-center gap-1 text-xs"
                      >
                        <IconComponent
                          name={platform.platform.toLowerCase() as any}
                          className="h-3 w-3"
                        />
                        <span>
                          {PLATFORM_DISPLAY_NAMES[platform.platform.toLowerCase() as keyof typeof PLATFORM_DISPLAY_NAMES]}
                        </span>
                        <span className="text-muted-foreground">
                          {platform.followers.toLocaleString()}
                        </span>
                      </Badge>
                    ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t flex-wrap">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push(`/dashboard/influencers/${influencer.id}/view`)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push(`/dashboard/influencers/${influencer.id}`)}
                >
                  <Settings className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Contact
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => alert('Testimonial feature coming soon!')}
                >
                  <Quote className="h-3 w-3 mr-1" />
                  Testimonial
                </Button>
              </div>

              {/* Verification Toggle */}
              <div className="flex items-center justify-between pt-3 border-t mt-3">
                <span className="text-sm text-muted-foreground">Verification</span>
                <button
                  onClick={() => handleToggleVerification(influencer.id)}
                  disabled={verifying === influencer.id}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-colors ${influencer.isVerified
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    } ${verifying === influencer.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <Star className={`h-3 w-3 ${influencer.isVerified ? 'fill-current' : ''}`} />
                  {influencer.isVerified ? 'Verified' : 'Unverified'}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInfluencers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No influencers found</h3>
              <p>No influencers match your current filters.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
