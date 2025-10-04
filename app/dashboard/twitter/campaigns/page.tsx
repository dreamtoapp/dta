"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, Plus, Play, Pause, Check, X, Calendar, Clock } from 'lucide-react';

interface TwitterCampaign {
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
  _count: {
    posts: number;
  };
}

export default function TwitterCampaignsPage() {
  const [campaigns, setCampaigns] = useState<TwitterCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<TwitterCampaign | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    totalDays: 45,
    amTime: '13:00',
    pmTime: '20:30',
    ogImageUrl: '',
  });

  // Load campaigns
  const loadCampaigns = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/twitter/campaigns');
      const data = await response.json();

      if (data.success) {
        setCampaigns(data.data);
      } else {
        toast.error(`Failed to load campaigns: ${data.error}`);
      }
    } catch (error) {
      toast.error('Failed to load campaigns');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  // Create campaign
  const createCampaign = async () => {
    try {
      const response = await fetch('/api/twitter/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Campaign created successfully');
        setShowCreateDialog(false);
        setFormData({
          name: '',
          description: '',
          startDate: '',
          totalDays: 45,
          amTime: '13:00',
          pmTime: '20:30',
          ogImageUrl: '',
        });
        loadCampaigns();
      } else {
        toast.error(`Failed to create campaign: ${result.error}`);
      }
    } catch (error) {
      toast.error('Failed to create campaign');
      console.error(error);
    }
  };

  // Update campaign
  const updateCampaign = async (id: string, data: Partial<TwitterCampaign>) => {
    try {
      const response = await fetch('/api/twitter/campaigns', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...data }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Campaign updated successfully');
        setEditingCampaign(null);
        loadCampaigns();
      } else {
        toast.error(`Failed to update campaign: ${result.error}`);
      }
    } catch (error) {
      toast.error('Failed to update campaign');
      console.error(error);
    }
  };

  // Toggle campaign status
  const toggleCampaignStatus = async (campaign: TwitterCampaign) => {
    if (campaign.status === 'ACTIVE') {
      await updateCampaign(campaign.id, { status: 'PAUSED', isActive: false });
    } else {
      await updateCampaign(campaign.id, { status: 'ACTIVE', isActive: true });
    }
  };

  // Get status badge
  const getStatusBadge = (campaign: TwitterCampaign) => {
    if (campaign.isActive) {
      return <Badge variant="default" className="bg-green-500">Active</Badge>;
    }
    switch (campaign.status) {
      case 'DRAFT':
        return <Badge variant="secondary">Draft</Badge>;
      case 'PAUSED':
        return <Badge variant="outline">Paused</Badge>;
      case 'COMPLETED':
        return <Badge variant="default" className="bg-blue-500">Completed</Badge>;
      default:
        return <Badge variant="secondary">{campaign.status}</Badge>;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Twitter Campaigns</h1>
          <p className="text-muted-foreground">
            Create and manage your Twitter posting campaigns
          </p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
              <DialogDescription>
                Set up a new Twitter posting campaign with custom schedule and settings.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Campaign Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., DreamToApp Q1 2025"
                  />
                </div>
                <div>
                  <Label htmlFor="startDate">Start Date (KSA)</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your campaign goals..."
                  className="min-h-[80px]"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="totalDays">Total Days</Label>
                  <Input
                    id="totalDays"
                    type="number"
                    min="1"
                    max="90"
                    value={formData.totalDays}
                    onChange={(e) => setFormData({ ...formData, totalDays: parseInt(e.target.value) || 45 })}
                  />
                </div>
                <div>
                  <Label htmlFor="amTime">AM Time (KSA)</Label>
                  <Input
                    id="amTime"
                    type="time"
                    value={formData.amTime}
                    onChange={(e) => setFormData({ ...formData, amTime: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="pmTime">PM Time (KSA)</Label>
                  <Input
                    id="pmTime"
                    type="time"
                    value={formData.pmTime}
                    onChange={(e) => setFormData({ ...formData, pmTime: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="ogImageUrl">OG Image URL (Optional)</Label>
                <Input
                  id="ogImageUrl"
                  value={formData.ogImageUrl}
                  onChange={(e) => setFormData({ ...formData, ogImageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={createCampaign}
                  disabled={!formData.name || !formData.startDate}
                >
                  Create Campaign
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Campaigns Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    <CardDescription>
                      {campaign.description || 'No description'}
                    </CardDescription>
                  </div>
                  {getStatusBadge(campaign)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(campaign.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{campaign.totalDays} days</span>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <div>AM: {campaign.amTime} | PM: {campaign.pmTime}</div>
                  <div>{campaign._count.posts} posts</div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={campaign.isActive ? "destructive" : "default"}
                    onClick={() => toggleCampaignStatus(campaign)}
                  >
                    {campaign.isActive ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Activate
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.location.href = `/dashboard/twitter/schedule?campaign=${campaign.id}`}
                  >
                    Manage Posts
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {campaigns.length === 0 && (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No campaigns found. Create your first campaign to get started.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
