"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Settings,
  Save,
  RefreshCw,
  Mail,
  Globe
} from 'lucide-react';
import { toast } from "sonner";

export default function SettingsPage() {
  const handleSave = async () => {
    toast.info('Settings functionality coming soon');
  };

  const handleReset = () => {
    toast.info('Reset functionality coming soon');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Configure your dashboard and system preferences
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <Button
            onClick={handleReset}
            variant="outline"
            size="default"
            className="flex items-center justify-center gap-2 min-h-[44px]"
          >
            <RefreshCw className="h-4 w-4" />
            Reset
          </Button>
          <Button
            onClick={handleSave}
            size="default"
            className="flex items-center justify-center gap-2 min-h-[44px]"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Globe className="h-5 w-5" />
            General Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="siteName" className="text-sm sm:text-base">Site Name</Label>
              <Input
                id="siteName"
                placeholder="Enter site name"
                disabled
                className="min-h-[44px] text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminEmail" className="text-sm sm:text-base">Admin Email</Label>
              <Input
                id="adminEmail"
                type="email"
                placeholder="Enter admin email"
                disabled
                className="min-h-[44px] text-base"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteDescription" className="text-sm sm:text-base">Site Description</Label>
            <Textarea
              id="siteDescription"
              placeholder="Enter site description"
              rows={4}
              disabled
              className="min-h-[100px] text-base"
            />
          </div>
        </CardContent>
      </Card>

      {/* Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Mail className="h-5 w-5" />
            Email Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smtpHost" className="text-sm sm:text-base">SMTP Host</Label>
              <Input
                id="smtpHost"
                placeholder="smtp.gmail.com"
                disabled
                className="min-h-[44px] text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpPort" className="text-sm sm:text-base">SMTP Port</Label>
              <Input
                id="smtpPort"
                type="number"
                placeholder="587"
                disabled
                className="min-h-[44px] text-base"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smtpUser" className="text-sm sm:text-base">SMTP Username</Label>
              <Input
                id="smtpUser"
                placeholder="Enter SMTP username"
                disabled
                className="min-h-[44px] text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpPassword" className="text-sm sm:text-base">SMTP Password</Label>
              <Input
                id="smtpPassword"
                type="password"
                placeholder="Enter SMTP password"
                disabled
                className="min-h-[44px] text-base"
              />
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}


