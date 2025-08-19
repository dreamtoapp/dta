"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
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
  X,
  ExternalLink,
  Lock,
  EyeOff
} from 'lucide-react';
import { getDashboardStats, refreshDashboardData } from './action/action';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function DetailModal({ isOpen, onClose, title, children }: DetailModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl shadow-2xl border border-border">
          {/* Header */}
          <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card/95 backdrop-blur-sm rounded-t-2xl">
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full hover:bg-muted">
              <X className="h-4 w-4" />
            </Button>
          </div>
          {/* Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

interface LoginModalProps {
  isOpen: boolean;
  onLogin: (password: string) => void;
  isLoading: boolean;
}

function LoginModal({ isOpen, onLogin, isLoading }: LoginModalProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-2xl border border-border p-8">
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Dashboard Access</h2>
          <p className="text-muted-foreground mt-2">Enter password to access the admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter dashboard password"
                className="pr-10"
                disabled={isLoading}
                autoFocus
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!password.trim() || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
                Verifying...
              </div>
            ) : (
              'Access Dashboard'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [detailModal, setDetailModal] = useState<{
    isOpen: boolean;
    type: string;
    title: string;
  }>({
    isOpen: false,
    type: '',
    title: ''
  });

  useEffect(() => {
    const authStatus = sessionStorage.getItem('dashboard_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      setShowLogin(false);
      loadDashboardData();
    }
  }, []);

  const handleLogin = async (password: string) => {
    setLoginLoading(true);
    try {
      const response = await fetch('/api/dashboard/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setShowLogin(false);
        sessionStorage.setItem('dashboard_authenticated', 'true');
        toast.success('Access granted!');
        loadDashboardData();
      } else {
        toast.error('Invalid password');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Authentication failed');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogin(true);
    sessionStorage.removeItem('dashboard_authenticated');
    setData(null);
    toast.success('Logged out successfully');
  };

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUBMITTED': return 'bg-blue-100 text-blue-800';
      case 'UNDER_REVIEW': return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openDetailModal = (type: string, title: string) => {
    setDetailModal({
      isOpen: true,
      type,
      title
    });
  };

  const closeDetailModal = () => {
    setDetailModal({
      isOpen: false,
      type: '',
      title: ''
    });
  };

  const renderDetailContent = () => {
    switch (detailModal.type) {
      case 'applications':
        return (
          <div className="space-y-6">
            {data?.jobApplications?.map((app: any) => (
              <div key={app.id} className="p-6 bg-background/50 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{app.fullName}</h3>
                    <p className="text-muted-foreground">{app.areaOfExpertise}</p>
                  </div>
                  <Badge className={`${getStatusColor(app.status)}`}>
                    {app.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{app.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{app.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{app.yearsOfExperience} years experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium text-foreground">Age:</span>
                      <span className="text-muted-foreground ml-2">{app.age} years</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-foreground">Gender:</span>
                      <span className="text-muted-foreground ml-2">{app.gender}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-foreground">Application #:</span>
                      <span className="text-muted-foreground ml-2">{app.applicationNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">About You</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {app.aboutYou}
                  </p>
                </div>

                {app.attachmentUrl && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground mb-2">Attachment</h4>
                    <a
                      href={app.attachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      {app.attachmentName || 'View Attachment'}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'contacts':
        return (
          <div className="space-y-6">
            {data?.contacts?.map((contact: any) => (
              <div key={contact.id} className="p-6 bg-background/50 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{contact.name}</h3>
                    <p className="text-muted-foreground">{contact.projectType}</p>
                  </div>
                  <Badge variant="outline">
                    {contact.budget}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{contact.mobile}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">Project Details</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {contact.projectDetails}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Message</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {contact.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'visitors':
        return (
          <div className="space-y-6">
            {data?.visitors?.map((visitor: any) => (
              <div key={visitor.id} className="p-6 bg-background/50 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{visitor.country || 'Unknown'}</h3>
                    <p className="text-muted-foreground">{visitor.city || 'N/A'}</p>
                  </div>
                  <Badge variant="outline">
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
                      <span className="font-medium text-foreground">Country:</span>
                      <span className="text-muted-foreground ml-2">{visitor.country || 'Unknown'}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-foreground">City:</span>
                      <span className="text-muted-foreground ml-2">{visitor.city || 'N/A'}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-foreground">Region:</span>
                      <span className="text-muted-foreground ml-2">{visitor.region || 'N/A'}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-foreground">Organization:</span>
                      <span className="text-muted-foreground ml-2">{visitor.org || 'N/A'}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-foreground">Timezone:</span>
                      <span className="text-muted-foreground ml-2">{visitor.timezone || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'consultations':
        return (
          <div className="space-y-6">
            {data?.consultations?.map((consultation: any) => (
              <div key={consultation.id} className="p-6 bg-background/50 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{consultation.name}</h3>
                    <p className="text-muted-foreground">Consultation Request</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {consultation.voiceUrl && (
                      <Badge variant="outline" className="text-xs">
                        Voice Message Available
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

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Message</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {consultation.message}
                  </p>
                </div>

                {consultation.voiceUrl && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-foreground mb-2">Voice Message</h4>
                    <audio controls className="w-full">
                      <source src={consultation.voiceUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return (
      <LoginModal
        isOpen={showLogin}
        onLogin={handleLogin}
        isLoading={loginLoading}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-lg text-muted-foreground font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto p-6 lg:p-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Monitor your business metrics and activities</p>
            </div>
            <div className="flex items-center gap-3">
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
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Lock className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card
            className="bg-card/60 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => openDetailModal('applications', 'Job Applications')}
          >
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

          <Card
            className="bg-card/60 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => openDetailModal('applications', 'Active Applications')}
          >
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

          <Card
            className="bg-card/60 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => openDetailModal('visitors', 'Recent Visitors')}
          >
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

          <Card
            className="bg-card/60 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => openDetailModal('consultations', 'Recent Consultations')}
          >
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
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Job Applications */}
          <Card className="bg-card/60 backdrop-blur-sm border-0 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-foreground">Job Applications</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openDetailModal('applications', 'Job Applications')}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {data?.jobApplications?.slice(0, 2).map((app: any) => (
                <div key={app.id} className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{app.fullName}</h3>
                      <p className="text-sm text-muted-foreground">{app.areaOfExpertise}</p>
                    </div>
                    <Badge className={`text-xs ${getStatusColor(app.status)}`}>
                      {app.status}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      <span>{app.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      <span>{app.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{app.yearsOfExperience} years experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Contact Submissions */}
          <Card className="bg-card/60 backdrop-blur-sm border-0 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-foreground">Contact Submissions</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openDetailModal('contacts', 'Contact Submissions')}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {data?.contacts?.slice(0, 2).map((contact: any) => (
                <div key={contact.id} className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{contact.name}</h3>
                      <p className="text-sm text-muted-foreground">{contact.projectType}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {contact.budget}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      <span>{contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      <span>{contact.mobile}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Visitors */}
          <Card className="bg-card/60 backdrop-blur-sm border-0 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-foreground">Recent Visitors</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openDetailModal('visitors', 'Recent Visitors')}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {data?.visitors?.slice(0, 2).map((visitor: any) => (
                <div key={visitor.id} className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{visitor.country || 'Unknown'}</h3>
                      <p className="text-sm text-muted-foreground">{visitor.city || 'N/A'}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {visitor.visitCount} visits
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{visitor.ip}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(visitor.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Consultations */}
          <Card className="bg-card/60 backdrop-blur-sm border-0 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-foreground">Consultations</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openDetailModal('consultations', 'Consultations')}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {data?.consultations?.slice(0, 2).map((consultation: any) => (
                <div key={consultation.id} className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{consultation.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {consultation.message}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      <span>{consultation.email}</span>
                    </div>
                    {consultation.phone && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{consultation.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(consultation.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detail Modal */}
      <DetailModal
        isOpen={detailModal.isOpen}
        onClose={closeDetailModal}
        title={detailModal.title}
      >
        {renderDetailContent()}
      </DetailModal>
    </div>
  );
}
