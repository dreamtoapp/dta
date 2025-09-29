"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Briefcase,
  Eye,
  MessageSquare,
  RefreshCw
} from 'lucide-react';
import { getDashboardStats, refreshDashboardData } from './action/action';
import { toast } from "sonner";
import Link from 'next/link';


export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const realData = await getDashboardStats();
      setData(realData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-lg text-muted-foreground font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Monitor your business metrics and activities</p>
        </div>
        <Button
          onClick={async () => {
            try {
              await refreshDashboardData();
              await loadDashboardData();
              toast.success('Dashboard refreshed successfully');
            } catch (error) {
              toast.error('Failed to refresh dashboard');
            }
          }}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <Link href="/dashboard/applications">
          <Card className="bg-card/60 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Applications</p>
                  <p className="text-3xl font-bold text-foreground">{data?.stats?.totalJobApplications || 0}</p>
                  <p className="text-xs text-muted-foreground mt-1">Job submissions</p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/influencers">
          <Card className="bg-card/60 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Influencers</p>
                  <p className="text-3xl font-bold text-foreground">{data?.stats?.totalInfluencers || 0}</p>
                  <p className="text-xs text-muted-foreground mt-1">Registered influencers</p>
                </div>
                <div className="h-12 w-12 bg-[#0d3ad7]/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-[#0d3ad7]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/visitors">
          <Card className="bg-card/60 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Visitors</p>
                  <p className="text-3xl font-bold text-foreground">{data?.stats?.totalVisitors || 0}</p>
                  <p className="text-xs text-muted-foreground mt-1">Unique visits</p>
                </div>
                <div className="h-12 w-12 bg-[#d7a50d]/10 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-[#d7a50d]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/consultations">
          <Card className="bg-card/60 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Consultations</p>
                  <p className="text-3xl font-bold text-foreground">{data?.stats?.totalConsultations || 0}</p>
                  <p className="text-xs text-muted-foreground mt-1">Expert sessions</p>
                </div>
                <div className="h-12 w-12 bg-[#99e4ff]/10 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-[#99e4ff]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/team">
          <Card className="bg-card/60 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Team Members</p>
                  <p className="text-3xl font-bold text-foreground">{data?.stats?.totalTeamMembers || 0}</p>
                  <p className="text-xs text-muted-foreground mt-1">Active members</p>
                </div>
                <div className="h-12 w-12 bg-[#10b981]/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-[#10b981]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/dashboard/applications">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Briefcase className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Applications</h3>
              <p className="text-sm text-muted-foreground">Manage job applications</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/influencers">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-[#0d3ad7]" />
              <h3 className="font-semibold">Influencers</h3>
              <p className="text-sm text-muted-foreground">Manage influencers</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/consultations">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-[#d7a50d]" />
              <h3 className="font-semibold">Consultations</h3>
              <p className="text-sm text-muted-foreground">Handle consultations</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/team">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-[#10b981]" />
              <h3 className="font-semibold">Team</h3>
              <p className="text-sm text-muted-foreground">Manage team members</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
