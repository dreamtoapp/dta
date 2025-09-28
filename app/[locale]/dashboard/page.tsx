"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Briefcase,
  Eye,
  MessageSquare,
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  MapPin,
  RefreshCw,
  BarChart3,
  FileText
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/en/dashboard/applications">
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

        <Link href="/en/dashboard/applications">
          <Card className="bg-card/60 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Active Applications</p>
                  <p className="text-3xl font-bold text-foreground">{data?.stats?.activeJobApplications || 0}</p>
                  <p className="text-xs text-muted-foreground mt-1">In progress</p>
                </div>
                <div className="h-12 w-12 bg-[#0d3ad7]/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-[#0d3ad7]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/en/dashboard/visitors">
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

        <Link href="/en/dashboard/consultations">
          <Card className="bg-card/60 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Recent Submissions</p>
                  <p className="text-3xl font-bold text-foreground">{data?.stats?.recentSubmissions || 0}</p>
                  <p className="text-xs text-muted-foreground mt-1">This week</p>
                </div>
                <div className="h-12 w-12 bg-[#99e4ff]/10 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-[#99e4ff]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Analytics Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Analytics & Insights</h2>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Conversion Rate</p>
                  <p className="text-3xl font-bold text-foreground">
                    {data?.stats?.totalVisitors > 0
                      ? ((data?.stats?.totalJobApplications / data?.stats?.totalVisitors) * 100).toFixed(2)
                      : 0}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Visitors to applications</p>
                </div>
                <div className="h-12 w-12 bg-[#99e4ff]/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-[#99e4ff]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                    <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Active Rate</p>
                  <p className="text-3xl font-bold text-foreground">
                    {data?.stats?.totalJobApplications > 0
                      ? ((data?.stats?.activeJobApplications / data?.stats?.totalJobApplications) * 100).toFixed(2)
                      : 0}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Of total applications</p>
                    </div>
                <div className="h-12 w-12 bg-[#0d3ad7]/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-[#0d3ad7]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                    <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Project Requests</p>
                  <p className="text-3xl font-bold text-foreground">{data?.stats?.totalProjects || 0}</p>
                  <p className="text-xs text-muted-foreground mt-1">Client inquiries</p>
                    </div>
                <div className="h-12 w-12 bg-[#0d3ad7]/10 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-[#0d3ad7]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Consultations</p>
                  <p className="text-3xl font-bold text-foreground">{data?.stats?.totalConsultations || 0}</p>
                  <p className="text-xs text-muted-foreground mt-1">Expert sessions</p>
                </div>
                <div className="h-12 w-12 bg-[#d7a50d]/10 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-[#d7a50d]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Applications Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Applications Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Applications</span>
                <Badge variant="outline">{data?.stats?.totalJobApplications || 0}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Applications</span>
                <Badge variant="outline">{data?.stats?.activeJobApplications || 0}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Recent Submissions (7 days)</span>
                <Badge variant="outline">{data?.stats?.recentSubmissions || 0}</Badge>
                    </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Completion Rate</span>
                <Badge variant="outline">
                  {data?.stats?.totalJobApplications > 0
                    ? ((data?.stats?.activeJobApplications / data?.stats?.totalJobApplications) * 100).toFixed(2)
                    : 0}%
                    </Badge>
                  </div>
            </CardContent>
          </Card>

          {/* Traffic Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Traffic Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Visitors</span>
                <Badge variant="outline">{data?.stats?.totalVisitors || 0}</Badge>
                    </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Conversion Rate</span>
                <Badge variant="outline">
                  {data?.stats?.totalVisitors > 0
                    ? ((data?.stats?.totalJobApplications / data?.stats?.totalVisitors) * 100).toFixed(2)
                    : 0}%
                </Badge>
                  </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Applications per Visitor</span>
                <Badge variant="outline">
                  {data?.stats?.totalVisitors > 0
                    ? (data?.stats?.totalJobApplications / data?.stats?.totalVisitors).toFixed(3)
                    : 0}
                </Badge>
                </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activity Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{data?.jobApplications?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Recent Applications</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#0d3ad7]">{data?.contacts?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Project Requests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#d7a50d]">{data?.consultations?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Consultations</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/en/dashboard/applications">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Briefcase className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Applications</h3>
              <p className="text-sm text-muted-foreground">Manage job applications</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/en/dashboard/projects">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 mx-auto mb-2 text-[#0d3ad7]" />
              <h3 className="font-semibold">Projects</h3>
              <p className="text-sm text-muted-foreground">View project requests</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/en/dashboard/consultations">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-[#d7a50d]" />
              <h3 className="font-semibold">Consultations</h3>
              <p className="text-sm text-muted-foreground">Handle consultations</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
