"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Phone,
  Calendar,
  Search,
  RefreshCw,
  Download,
  MessageSquare,
  Volume2
} from 'lucide-react';
import { getDashboardStats } from '../action/action';
import { toast } from "sonner";

export default function ConsultationsPage() {
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
      console.error('Error loading consultations:', error);
      toast.error('Failed to load consultation requests');
    } finally {
      setLoading(false);
    }
  };

  const filteredConsultations = data?.consultations?.filter((consultation: any) => {
    return consultation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.message.toLowerCase().includes(searchTerm.toLowerCase());
  }) || [];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Consultation Requests</h1>
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
          <h1 className="text-3xl font-bold">Consultation Requests</h1>
          <p className="text-muted-foreground mt-1">
            Manage free consultation requests ({filteredConsultations.length} total)
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
              placeholder="Search consultation requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Consultations List */}
      <div className="space-y-4">
        {filteredConsultations.map((consultation: any) => (
          <Card key={consultation.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{consultation.name}</h3>
                  <p className="text-muted-foreground">Consultation Request</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {consultation.voiceUrl && (
                    <Badge variant="outline" className="text-xs">
                      <Volume2 className="h-3 w-3 mr-1" />
                      Voice Message
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{consultation.email}</span>
                  </div>
                  {consultation.phone && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{consultation.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(consultation.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Message</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {consultation.message}
                </p>
              </div>

              {consultation.voiceUrl && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Voice Message</h4>
                  <audio controls className="w-full">
                    <source src={consultation.voiceUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}

              <div className="flex items-center gap-2 pt-4 border-t">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  Schedule Call
                </Button>
                <Button size="sm" variant="outline">
                  Send Response
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredConsultations.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No consultation requests found</h3>
              <p>No consultation requests match your current search.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


