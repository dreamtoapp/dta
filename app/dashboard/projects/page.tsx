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
  Calendar,
  Search,
  RefreshCw,
  Download,
  FileText,
  Trash2
} from 'lucide-react';
import { getDashboardStats } from '../action/action';
import { deleteProject } from './actions/deleteProject';
import { triggerStatsRefresh } from '../lib/statsRefresh';
import { toast } from "sonner";

export default function ProjectsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<any>(null);
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
      console.error('Error loading projects:', error);
      toast.error('Failed to load project requests');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (project: any) => {
    setProjectToDelete(project);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;

    setDeleting(true);
    try {
      const result = await deleteProject(projectToDelete.id);

      if (result.success) {
        toast.success('Project request deleted successfully');
        setIsDeleteDialogOpen(false);
        setProjectToDelete(null);
        loadData();
        triggerStatsRefresh();
      } else {
        toast.error(result.error || 'Failed to delete project request');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project request');
    } finally {
      setDeleting(false);
    }
  };

  const filteredProjects = data?.contacts?.filter((project: any) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.projectType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || project.projectType === typeFilter;
    return matchesSearch && matchesType;
  }) || [];

  const projectTypes = [...new Set(data?.contacts?.map((p: any) => p.projectType) || [])];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Project Requests</h1>
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
          <h1 className="text-2xl sm:text-3xl font-bold">Project Requests</h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Manage client project requests ({filteredProjects.length} total)
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
                  placeholder="Search project requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 min-h-[44px] text-base"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="min-h-[44px] text-base">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {projectTypes.map((type) => (
                    <SelectItem key={type as string} value={type as string}>
                      {(type as string).charAt(0).toUpperCase() + (type as string).slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.map((project: any) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold break-words">{project.name}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">{project.projectType}</p>
                </div>
                <Badge variant="outline" className="self-start shrink-0">
                  {project.budget}
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-3 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="break-all">{project.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
                    <Phone className="h-4 w-4 shrink-0" />
                    <span>{project.mobile}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-sm sm:text-base mb-2">Project Details</h4>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {project.projectDetails}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-sm sm:text-base mb-2">Message</h4>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {project.message}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t">
                <Button size="default" variant="outline" className="min-h-[44px] text-sm">
                  View Details
                </Button>
                <Button size="default" variant="outline" className="min-h-[44px] text-sm">
                  Contact Client
                </Button>
                <Button size="default" variant="outline" className="min-h-[44px] text-sm">
                  Create Quote
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  className="min-h-[44px] text-sm text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteClick(project)}
                >
                  <Trash2 className="h-4 w-4 sm:mr-1" />
                  <span className="hidden sm:inline">Delete</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No project requests found</h3>
              <p>No project requests match your current filters.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Delete Project Request</DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Are you sure you want to delete this project request? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {projectToDelete && (
            <div className="py-4">
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="font-semibold text-base">{projectToDelete.name}</div>
                <div className="text-sm text-muted-foreground">{projectToDelete.email}</div>
                <div className="text-sm text-muted-foreground">{projectToDelete.projectType}</div>
                <div className="text-xs text-muted-foreground mt-2">
                  Budget: {projectToDelete.budget}
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
              {deleting ? 'Deleting...' : 'Delete Project'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


