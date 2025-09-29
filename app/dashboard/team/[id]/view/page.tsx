"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Calendar, User } from 'lucide-react';
import { getTeamMemberById } from '../../actions/getTeamMemberById';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

export default function ViewTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [teamMember, setTeamMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const resolvedParams = await params;
      loadTeamMemberData(resolvedParams.id);
    };
    loadData();
  }, [params]);

  const loadTeamMemberData = async (id: string) => {
    try {
      const result = await getTeamMemberById(id);
      if (result.success && result.data) {
        setTeamMember(result.data);
      } else {
        toast.error(result.error);
        router.push('/dashboard/team');
      }
    } catch (error) {
      toast.error('Failed to load team member data');
      router.push('/dashboard/team');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!teamMember) {
    return <div>Team member not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/dashboard/team')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Team
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{teamMember.name}</h1>
            <p className="text-muted-foreground mt-1">Team member details</p>
          </div>
        </div>
        <Button
          onClick={() => router.push(`/dashboard/team/${teamMember.id}`)}
          className="flex items-center gap-2"
        >
          <Edit className="h-4 w-4" />
          Edit Team Member
        </Button>
      </div>

      {/* Team Member Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#10b981] to-[#34d399] flex items-center justify-center overflow-hidden">
                {teamMember.employeeImage ? (
                  <img
                    src={teamMember.employeeImage}
                    alt={teamMember.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-bold text-xl">
                    {teamMember.name.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                )}
              </div>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold">{teamMember.name}</h2>
              <Badge variant={teamMember.isActive ? "default" : "secondary"}>
                {teamMember.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Team Member Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <p className="text-lg font-semibold">{teamMember.name}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Role</label>
                <p className="text-lg font-semibold">{teamMember.role}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Display Order</label>
                <p className="text-lg font-semibold">{teamMember.displayOrder}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <Badge variant={teamMember.isActive ? "default" : "secondary"}>
                  {teamMember.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>

            {teamMember.experience && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Experience</label>
                <p className="text-lg">{teamMember.experience}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Created</label>
                  <p className="text-sm">{new Date(teamMember.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                  <p className="text-sm">{new Date(teamMember.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
