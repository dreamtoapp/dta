"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Save,
  Star,
  Users,
  TrendingUp,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { toast } from "sonner";

export default function InfluencerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [influencer, setInfluencer] = useState<any>(null);

  useEffect(() => {
    loadInfluencerData();
  }, [params.id]);

  const loadInfluencerData = async () => {
    try {
      setLoading(true);
      // Mock data for now - will be replaced with real API call in Task 3.1
      const mockInfluencer = {
        id: params.id,
        name: 'Sarah Al-Rashid',
        username: 'sarah_lifestyle',
        email: 'sarah@example.com',
        phone: '+966501234567',
        bio: 'Lifestyle influencer sharing daily routines, fashion tips, and travel experiences from Saudi Arabia.',
        category: 'Lifestyle',
        location: 'Riyadh, Saudi Arabia',
        languages: ['Arabic', 'English'],
        totalFollowers: 291000,
        avgEngagement: 4.4,
        startingRate: 800,
        isVerified: true,
        isFeatured: true,
        isActive: true,
        status: 'ACTIVE',
        socialPlatforms: [
          {
            platform: 'instagram',
            username: 'sarah_lifestyle',
            followers: 125000,
            engagement: 4.2,
            verified: true
          },
          {
            platform: 'tiktok',
            username: 'sarah_tiktok',
            followers: 89000,
            engagement: 5.1,
            verified: false
          },
          {
            platform: 'youtube',
            username: 'sarah_lifestyle',
            followers: 45000,
            engagement: 3.8,
            verified: true
          },
          {
            platform: 'snapchat',
            username: 'sarah_snap',
            followers: 32000,
            engagement: 4.5,
            verified: false
          }
        ],
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-09-27T14:20:00Z'
      };

      setInfluencer(mockInfluencer);
    } catch (error) {
      console.error('Error loading influencer:', error);
      toast.error('Failed to load influencer data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // Mock save operation - will be replaced with real API call in Task 3.3
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Influencer updated successfully!');
    } catch (error) {
      console.error('Error saving influencer:', error);
      toast.error('Failed to save influencer data');
    } finally {
      setSaving(false);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return '📸';
      case 'tiktok': return '🎵';
      case 'youtube': return '📺';
      case 'snapchat': return '👻';
      case 'facebook': return '📘';
      case 'twitter': return '🐦';
      case 'linkedin': return '💼';
      default: return '🌐';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 bg-muted/50 rounded animate-pulse"></div>
          <div className="h-8 w-64 bg-muted/50 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-64 bg-muted/50 rounded-lg animate-pulse"></div>
            <div className="h-32 bg-muted/50 rounded-lg animate-pulse"></div>
          </div>
          <div className="space-y-6">
            <div className="h-48 bg-muted/50 rounded-lg animate-pulse"></div>
            <div className="h-32 bg-muted/50 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!influencer) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Influencer not found</h2>
        <p className="text-muted-foreground mb-4">The influencer you're looking for doesn't exist.</p>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              {influencer.name}
              {influencer.isVerified && (
                <Star className="h-6 w-6 text-blue-500 fill-current" />
              )}
              {influencer.isFeatured && (
                <Badge variant="secondary">Featured</Badge>
              )}
            </h1>
            <p className="text-muted-foreground">@{influencer.username}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            View Public Profile
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={influencer.name}
                    onChange={(e) => setInfluencer({ ...influencer, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={influencer.username}
                    onChange={(e) => setInfluencer({ ...influencer, username: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={influencer.email}
                    onChange={(e) => setInfluencer({ ...influencer, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={influencer.phone}
                    onChange={(e) => setInfluencer({ ...influencer, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={influencer.bio}
                  onChange={(e) => setInfluencer({ ...influencer, bio: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={influencer.category}
                    onChange={(e) => setInfluencer({ ...influencer, category: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={influencer.location}
                    onChange={(e) => setInfluencer({ ...influencer, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startingRate">Starting Rate (USD)</Label>
                  <Input
                    id="startingRate"
                    type="number"
                    value={influencer.startingRate}
                    onChange={(e) => setInfluencer({ ...influencer, startingRate: parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <div className="flex items-center gap-2">
                    <Badge className={influencer.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {influencer.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Platforms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Social Platforms
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Platform
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {influencer.socialPlatforms.map((platform: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{getPlatformIcon(platform.platform)}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium capitalize">{platform.platform}</span>
                          {platform.verified && (
                            <Star className="h-4 w-4 text-blue-500 fill-current" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">@{platform.username}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{platform.followers.toLocaleString()} followers</p>
                      <p className="text-sm text-muted-foreground">{platform.engagement}% engagement</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-[#0d3ad7]" />
                  <span className="text-sm font-medium">Total Followers</span>
                </div>
                <span className="font-bold">{influencer.totalFollowers.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-[#10b981]" />
                  <span className="text-sm font-medium">Avg Engagement</span>
                </div>
                <span className="font-bold">{influencer.avgEngagement}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-[#f59e0b]" />
                  <span className="text-sm font-medium">Starting Rate</span>
                </div>
                <span className="font-bold">${influencer.startingRate}</span>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Verified</Label>
                  <p className="text-sm text-muted-foreground">Mark as verified influencer</p>
                </div>
                <Switch
                  checked={influencer.isVerified}
                  onCheckedChange={(checked) => setInfluencer({ ...influencer, isVerified: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Featured</Label>
                  <p className="text-sm text-muted-foreground">Show in featured section</p>
                </div>
                <Switch
                  checked={influencer.isFeatured}
                  onCheckedChange={(checked) => setInfluencer({ ...influencer, isFeatured: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Active</Label>
                  <p className="text-sm text-muted-foreground">Enable/disable influencer</p>
                </div>
                <Switch
                  checked={influencer.isActive}
                  onCheckedChange={(checked) => setInfluencer({ ...influencer, isActive: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Meta Information */}
          <Card>
            <CardHeader>
              <CardTitle>Meta Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Created:</span>
                <span>{new Date(influencer.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Updated:</span>
                <span>{new Date(influencer.updatedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Languages:</span>
                <span>{influencer.languages.join(', ')}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


