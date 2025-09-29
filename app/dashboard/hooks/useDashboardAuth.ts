"use client";

import { useState, useEffect } from 'react';
import { toast } from "sonner";

interface DashboardStats {
  totalJobApplications: number;
  activeJobApplications: number;
  totalVisitors: number;
  recentSubmissions: number;
  totalProjects: number;
  totalConsultations: number;
  totalInfluencers?: number;
}

export function useDashboardAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const authStatus = localStorage.getItem('dashboard_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      setShowLogin(false);
      loadStats();
    }
  }, []);

  const loadStats = async () => {
    try {
      const { getDashboardStats } = await import('../action/action');
      const data = await getDashboardStats();
      setStats(data.stats);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

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
        localStorage.setItem('dashboard_authenticated', 'true');
        toast.success('Access granted!');
        loadStats();
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
    setStats(null);
    localStorage.removeItem('dashboard_authenticated');
  };

  return {
    isAuthenticated,
    showLogin,
    loginLoading,
    stats,
    handleLogin,
    handleLogout,
    loadStats,
    setStats
  };
}
