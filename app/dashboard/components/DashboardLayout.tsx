"use client";

import DashboardSidebar from './DashboardSidebar';
import LoginModal from './auth/LoginModal';
import { useDashboardAuth } from '../hooks/useDashboardAuth';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const {
    isAuthenticated,
    showLogin,
    loginLoading,
    stats,
    handleLogin,
    loadStats
  } = useDashboardAuth();

  if (!isAuthenticated) {
    return (
      <LoginModal
        isOpen={showLogin}
        onLogin={handleLogin}
        isLoading={loginLoading}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted min-w-0" dir="ltr">
      <DashboardSidebar stats={stats || undefined} loadStats={loadStats} />
      <div className="lg:pl-64 min-h-screen min-w-0">
        <main className="p-4 sm:p-6 lg:p-8 min-h-screen min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
