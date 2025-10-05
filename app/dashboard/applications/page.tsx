"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Mail,
  Phone,
  Users,
  Calendar,
  Search,
  Filter,
  Download,
  RefreshCw,
  Trash2
} from 'lucide-react';
import { getDashboardStats } from '../action/action';
import { deleteJobApplication } from './actions/deleteApplication';
import { triggerStatsRefresh } from '../lib/statsRefresh';
import { toast } from "sonner";

export default function ApplicationsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<any>(null);
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
      console.error('Error loading applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (app: any) => {
    setApplicationToDelete(app);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!applicationToDelete) return;

    setDeleting(true);
    try {
      const result = await deleteJobApplication(applicationToDelete.id);

      if (result.success) {
        toast.success('Application deleted successfully');
        setIsDeleteDialogOpen(false);
        setApplicationToDelete(null);
        loadData();
        triggerStatsRefresh();
      } else {
        toast.error(result.error || 'Failed to delete application');
      }
    } catch (error) {
      console.error('Error deleting application:', error);
      toast.error('Failed to delete application');
    } finally {
      setDeleting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUBMITTED': return 'bg-blue-100 text-blue-800';
      case 'UNDER_REVIEW': return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredApplications = data?.jobApplications?.filter((app: any) => {
    const matchesSearch = app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.areaOfExpertise.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Job Applications</h1>
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
          <h1 className="text-2xl sm:text-3xl font-bold">Job Applications</h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Manage and review job applications ({filteredApplications.length} total)
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

      {/* Filters */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 min-h-[44px] text-base"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="min-h-[44px] text-base">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="SUBMITTED">Submitted</SelectItem>
                  <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((app: any) => (
          <Card key={app.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold break-words">{app.fullName}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">{app.areaOfExpertise}</p>
                </div>
                <Badge className={`${getStatusColor(app.status)} self-start shrink-0`}>
                  {app.status}
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="break-all">{app.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
                    <Phone className="h-4 w-4 shrink-0" />
                    <span>{app.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
                    <Users className="h-4 w-4 shrink-0" />
                    <span>{app.yearsOfExperience} years experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm sm:text-base">
                  <div>
                    <span className="font-medium">Age:</span>
                    <span className="text-muted-foreground ml-2">{app.age} years</span>
                  </div>
                  <div>
                    <span className="font-medium">Gender:</span>
                    <span className="text-muted-foreground ml-2">{app.gender}</span>
                  </div>
                  <div>
                    <span className="font-medium">Application #:</span>
                    <span className="text-muted-foreground ml-2">{app.applicationNumber}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-sm sm:text-base mb-2">About You</h4>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {app.aboutYou}
                </p>
              </div>

              {app.attachmentUrl && (
                <div className="mb-4">
                  <h4 className="font-semibold text-sm sm:text-base mb-2">Attachment</h4>
                  <a
                    href={app.attachmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm break-all"
                  >
                    {app.attachmentName || 'View Attachment'}
                  </a>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t">
                <Button size="default" variant="outline" className="min-h-[44px] text-sm">
                  View Details
                </Button>
                <Button size="default" variant="outline" className="min-h-[44px] text-sm">
                  Update Status
                </Button>
                <Button size="default" variant="outline" className="min-h-[44px] text-sm">
                  Contact
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  className="min-h-[44px] text-sm text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteClick(app)}
                >
                  <Trash2 className="h-4 w-4 sm:mr-1" />
                  <span className="hidden sm:inline">Delete</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No applications found</h3>
              <p>No job applications match your current filters.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Delete Application</DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Are you sure you want to delete this job application? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {applicationToDelete && (
            <div className="py-4">
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="font-semibold text-base">{applicationToDelete.fullName}</div>
                <div className="text-sm text-muted-foreground">{applicationToDelete.email}</div>
                <div className="text-sm text-muted-foreground">{applicationToDelete.areaOfExpertise}</div>
                <div className="text-xs text-muted-foreground mt-2">
                  Application #{applicationToDelete.applicationNumber}
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
              {deleting ? 'Deleting...' : 'Delete Application'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


