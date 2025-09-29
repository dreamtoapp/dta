"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { getTeamMembers } from './actions/getTeamMembers';
import { deleteTeamMember } from './actions/deleteTeamMember';
import { toast } from "sonner";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      const result = await deleteTeamMember(id);
      if (result.success) {
        toast.success('Team member deleted successfully');
        loadTeamMembers();
      } else {
        toast.error(result.error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Members</h1>
          <p className="text-muted-foreground mt-1">Manage your team members</p>
        </div>
        <Button onClick={() => router.push('/dashboard/team/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#10b981] to-[#34d399] flex items-center justify-center overflow-hidden">
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
                <Badge variant={member.isActive ? "default" : "secondary"}>
                  {member.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm font-medium">{member.role}</p>
                {member.experience && (
                  <p className="text-xs text-muted-foreground">{member.experience}</p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-4 border-t mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => router.push(`/dashboard/team/${member.id}/view`)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => router.push(`/dashboard/team/${member.id}`)}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(member.id)}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
