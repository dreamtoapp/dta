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
  Settings
} from 'lucide-react';
import { getDashboardStats } from '../action/action';
import { toast } from "sonner";

export default function InfluencersPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const result = await getDashboardStats();
      setData(result);
    } catch (error) {
      console.error('Error loading influencer data:', error);
      toast.error('Failed to load influencer data');
    } finally {
      setLoading(false);
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

  // Mock data for now - will be replaced with real data in Task 3.1
  const mockInfluencers = [
    {
      id: '1',
      name: 'Sarah Al-Rashid',
      username: 'sarah_lifestyle',
      category: 'Lifestyle',
      location: 'Riyadh, Saudi Arabia',
      totalFollowers: 291000,
      avgEngagement: 4.4,
      startingRate: 800,
      isVerified: true,
      isFeatured: true,
      status: 'ACTIVE'
    },
    {
      id: '2',
      name: 'Ahmed TechGuru',
      username: 'ahmed_tech',
      category: 'Tech',
      location: 'Dubai, UAE',
      totalFollowers: 342000,
      avgEngagement: 5.5,
      startingRate: 1200,
      isVerified: true,
      isFeatured: false,
      status: 'ACTIVE'
    },
    {
      id: '3',
      name: 'Fatima Fashion',
      username: 'fatima_style',
      category: 'Fashion',
      location: 'Jeddah, Saudi Arabia',
      totalFollowers: 487000,
      avgEngagement: 5.4,
      startingRate: 1500,
      isVerified: true,
      isFeatured: true,
      status: 'PENDING_VERIFICATION'
    }
  ];

  const filteredInfluencers = mockInfluencers.filter((influencer) => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || influencer.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || influencer.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(mockInfluencers.map(inf => inf.category))];

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
            onClick={() => router.push('/en/dashboard/influencers/new')}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Influencer
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card/60 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Influencers</p>
                <p className="text-3xl font-bold text-foreground">{mockInfluencers.length}</p>
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
                  {mockInfluencers.reduce((sum, inf) => sum + inf.totalFollowers, 0).toLocaleString()}
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
                <p className="text-sm font-medium text-muted-foreground mb-1">Avg Engagement</p>
                <p className="text-3xl font-bold text-foreground">
                  {(mockInfluencers.reduce((sum, inf) => sum + inf.avgEngagement, 0) / mockInfluencers.length).toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">Across all platforms</p>
              </div>
              <div className="h-12 w-12 bg-[#0d3ad7]/10 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-[#0d3ad7]" />
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
                  {mockInfluencers.filter(inf => inf.isVerified).length}
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
                  <div className="h-12 w-12 bg-gradient-to-br from-[#0d3ad7] to-[#99e4ff] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {influencer.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      {influencer.name}
                      {influencer.isVerified && (
                        <Star className="h-3 w-3 text-blue-500 fill-current" />
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">@{influencer.username}</p>
                  </div>
                </div>
                <Badge className={`${getStatusColor(influencer.status)} text-xs`}>
                  {influencer.status.replace('_', ' ')}
                </Badge>
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
                  <span className="text-sm text-muted-foreground">Engagement</span>
                  <span className="text-sm font-medium">{influencer.avgEngagement}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Starting Rate</span>
                  <span className="text-sm font-medium">${influencer.startingRate}</span>
                </div>
              </div>

              {influencer.isFeatured && (
                <div className="mb-4">
                  <Badge variant="secondary" className="text-xs">Featured</Badge>
                </div>
              )}

              <div className="flex items-center gap-2 pt-4 border-t">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push(`/en/dashboard/influencers/${influencer.id}`)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push(`/en/dashboard/influencers/${influencer.id}`)}
                >
                  <Settings className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Contact
                </Button>
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
