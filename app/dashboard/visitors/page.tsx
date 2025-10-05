"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MapPin,
  Calendar,
  Search,
  RefreshCw,
  Download,
  Eye,
  Globe,
  Trash2
} from 'lucide-react';
import { getDashboardStats } from '../action/action';
import { deleteVisitor } from './actions/deleteVisitor';
import { triggerStatsRefresh } from '../lib/statsRefresh';
import { toast } from "sonner";

export default function VisitorsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [visitorToDelete, setVisitorToDelete] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const result = await getDashboardStats();
      setData(result);
    } catch (error) {
      console.error('Error loading visitors:', error);
      toast.error('Failed to load visitor data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (visitor: any) => {
    setVisitorToDelete(visitor);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!visitorToDelete) return;

    setDeleting(true);
    try {
      const result = await deleteVisitor(visitorToDelete.id);

      if (result.success) {
        toast.success('Visitor record deleted successfully');
        setIsDeleteDialogOpen(false);
        setVisitorToDelete(null);
        loadData();
        triggerStatsRefresh();
      } else {
        toast.error(result.error || 'Failed to delete visitor record');
      }
    } catch (error) {
      console.error('Error deleting visitor:', error);
      toast.error('Failed to delete visitor record');
    } finally {
      setDeleting(false);
    }
  };

  const filteredVisitors = data?.visitors?.filter((visitor: any) => {
    return (visitor.country || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (visitor.city || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (visitor.ip || '').toLowerCase().includes(searchTerm.toLowerCase());
  }) || [];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Visitors</h1>
        </div>
        <div className="grid gap-6">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Visitors</h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Track website visitors and analytics ({filteredVisitors.length} total)
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <Button
            onClick={loadData}
            variant="outline"
            size="default"
            className="flex items-center justify-center gap-2 min-h-[44px]"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="default"
            className="flex items-center justify-center gap-2 min-h-[44px]"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search visitors by country, city, or IP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 min-h-[44px] text-base"
            />
          </div>
        </CardContent>
      </Card>

      {/* Visitors List */}
      <div className="space-y-4">
        {filteredVisitors.map((visitor: any) => (
          <Card key={visitor.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold break-words">{visitor.country || 'Unknown'}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">{visitor.city || 'N/A'}</p>
                </div>
                <Badge variant="outline" className="self-start shrink-0">
                  <Eye className="h-3 w-3 mr-1" />
                  {visitor.visitCount} visits
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span className="break-all">{visitor.ip}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span>First visit: {new Date(visitor.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span>Last visit: {new Date(visitor.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm sm:text-base">
                  <div>
                    <span className="font-medium">Country:</span>
                    <span className="text-muted-foreground ml-2">{visitor.country || 'Unknown'}</span>
                  </div>
                  <div>
                    <span className="font-medium">City:</span>
                    <span className="text-muted-foreground ml-2">{visitor.city || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-medium">Region:</span>
                    <span className="text-muted-foreground ml-2">{visitor.region || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-medium">Organization:</span>
                    <span className="text-muted-foreground ml-2 break-all">{visitor.org || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-medium">Timezone:</span>
                    <span className="text-muted-foreground ml-2">{visitor.timezone || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t">
                <Button size="default" variant="outline" className="min-h-[44px] text-sm">
                  View Details
                </Button>
                <Button size="default" variant="outline" className="min-h-[44px] text-sm">
                  <Globe className="h-3 w-3 mr-1" />
                  Geolocate
                </Button>
                <Button size="default" variant="outline" className="min-h-[44px] text-sm">
                  Block IP
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  className="min-h-[44px] text-sm text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteClick(visitor)}
                >
                  <Trash2 className="h-4 w-4 sm:mr-1" />
                  <span className="hidden sm:inline">Delete</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVisitors.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground">
              <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No visitors found</h3>
              <p>No visitors match your current search.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Delete Visitor Record</DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Are you sure you want to delete this visitor record? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {visitorToDelete && (
            <div className="py-4">
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="font-semibold text-base">{visitorToDelete.country || 'Unknown Country'}</div>
                <div className="text-sm text-muted-foreground">{visitorToDelete.city || 'Unknown City'}</div>
                <div className="text-sm text-muted-foreground break-all">IP: {visitorToDelete.ip}</div>
                <div className="text-xs text-muted-foreground mt-2">
                  {visitorToDelete.visitCount} visit{visitorToDelete.visitCount > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={deleting}
              size="default"
              className="min-h-[44px] text-base w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleting}
              size="default"
              className="min-h-[44px] text-base w-full sm:w-auto"
            >
              {deleting ? 'Deleting...' : 'Delete Visitor'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


