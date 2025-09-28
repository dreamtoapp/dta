"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Save,
  Star,
  Users,
  TrendingUp,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { toast } from "sonner";
import { CATEGORIES, LOCATIONS, PLATFORM_OPTIONS, PLATFORM_DISPLAY_NAMES } from "@/lib/enums/influencerEnums";
import IconComponent from "@/app/[locale]/influencers/components/icons/IconComponent";

export default function NewInfluencerPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    bio: '',
    category: '',
    location: '',
    startingRate: 0,
    isVerified: false,
    isFeatured: false,
    isActive: true,
    socialPlatforms: PLATFORM_OPTIONS.map(platform => ({
      platform,
      username: '',
      followers: 0,
      engagement: 0,
      verified: false
    }))
  });


  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const updateSocialPlatform = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      socialPlatforms: prev.socialPlatforms.map((platform, i) =>
        i === index ? { ...platform, [field]: value } : platform
      )
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Validation
      if (!formData.name || !formData.username || !formData.email) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Mock save operation - will be replaced with real API call in Task 3.3
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success('Influencer created successfully!');
      router.push('/en/dashboard/influencers');
    } catch (error) {
      console.error('Error creating influencer:', error);
      toast.error('Failed to create influencer');
    } finally {
      setSaving(false);
    }
  };


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
            <h1 className="text-3xl font-bold">Add New Influencer</h1>
            <p className="text-muted-foreground">Create a new influencer profile</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Creating...' : 'Create Influencer'}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">User ID *</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="Enter user ID"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Enter influencer bio"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
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
                <Label htmlFor="startingRate">Starting Rate (USD)</Label>
                <Input
                  id="startingRate"
                  type="number"
                  value={formData.startingRate}
                  onChange={(e) => handleInputChange('startingRate', parseInt(e.target.value) || 0)}
                  placeholder="Enter starting rate"
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
              {formData.socialPlatforms.map((platform, index) => (
                <Card key={platform.platform} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <IconComponent
                        name={platform.platform as any}
                        size={24}
                        className="text-foreground"
                      />
                      <span className="font-medium">{PLATFORM_DISPLAY_NAMES[platform.platform]}</span>
                    </div>

                    <div className="space-y-2">
                      <Label>Username</Label>
                      <Input
                        value={platform.username}
                        onChange={(e) => updateSocialPlatform(index, 'username', e.target.value)}
                        placeholder="Enter username"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Followers</Label>
                      <Input
                        type="number"
                        value={platform.followers}
                        onChange={(e) => updateSocialPlatform(index, 'followers', parseInt(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Engagement (%)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={platform.engagement}
                        onChange={(e) => updateSocialPlatform(index, 'engagement', parseFloat(e.target.value) || 0)}
                        placeholder="0.0"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Verified</Label>
                      <Switch
                        checked={platform.verified}
                        onCheckedChange={(checked) => updateSocialPlatform(index, 'verified', checked)}
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


