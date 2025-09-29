"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Eye,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  FileText,
  BarChart3,
  Star,
  Sun,
  Moon
} from 'lucide-react';

interface DashboardSidebarProps {
  stats?: {
    totalJobApplications: number;
    activeJobApplications: number;
    totalVisitors: number;
    recentSubmissions: number;
    totalProjects: number;
    totalConsultations: number;
    totalInfluencers?: number;
    totalTeamMembers?: number;
  };
  loadStats?: () => Promise<void>;
}

export default function DashboardSidebar({ stats, loadStats }: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();


  const navigation = [
    {
      name: 'Overview',
      href: '/dashboard',
      icon: LayoutDashboard,
      current: pathname === '/dashboard'
    },
    {
      name: 'Job Applications',
      href: '/dashboard/applications',
      icon: Briefcase,
      current: pathname === '/dashboard/applications',
      badge: stats?.totalJobApplications
    },
    {
      name: 'Project Requests',
      href: '/dashboard/projects',
      icon: FileText,
      current: pathname === '/dashboard/projects',
      badge: stats?.totalProjects
    },
    {
      name: 'Influencers',
      href: '/dashboard/influencers',
      icon: Star,
      current: pathname === '/dashboard/influencers' || pathname.startsWith('/dashboard/influencers/'),
      badge: stats?.totalInfluencers
    },
    {
      name: 'Team',
      href: '/dashboard/team',
      icon: Users,
      current: pathname === '/dashboard/team' || pathname.startsWith('/dashboard/team/'),
      badge: stats?.totalTeamMembers
    },
    {
      name: 'Consultations',
      href: '/dashboard/consultations',
      icon: MessageSquare,
      current: pathname === '/dashboard/consultations',
      badge: stats?.totalConsultations
    },
    {
      name: 'Visitors',
      href: '/dashboard/visitors',
      icon: Eye,
      current: pathname === '/dashboard/visitors',
      badge: stats?.totalVisitors
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
      current: pathname === '/dashboard/settings'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('dashboard_authenticated');
    window.location.href = '/dashboard';
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="bg-background/80 backdrop-blur-sm"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0",
        isCollapsed ? "-translate-x-full" : "translate-x-0"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">Dashboard</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="h-8 w-8"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    item.current
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-border p-3">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
}
