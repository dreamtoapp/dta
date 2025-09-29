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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { PLATFORM_DISPLAY_NAMES, PLATFORM_OPTIONS, CATEGORIES, LOCATIONS } from "@/lib/enums/influencerEnums";
import IconComponent from "@/app/[locale]/influencers/components/icons/IconComponent";
import { getInfluencerById } from "../actions/getInfluencerById";
import { updateInfluencer } from "../actions/updateInfluencer";
import AddImage from "@/components/ui/AddImage";
import { uploadAvatarImage, uploadCoverImage } from "../actions/uploadImage";

export default function InfluencerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [influencer, setInfluencer] = useState<any>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

  useEffect(() => {
    loadInfluencerData();
  }, [params.id]);

  const loadInfluencerData = async () => {
    try {
      setLoading(true);

      if (!params.id || typeof params.id !== 'string') {
        toast.error('Invalid influencer ID');
        router.push('/dashboard/influencers');
        return;
      }

      const influencerData = await getInfluencerById(params.id);

      if (!influencerData) {
        toast.error('Influencer not found');
        router.push('/dashboard/influencers');
        return;
      }

      // Ensure all platforms are present in the socialPlatforms array
      const allPlatforms = PLATFORM_OPTIONS.map(platform => {
        const existingPlatform = influencerData.socialPlatforms.find(p => p.platform === platform.toUpperCase());
        return existingPlatform || {
          platform: platform.toUpperCase(),
          username: '',
          followers: 0,
          isVerified: false,
          isActive: true
        };
      });

      setInfluencer({
        ...influencerData,
        socialPlatforms: allPlatforms
      });
    } catch (error) {
      console.error('Error loading influencer:', error);
      toast.error('Failed to load influencer data');
      router.push('/dashboard/influencers');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      if (!influencer) {
        toast.error('No influencer data to save');
        return;
      }

      // Handle file uploads first
      let avatarUrl = influencer.avatar;
      let coverImageUrl = influencer.coverImage;

      if (avatarFile) {
        const avatarFormData = new FormData();
        avatarFormData.append('file', avatarFile);
        avatarFormData.append('influencerName', influencer.name);
        avatarUrl = await uploadAvatarImage(avatarFormData);
      }

      if (coverImageFile) {
        const coverFormData = new FormData();
        coverFormData.append('file', coverImageFile);
        coverFormData.append('influencerName', influencer.name);
        coverImageUrl = await uploadCoverImage(coverFormData);
      }

      // Update influencer data with new URLs
      const updatedInfluencer = {
        ...influencer,
        avatar: avatarUrl,
        coverImage: coverImageUrl
      };

      const result = await updateInfluencer(updatedInfluencer);

      if (result.success) {
        toast.success('Influencer updated successfully!');
        // Clear file states
        setAvatarFile(null);
        setCoverImageFile(null);
        // Reload the data to get the latest changes
        await loadInfluencerData();
      } else {
        toast.error(result.message || 'Failed to update influencer');
        if (result.errors) {
          console.error('Validation errors:', result.errors);
        }
      }
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
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Avatar Upload */}
            <AddImage
              onImageChange={setAvatarFile}
              selectedImage={avatarFile}
              currentImageUrl={influencer.avatar}
              label="Profile Avatar"
              placeholder="Upload profile image"
            />

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
                <Label htmlFor="username">User ID</Label>
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
                <Select value={influencer.category} onValueChange={(value) => setInfluencer({ ...influencer, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category.toUpperCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select value={influencer.location} onValueChange={(value) => setInfluencer({ ...influencer, location: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {LOCATIONS.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="referenceId">Reference ID</Label>
                <Input
                  id="referenceId"
                  value={influencer.referenceId}
                  onChange={(e) => setInfluencer({ ...influencer, referenceId: e.target.value })}
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

            {/* Cover Image Upload */}
            <AddImage
              onImageChange={setCoverImageFile}
              selectedImage={coverImageFile}
              currentImageUrl={influencer.coverImage}
              label="Cover Image"
              placeholder="Upload cover image"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="influencerRate">Influencer Rate (USD)</Label>
                <Input
                  id="influencerRate"
                  type="number"
                  value={influencer.influencerRate}
                  onChange={(e) => setInfluencer({ ...influencer, influencerRate: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="agencyRate">Agency Rate (USD)</Label>
                <Input
                  id="agencyRate"
                  type="number"
                  value={influencer.agencyRate}
                  onChange={(e) => setInfluencer({ ...influencer, agencyRate: parseInt(e.target.value) })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Platforms */}
        <Card>
          <CardHeader>
            <CardTitle>Social Platforms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {influencer.socialPlatforms.map((platform: any, index: number) => (
                <Card key={index} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <IconComponent
                        name={platform.platform.toLowerCase() as any}
                        size={24}
                        className="text-foreground"
                      />
                      <span className="font-medium">{PLATFORM_DISPLAY_NAMES[platform.platform.toLowerCase() as keyof typeof PLATFORM_DISPLAY_NAMES]}</span>
                    </div>

                    <div className="space-y-2">
                      <Label>Username</Label>
                      <Input
                        value={platform.username}
                        onChange={(e) => {
                          const platforms = [...influencer.socialPlatforms];
                          platforms[index].username = e.target.value;
                          setInfluencer({ ...influencer, socialPlatforms: platforms });
                        }}
                        placeholder="Enter username"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Followers</Label>
                      <Input
                        type="number"
                        value={platform.followers}
                        onChange={(e) => {
                          const platforms = [...influencer.socialPlatforms];
                          platforms[index].followers = parseInt(e.target.value) || 0;
                          // Recalculate total followers
                          const totalFollowers = platforms.reduce((total, platform) => total + platform.followers, 0);
                          setInfluencer({ ...influencer, socialPlatforms: platforms, totalFollowers });
                        }}
                        placeholder="0"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Verified</Label>
                      <Switch
                        checked={platform.isVerified}
                        onCheckedChange={(checked) => {
                          const platforms = [...influencer.socialPlatforms];
                          platforms[index].isVerified = checked;
                          setInfluencer({ ...influencer, socialPlatforms: platforms });
                        }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


