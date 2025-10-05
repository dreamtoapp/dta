"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  MapPin,
  Calendar,
  Search,
  RefreshCw,
  Download,
  Eye,
  Globe,
  Trash2,
  Monitor,
  Smartphone,
  Tablet,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { getVisitorAnalytics, getVisitorsList } from './actions/getAnalytics';
import { deleteVisitor } from './actions/deleteVisitor';
import { deleteAllVisitors } from './actions/deleteAllVisitors';
import { triggerStatsRefresh } from '../lib/statsRefresh';
import { toast } from "sonner";
import {
  AnalyticsOverviewCards,
  VisitorTrendChart,
  DeviceBreakdownChart,
  GeographicChart,
  BrowserChart,
  TrafficSourcesChart
} from './components/VisitorCharts';

export default function VisitorsPage() {
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [visitorsList, setVisitorsList] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [listLoading, setListLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    country: '',
    deviceType: '',
    browser: '',
    dateFrom: '',
    dateTo: ''
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [visitorToDelete, setVisitorToDelete] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);
  const [isDeleteAllDialogOpen, setIsDeleteAllDialogOpen] = useState(false);
  const [deletingAll, setDeletingAll] = useState(false);

  useEffect(() => {
    loadAnalyticsData();
    loadVisitorsList();
  }, []);

  useEffect(() => {
    loadVisitorsList();
  }, [currentPage, filters]);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      const result = await getVisitorAnalytics();
      if (result.success) {
        setAnalyticsData(result.data);
      } else {
        toast.error('Failed to load analytics data');
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const loadVisitorsList = async () => {
    try {
      setListLoading(true);
      const result = await getVisitorsList(currentPage, 10, filters);
      if (result.success) {
        setVisitorsList(result.data);
      } else {
        toast.error('Failed to load visitors list');
      }
    } catch (error) {
      console.error('Error loading visitors list:', error);
      toast.error('Failed to load visitors list');
    } finally {
      setListLoading(false);
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
        loadAnalyticsData();
        loadVisitorsList();
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

  const handleDeleteAllConfirm = async () => {
    setDeletingAll(true);
    try {
      const result = await deleteAllVisitors();

      if (result.success) {
        toast.success(result.message || 'All visitor records deleted successfully');
        setIsDeleteAllDialogOpen(false);
        loadAnalyticsData();
        loadVisitorsList();
        triggerStatsRefresh();
      } else {
        toast.error(result.error || 'Failed to delete all visitors');
      }
    } catch (error) {
      console.error('Error deleting all visitors:', error);
      toast.error('Failed to delete all visitors');
    } finally {
      setDeletingAll(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value === 'all' ? '' : value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      country: '',
      deviceType: '',
      browser: '',
      dateFrom: '',
      dateTo: ''
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile':
        return <Smartphone className="h-4 w-4" />;
      case 'tablet':
        return <Tablet className="h-4 w-4" />;
      case 'desktop':
        return <Monitor className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const exportData = () => {
    if (!visitorsList?.visitors) return;

    const csvContent = [
      ['IP', 'Country', 'City', 'Browser', 'OS', 'Device Type', 'Visit Count', 'Last Visit'],
      ...visitorsList.visitors.map((visitor: any) => [
        visitor.ip,
        visitor.country || 'Unknown',
        visitor.city || 'Unknown',
        visitor.browser || 'Unknown',
        visitor.os || 'Unknown',
        visitor.deviceType || 'Unknown',
        visitor.visitCount,
        new Date(visitor.lastVisitAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visitors-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-lg text-muted-foreground font-medium">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Visitor Analytics</h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Comprehensive visitor tracking and analytics dashboard
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <Button
            onClick={loadAnalyticsData}
            variant="outline"
            size="default"
            className="flex items-center justify-center gap-2 min-h-[44px]"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={exportData}
            variant="outline"
            size="default"
            className="flex items-center justify-center gap-2 min-h-[44px]"
            disabled={!visitorsList?.visitors?.length}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button
            onClick={() => setIsDeleteAllDialogOpen(true)}
            variant="destructive"
            size="default"
            className="flex items-center justify-center gap-2 min-h-[44px]"
            disabled={!visitorsList?.visitors?.length || loading}
          >
            <Trash2 className="h-4 w-4" />
            Delete All
          </Button>
        </div>
      </div>

      {/* Analytics Overview Cards */}
      <AnalyticsOverviewCards data={analyticsData} />

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview & Analytics</TabsTrigger>
          <TabsTrigger value="visitors">Visitors List</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <VisitorTrendChart data={analyticsData?.trends} />
            <DeviceBreakdownChart data={analyticsData?.deviceBreakdown} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GeographicChart data={analyticsData?.geoDistribution} />
            <BrowserChart data={analyticsData?.browserStats} />
          </div>

          <TrafficSourcesChart data={analyticsData?.trafficSources} />
        </TabsContent>

        {/* Visitors List Tab */}
        <TabsContent value="visitors" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by country, city, IP..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={filters.country || 'all'} onValueChange={(value) => handleFilterChange('country', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {analyticsData?.geoDistribution?.map((item: any) => (
                      <SelectItem key={item.country} value={item.country || 'unknown'}>
                        {item.country || 'Unknown'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filters.deviceType || 'all'} onValueChange={(value) => handleFilterChange('deviceType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Device Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Devices</SelectItem>
                    <SelectItem value="desktop">Desktop</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.browser || 'all'} onValueChange={(value) => handleFilterChange('browser', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Browser" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Browsers</SelectItem>
                    {analyticsData?.browserStats?.map((item: any) => (
                      <SelectItem key={item.browser} value={item.browser || 'unknown'}>
                        {item.browser || 'Unknown'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button onClick={clearFilters} variant="outline" className="w-full">
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Visitors List */}
          <div className="space-y-4">
            {listLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
              </div>
            ) : (
              <>
                {visitorsList?.visitors?.map((visitor: any) => (
                  <Card key={visitor.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-semibold break-words">
                            {visitor.country || 'Unknown Country'}
                          </h3>
                          <p className="text-muted-foreground text-sm sm:text-base">
                            {visitor.city || 'Unknown City'}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="flex items-center gap-1">
                            {getDeviceIcon(visitor.deviceType)}
                            {visitor.deviceType || 'Unknown'}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {visitor.visitCount} visits
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <MapPin className="h-4 w-4 shrink-0" />
                            <span className="break-all">{visitor.ip}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Calendar className="h-4 w-4 shrink-0" />
                            <span>First: {new Date(visitor.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Calendar className="h-4 w-4 shrink-0" />
                            <span>Last: {new Date(visitor.lastVisitAt || visitor.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Browser:</span>
                            <span className="text-muted-foreground ml-2">
                              {visitor.browser || 'Unknown'} {visitor.browserVersion ? `v${visitor.browserVersion}` : ''}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">OS:</span>
                            <span className="text-muted-foreground ml-2">
                              {visitor.os || 'Unknown'} {visitor.osVersion ? `v${visitor.osVersion}` : ''}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Referrer:</span>
                            <span className="text-muted-foreground ml-2 break-all">
                              {visitor.referrer || 'Direct'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2">
                          {visitor.utmSource && (
                            <Badge variant="secondary" className="text-xs">
                              UTM: {visitor.utmSource}
                            </Badge>
                          )}
                          {visitor.landingPage && (
                            <Badge variant="outline" className="text-xs">
                              Landing: {visitor.landingPage}
                            </Badge>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteClick(visitor)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Pagination */}
                {visitorsList && visitorsList.totalPages > 1 && (
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, visitorsList.total)} of {visitorsList.total} visitors
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      <span className="text-sm font-medium">
                        Page {currentPage} of {visitorsList.totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(visitorsList.totalPages, prev + 1))}
                        disabled={currentPage === visitorsList.totalPages}
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>

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

      {/* Delete All Confirmation Dialog */}
      <Dialog open={isDeleteAllDialogOpen} onOpenChange={setIsDeleteAllDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl text-destructive">⚠️ Delete All Visitors</DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              <strong>This action cannot be undone!</strong> You are about to permanently delete all visitor records from the database.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg space-y-3">
              <div className="font-semibold text-base text-destructive">
                🗑️ This will delete:
              </div>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• All {analyticsData?.totalVisitors || 0} visitor records</li>
                <li>• All analytics data and charts</li>
                <li>• All visitor tracking history</li>
                <li>• All geographic and device information</li>
              </ul>
              <div className="text-xs text-destructive font-medium mt-3">
                ⚠️ This action is permanent and cannot be reversed!
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteAllDialogOpen(false)}
              disabled={deletingAll}
              size="default"
              className="min-h-[44px] text-base w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAllConfirm}
              disabled={deletingAll}
              size="default"
              className="min-h-[44px] text-base w-full sm:w-auto"
            >
              {deletingAll ? 'Deleting All...' : '🗑️ Delete All Visitors'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}