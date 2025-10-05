"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  MessageSquare,
  Volume2,
  Trash2
} from 'lucide-react';
import { getDashboardStats } from '../action/action';
import { deleteConsultation } from './actions/deleteConsultation';
import { triggerStatsRefresh } from '../lib/statsRefresh';
import { toast } from "sonner";

export default function ConsultationsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [consultationToDelete, setConsultationToDelete] = useState<any>(null);
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
      console.error('Error loading consultations:', error);
      toast.error('Failed to load consultation requests');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (consultation: any) => {
    setConsultationToDelete(consultation);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!consultationToDelete) return;

    setDeleting(true);
    try {
      const result = await deleteConsultation(consultationToDelete.id);

      if (result.success) {
        toast.success('Consultation request deleted successfully');
        setIsDeleteDialogOpen(false);
        setConsultationToDelete(null);
        loadData();
        triggerStatsRefresh();
      } else {
        toast.error(result.error || 'Failed to delete consultation request');
      }
    } catch (error) {
      console.error('Error deleting consultation:', error);
      toast.error('Failed to delete consultation request');
    } finally {
      setDeleting(false);
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Consultation Requests</h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Manage free consultation requests ({filteredConsultations.length} total)
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

      {/* Search */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search consultation requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 min-h-[44px] text-base"
            />
          </div>
        </CardContent>
      </Card>

      {/* Consultations List */}
      <div className="space-y-4">
        {filteredConsultations.map((consultation: any) => (
          <Card key={consultation.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold break-words">{consultation.name}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">Consultation Request</p>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-2">
                  {consultation.voiceUrl && (
                    <Badge variant="outline" className="text-xs shrink-0">
                      <Volume2 className="h-3 w-3 mr-1" />
                      Voice Message
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="break-all">{consultation.email}</span>
                  </div>
                  {consultation.phone && (
                    <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
                      <Phone className="h-4 w-4 shrink-0" />
                      <span>{consultation.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span>{new Date(consultation.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-sm sm:text-base mb-2">Message</h4>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {consultation.message}
                </p>
              </div>

              {consultation.voiceUrl && (
                <div className="mb-4">
                  <h4 className="font-semibold text-sm sm:text-base mb-2">Voice Message</h4>
                  <audio controls className="w-full h-12">
                    <source src={consultation.voiceUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t">
                <Button size="default" variant="outline" className="min-h-[44px] text-sm">
                  View Details
                </Button>
                <Button size="default" variant="outline" className="min-h-[44px] text-sm">
                  Schedule Call
                </Button>
                <Button size="default" variant="outline" className="min-h-[44px] text-sm">
                  Send Response
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  className="min-h-[44px] text-sm text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteClick(consultation)}
                >
                  <Trash2 className="h-4 w-4 sm:mr-1" />
                  <span className="hidden sm:inline">Delete</span>
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Delete Consultation Request</DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Are you sure you want to delete this consultation request? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {consultationToDelete && (
            <div className="py-4">
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="font-semibold text-base">{consultationToDelete.name}</div>
                <div className="text-sm text-muted-foreground break-all">{consultationToDelete.email}</div>
                {consultationToDelete.phone && (
                  <div className="text-sm text-muted-foreground">{consultationToDelete.phone}</div>
                )}
                {consultationToDelete.voiceUrl && (
                  <Badge variant="outline" className="text-xs mt-2">
                    <Volume2 className="h-3 w-3 mr-1" />
                    Has voice message
                  </Badge>
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
              {deleting ? 'Deleting...' : 'Delete Consultation'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


