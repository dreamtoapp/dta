"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, Plus, Check, X, Send, Eye, EyeOff, ArrowRight, Edit, Trash } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TwitterPost {
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
  _count?: {
    posts: number;
  };
  postStats?: {
    total: number;
    posted: number;
    remaining: number;
    draft: number;
    approved: number;
    failed: number;
  };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function TwitterSchedulePage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<TwitterCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    ogImageUrl: '',
  });
  const [editingCampaign, setEditingCampaign] = useState<TwitterCampaign | null>(null);
  const [editCampaignData, setEditCampaignData] = useState({
    name: '',
    description: '',
    startDate: '',
    totalDays: 45,
    amTime: '13:00',
    pmTime: '20:30',
    ogImageUrl: '',
    status: 'DRAFT' as 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<TwitterCampaign | null>(null);

  // Create new campaign
  const handleCreateCampaign = async () => {
    if (!newCampaign.name) {
      toast.error('Please fill in campaign name');
      return;
    }

    try {
      const response = await fetch('/api/twitter/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newCampaign,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Campaign created successfully');
        setNewCampaign({
          name: '',
          description: '',
          ogImageUrl: '',
        });
        setIsDialogOpen(false); // Close the dialog
        loadCampaigns();
      } else {
        toast.error(data.error || 'Failed to create campaign');
      }
    } catch (error) {
      toast.error('Error creating campaign');
    }
  };

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

  // Navigate to campaign posts
  const handleCampaignClick = (campaignId: string) => {
    router.push(`/dashboard/twitter/schedule/${campaignId}`);
  };

  // Start editing campaign
  const startEditCampaign = (campaign: TwitterCampaign) => {
    setEditingCampaign(campaign);
    setEditCampaignData({
      name: campaign.name,
      description: campaign.description || '',
      startDate: campaign.startDate.split('T')[0], // Extract date part
      totalDays: campaign.totalDays,
      amTime: campaign.amTime,
      pmTime: campaign.pmTime,
      ogImageUrl: campaign.ogImageUrl || '',
      status: campaign.status,
    });
    setIsEditDialogOpen(true);
  };

  // Update campaign
  const handleUpdateCampaign = async () => {
    if (!editingCampaign || !editCampaignData.name || !editCampaignData.startDate) {
      toast.error('Please fill in campaign name and start date');
      return;
    }

    try {
      const response = await fetch(`/api/twitter/campaigns?id=${editingCampaign.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editCampaignData,
          startDate: editCampaignData.startDate,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Campaign updated successfully');
        setIsEditDialogOpen(false);
        setEditingCampaign(null);
        setEditCampaignData({
          name: '',
          description: '',
          startDate: '',
          totalDays: 45,
          amTime: '13:00',
          pmTime: '20:30',
          ogImageUrl: '',
          status: 'DRAFT',
        });
        loadCampaigns();
      } else {
        toast.error(data.error || 'Failed to update campaign');
      }
    } catch (error) {
      toast.error('Error updating campaign');
      console.error(error);
    }
  };

  // Delete campaign
  const handleDeleteCampaign = async () => {
    if (!campaignToDelete) return;

    try {
      const response = await fetch(`/api/twitter/campaigns?id=${campaignToDelete.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Campaign deleted successfully');
        setIsDeleteDialogOpen(false);
        setCampaignToDelete(null);
        loadCampaigns();
      } else {
        toast.error(data.error || 'Failed to delete campaign');
      }
    } catch (error) {
      toast.error('Error deleting campaign');
      console.error(error);
    }
  };

  // Start delete process
  const startDeleteCampaign = (campaign: TwitterCampaign) => {
    setCampaignToDelete(campaign);
    setIsDeleteDialogOpen(true);
  };

  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge variant="default" className="bg-green-500">Active</Badge>;
      case 'PAUSED':
        return <Badge variant="secondary" className="bg-yellow-500">Paused</Badge>;
      case 'COMPLETED':
        return <Badge variant="default" className="bg-blue-500">Completed</Badge>;
      default:
        return <Badge variant="secondary">Draft</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Twitter Campaigns</h1>
          <p className="text-muted-foreground">
            Manage your Twitter campaigns and their scheduled posts
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
              <DialogDescription>
                Create a new Twitter campaign to organize your posts.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input
                  id="campaign-name"
                  placeholder="e.g., DreamToApp Q1 2025"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="campaign-description">Description</Label>
                <Textarea
                  id="campaign-description"
                  placeholder="Campaign description..."
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="og-image">OG Image URL</Label>
                <Input
                  id="og-image"
                  placeholder="https://dreamto.app/og-image.png"
                  value={newCampaign.ogImageUrl}
                  onChange={(e) => setNewCampaign({ ...newCampaign, ogImageUrl: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateCampaign} disabled={!newCampaign.name}>
                Create Campaign
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Campaigns ({campaigns.length})</CardTitle>
          <CardDescription>
            Click on any campaign to view and manage its posts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : campaigns.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No campaigns found. Create your first campaign to get started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead>Posts</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow
                    key={campaign.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleCampaignClick(campaign.id)}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {campaign.name}
                        {campaign.isActive && (
                          <Badge variant="outline" className="text-xs">Active</Badge>
                        )}
                      </div>
                      {campaign.description && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {campaign.description}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {campaign.postStats?.total || campaign._count?.posts || 0} total
                          </Badge>
                          {campaign.postStats && (
                            <span className="text-xs text-muted-foreground">
                              {Math.round((campaign.postStats.posted / campaign.postStats.total) * 100)}% complete
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <span className="text-green-600">✓ {campaign.postStats?.posted || 0} posted</span>
                          <span>•</span>
                          <span className="text-gray-600">📝 {campaign.postStats?.remaining || 0} remaining</span>
                        </div>
                        {campaign.postStats && campaign.postStats.total > 0 && (
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                            <div
                              className="bg-green-500 h-1 rounded-full transition-all duration-300"
                              style={{
                                width: `${(campaign.postStats.posted / campaign.postStats.total) * 100}%`
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(campaign.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            startEditCampaign(campaign);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            startDeleteCampaign(campaign);
                          }}
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCampaignClick(campaign.id);
                          }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Campaign Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Campaign</DialogTitle>
            <DialogDescription>
              Update the details for this Twitter campaign.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-campaign-name">Campaign Name</Label>
              <Input
                id="edit-campaign-name"
                placeholder="e.g., DreamToApp Q1 2025"
                value={editCampaignData.name}
                onChange={(e) => setEditCampaignData({ ...editCampaignData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-campaign-description">Description</Label>
              <Textarea
                id="edit-campaign-description"
                placeholder="Campaign description..."
                value={editCampaignData.description}
                onChange={(e) => setEditCampaignData({ ...editCampaignData, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-og-image">OG Image URL</Label>
              <Input
                id="edit-og-image"
                placeholder="https://dreamto.app/og-image.png"
                value={editCampaignData.ogImageUrl}
                onChange={(e) => setEditCampaignData({ ...editCampaignData, ogImageUrl: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateCampaign}
              disabled={!editCampaignData.name || !editCampaignData.startDate}
            >
              Update Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Campaign Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Campaign</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the campaign "{campaignToDelete?.name}"?
              This action cannot be undone and will also delete all associated posts.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteCampaign}
            >
              Delete Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
