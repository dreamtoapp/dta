"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Star,
  Users,
  TrendingUp,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit
} from 'lucide-react';
import { toast } from "sonner";
import { PLATFORM_DISPLAY_NAMES } from "@/lib/enums/influencerEnums";
import IconComponent from "@/app/[locale]/influencers/components/icons/IconComponent";
import { getInfluencerById } from "../../actions/getInfluencerById";
import Image from "next/image";

export default function InfluencerViewPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [influencer, setInfluencer] = useState<any>(null);

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

      setInfluencer(influencerData);
    } catch (error) {
      console.error('Error loading influencer:', error);
      toast.error('Failed to load influencer data');
      router.push('/dashboard/influencers');
    } finally {
      setLoading(false);
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
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-gradient-to-br from-[#0d3ad7] to-[#99e4ff] flex items-center justify-center">
              {influencer.avatar ? (
                <Image
                  src={influencer.avatar}
                  alt={influencer.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-bold text-lg">
                  {influencer.name.split(' ').map((n: string) => n[0]).join('')}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                {influencer.name}
                {influencer.isVerified && (
                  <Star className="h-5 w-5 text-blue-500 fill-current" />
                )}
              </h1>
              <p className="text-muted-foreground">@{influencer.username}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => router.push(`/dashboard/influencers/${influencer.id}`)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    Email
                  </div>
                  <p className="font-medium">{influencer.email}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    Phone
                  </div>
                  <p className="font-medium">{influencer.phone || 'Not provided'}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    Category
                  </div>
                  <Badge variant="secondary">{influencer.category}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    Location
                  </div>
                  <p className="font-medium">{influencer.location}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  Languages
                </div>
                <div className="flex flex-wrap gap-2">
                  {influencer.languages.map((language: string, index: number) => (
                    <Badge key={index} variant="outline">{language}</Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Bio</div>
                <p className="text-sm leading-relaxed">{influencer.bio}</p>
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
                          className="h-5 w-5"
                        />
                        <span className="font-medium">
                          {PLATFORM_DISPLAY_NAMES[platform.platform.toLowerCase() as keyof typeof PLATFORM_DISPLAY_NAMES]}
                        </span>
                        {platform.isVerified && (
                          <Star className="h-3 w-3 text-blue-500 fill-current" />
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Username</div>
                        <p className="font-medium">{platform.username || 'Not set'}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Followers</div>
                        <p className="font-medium text-lg">{platform.followers.toLocaleString()}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Total Followers</span>
                </div>
                <span className="font-bold text-lg">{influencer.totalFollowers.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Influencer Rate</span>
                </div>
                <span className="font-bold">${influencer.influencerRate}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Agency Rate</span>
                </div>
                <span className="font-bold">${influencer.agencyRate}</span>
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Status</span>
                <Badge className={influencer.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                  {influencer.status.replace('_', ' ')}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Verified</span>
                <Badge variant={influencer.isVerified ? 'default' : 'secondary'}>
                  {influencer.isVerified ? 'Yes' : 'No'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Featured</span>
                <Badge variant={influencer.isFeatured ? 'default' : 'secondary'}>
                  {influencer.isFeatured ? 'Yes' : 'No'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Active</span>
                <Badge variant={influencer.isActive ? 'default' : 'secondary'}>
                  {influencer.isActive ? 'Yes' : 'No'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Created</span>
                </div>
                <span className="text-sm">{new Date(influencer.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Updated</span>
                </div>
                <span className="text-sm">{new Date(influencer.updatedAt).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Reference ID</span>
                <span className="text-sm font-mono">{influencer.referenceId}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
