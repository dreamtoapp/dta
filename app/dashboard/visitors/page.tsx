"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Calendar,
  Search,
  RefreshCw,
  Download,
  Eye,
  Globe
} from 'lucide-react';
import { getDashboardStats } from '../action/action';
import { toast } from "sonner";

export default function VisitorsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Visitors</h1>
          <p className="text-muted-foreground mt-1">
            Track website visitors and analytics ({filteredVisitors.length} total)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={loadData}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search visitors by country, city, or IP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Visitors List */}
      <div className="space-y-4">
        {filteredVisitors.map((visitor: any) => (
          <Card key={visitor.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{visitor.country || 'Unknown'}</h3>
                  <p className="text-muted-foreground">{visitor.city || 'N/A'}</p>
                </div>
                <Badge variant="outline">
                  <Eye className="h-3 w-3 mr-1" />
                  {visitor.visitCount} visits
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{visitor.ip}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>First visit: {new Date(visitor.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Last visit: {new Date(visitor.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Country:</span>
                    <span className="text-muted-foreground ml-2">{visitor.country || 'Unknown'}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">City:</span>
                    <span className="text-muted-foreground ml-2">{visitor.city || 'N/A'}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Region:</span>
                    <span className="text-muted-foreground ml-2">{visitor.region || 'N/A'}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Organization:</span>
                    <span className="text-muted-foreground ml-2">{visitor.org || 'N/A'}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Timezone:</span>
                    <span className="text-muted-foreground ml-2">{visitor.timezone || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  <Globe className="h-3 w-3 mr-1" />
                  Geolocate
                </Button>
                <Button size="sm" variant="outline">
                  Block IP
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
    </div>
  );
}


