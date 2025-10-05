"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Users, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { getTeamMembers } from './actions/getTeamMembers';
import { deleteTeamMember } from './actions/deleteTeamMember';
import { triggerStatsRefresh } from '../lib/statsRefresh';
import { toast } from "sonner";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      const result = await getTeamMembers();
      if (result.success) {
        setTeamMembers(result.data);
      }
    } catch (error) {
      toast.error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (member: any) => {
    setMemberToDelete(member);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!memberToDelete) return;

    setDeleting(true);
    try {
      const result = await deleteTeamMember(memberToDelete.id);

      if (result.success) {
        toast.success('Team member deleted successfully');
        setIsDeleteDialogOpen(false);
        setMemberToDelete(null);
        loadTeamMembers();
        triggerStatsRefresh();
      } else {
        toast.error(result.error || 'Failed to delete team member');
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
      toast.error('Failed to delete team member');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Team Members</h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">Manage your team members</p>
        </div>
        <Button onClick={() => router.push('/dashboard/team/new')} size="default" className="min-h-[44px]">
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-14 w-14 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-[#10b981] to-[#34d399] flex items-center justify-center overflow-hidden shrink-0">
                  {member.employeeImage ? (
                    <img
                      src={member.employeeImage}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-sm">
                      {member.name.split(' ').map((n: string) => n[0]).join('')}
                    </span>
                  )}
                </div>
                <Badge variant={member.isActive ? "default" : "secondary"} className="shrink-0">
                  {member.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <h3 className="font-semibold text-base sm:text-lg break-words">{member.name}</h3>
                <p className="text-sm font-medium text-muted-foreground">{member.role}</p>
                {member.experience && (
                  <p className="text-xs text-muted-foreground line-clamp-2">{member.experience}</p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 pt-4 border-t">
                <Button
                  size="default"
                  variant="outline"
                  className="min-h-[44px] text-xs sm:text-sm"
                  onClick={() => router.push(`/dashboard/team/${member.id}/view`)}
                >
                  <Eye className="h-4 w-4 sm:mr-1" />
                  <span className="hidden sm:inline">View</span>
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  className="min-h-[44px] text-xs sm:text-sm"
                  onClick={() => router.push(`/dashboard/team/${member.id}`)}
                >
                  <Edit className="h-4 w-4 sm:mr-1" />
                  <span className="hidden sm:inline">Edit</span>
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  className="min-h-[44px] text-xs sm:text-sm text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteClick(member)}
                >
                  <Trash2 className="h-4 w-4 sm:mr-1" />
                  <span className="hidden sm:inline">Delete</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Delete Team Member</DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Are you sure you want to delete this team member? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {memberToDelete && (
            <div className="py-4">
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="font-semibold text-base">{memberToDelete.name}</div>
                <div className="text-sm text-muted-foreground">{memberToDelete.role}</div>
                {memberToDelete.experience && (
                  <div className="text-xs text-muted-foreground mt-2 line-clamp-2">
                    {memberToDelete.experience}
                  </div>
                )}
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
              {deleting ? 'Deleting...' : 'Delete Team Member'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
