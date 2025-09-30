"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  Save
} from 'lucide-react';
import { toast } from "sonner";
import { CATEGORIES, LOCATIONS, PLATFORM_OPTIONS, PLATFORM_DISPLAY_NAMES, LANGUAGES } from "@/lib/enums/influencerEnums";
import IconComponent from "@/app/[locale]/influencers/components/icons/IconComponent";
import { createInfluencer } from '../actions/createInfluencer';
import AddImage from "../../component/AddImage";
import { uploadAvatarImage, uploadCoverImage } from '../actions/uploadImage';

// Zod schema matching server action
const CreateInfluencerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  username: z.string().min(2, 'Username must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  avatar: z.string().optional(),
  coverImage: z.string().optional(),
  testimonialImage: z.string().optional(),
  category: z.enum(['LIFESTYLE', 'FASHION', 'BEAUTY', 'TECH', 'GAMING', 'FOOD', 'TRAVEL', 'FITNESS', 'BUSINESS', 'EDUCATION', 'ENTERTAINMENT', 'SPORTS', 'ART', 'MUSIC', 'PHOTOGRAPHY']),
  location: z.string().min(2, 'Location is required'),
  languages: z.array(z.string()).min(1, 'At least one language is required'),
  influencerRate: z.number().min(0, 'Influencer rate must be positive'),
  agencyRate: z.number().min(0, 'Agency rate must be positive'),
  socialPlatforms: z.array(z.object({
    platform: z.enum(['INSTAGRAM', 'TIKTOK', 'YOUTUBE', 'SNAPCHAT', 'FACEBOOK', 'TWITTER', 'LINKEDIN', 'WHATSAPP', 'TELEGRAM']),
    username: z.string().min(1, 'Platform username is required'),
    followers: z.number().min(0, 'Followers must be positive'),
    verified: z.boolean()
  })),
  isVerified: z.boolean(),
  isFeatured: z.boolean(),
  isActive: z.boolean()
});

type CreateInfluencerFormData = z.infer<typeof CreateInfluencerSchema>;

export default function NewInfluencerPage() {
  const router = useRouter();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(CreateInfluencerSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      phone: '',
      bio: '',
      avatar: '',
      coverImage: '',
      testimonialImage: '',
      category: 'LIFESTYLE',
      location: '',
      languages: ['Arabic'],
      influencerRate: 0,
      agencyRate: 0,
      isVerified: false,
      isFeatured: false,
      isActive: true,
      socialPlatforms: PLATFORM_OPTIONS.map(platform => ({
        platform: platform.toUpperCase() as any,
        username: '',
        followers: 0,
        verified: false
      }))
    }
  });


  const onSubmit = async (data: any) => {
    try {
      // Handle file uploads first
      let avatarUrl = '';
      let coverImageUrl = '';

      if (avatarFile) {
        const avatarFormData = new FormData();
        avatarFormData.append('file', avatarFile);
        avatarFormData.append('influencerName', data.name);
        avatarUrl = await uploadAvatarImage(avatarFormData);
      }

      if (coverImageFile) {
        const coverFormData = new FormData();
        coverFormData.append('file', coverImageFile);
        coverFormData.append('influencerName', data.name);
        coverImageUrl = await uploadCoverImage(coverFormData);
      }

      // Update data with uploaded URLs
      const formData = {
        ...data,
        avatar: avatarUrl || data.avatar,
        coverImage: coverImageUrl || data.coverImage
      };

      const result = await createInfluencer(formData);

      if (result.success) {
        toast.success(result.message);
        router.push('/dashboard/influencers');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error creating influencer:', error);
      toast.error('Failed to create influencer');
    }
  };


  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            type="button"
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
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            <Save className="h-4 w-4 mr-2" />
            {form.formState.isSubmitting ? 'Creating...' : 'Create Influencer'}
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
              label="Profile Avatar"
              placeholder="Upload profile image"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  {...form.register('name')}
                  placeholder="Enter full name"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">User ID *</Label>
                <Input
                  id="username"
                  {...form.register('username')}
                  placeholder="Enter user ID"
                />
                {form.formState.errors.username && (
                  <p className="text-sm text-red-500">{form.formState.errors.username.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register('email')}
                  placeholder="Enter email address"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  {...form.register('phone')}
                  placeholder="Enter phone number"
                />
                {form.formState.errors.phone && (
                  <p className="text-sm text-red-500">{form.formState.errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio *</Label>
              <Textarea
                id="bio"
                {...form.register('bio')}
                placeholder="Enter influencer bio"
                rows={3}
              />
              {form.formState.errors.bio && (
                <p className="text-sm text-red-500">{form.formState.errors.bio.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={form.watch('category')} onValueChange={(value) => form.setValue('category', value as any)}>
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
                {form.formState.errors.category && (
                  <p className="text-sm text-red-500">{form.formState.errors.category.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Select value={form.watch('location')} onValueChange={(value) => form.setValue('location', value)}>
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
                {form.formState.errors.location && (
                  <p className="text-sm text-red-500">{form.formState.errors.location.message}</p>
                )}
              </div>
            </div>

            {/* Cover Image Upload */}
            <AddImage
              onImageChange={setCoverImageFile}
              selectedImage={coverImageFile}
              label="Cover Image"
              placeholder="Upload cover image"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="influencerRate">Influencer Rate (USD)</Label>
                <Input
                  id="influencerRate"
                  type="number"
                  {...form.register('influencerRate', { valueAsNumber: true })}
                  placeholder="Enter influencer rate"
                />
                {form.formState.errors.influencerRate && (
                  <p className="text-sm text-red-500">{form.formState.errors.influencerRate.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="agencyRate">Agency Rate (USD)</Label>
                <Input
                  id="agencyRate"
                  type="number"
                  {...form.register('agencyRate', { valueAsNumber: true })}
                  placeholder="Enter agency rate"
                />
                {form.formState.errors.agencyRate && (
                  <p className="text-sm text-red-500">{form.formState.errors.agencyRate.message}</p>
                )}
              </div>
            </div>

            {/* Languages Field */}
            <div className="space-y-2">
              <Label>Languages *</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {LANGUAGES.map((language) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox
                      id={language}
                      checked={form.watch('languages').includes(language)}
                      onCheckedChange={(checked) => {
                        const currentLanguages = form.getValues('languages');
                        if (checked) {
                          form.setValue('languages', [...currentLanguages, language]);
                        } else {
                          form.setValue('languages', currentLanguages.filter(l => l !== language));
                        }
                      }}
                    />
                    <Label htmlFor={language} className="text-sm">{language}</Label>
                  </div>
                ))}
              </div>
              {form.formState.errors.languages && (
                <p className="text-sm text-red-500">{form.formState.errors.languages.message}</p>
              )}
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
              {form.watch('socialPlatforms').map((platform, index) => (
                <Card key={platform.platform} className="p-4">
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
                          const platforms = form.getValues('socialPlatforms');
                          platforms[index].username = e.target.value;
                          form.setValue('socialPlatforms', platforms);
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
                          const platforms = form.getValues('socialPlatforms');
                          platforms[index].followers = parseInt(e.target.value) || 0;
                          form.setValue('socialPlatforms', platforms);
                        }}
                        placeholder="0"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Verified</Label>
                      <Switch
                        checked={platform.verified}
                        onCheckedChange={(checked) => {
                          const platforms = form.getValues('socialPlatforms');
                          platforms[index].verified = checked;
                          form.setValue('socialPlatforms', platforms);
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
    </form>
  );
}


