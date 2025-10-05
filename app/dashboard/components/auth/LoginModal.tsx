"use client";

import { useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginModalProps {
  isOpen: boolean;
  onLogin: (password: string) => void;
  isLoading: boolean;
}

export default function LoginModal({ isOpen, onLogin, isLoading }: LoginModalProps) {
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card rounded-lg shadow-xl border p-6 sm:p-8">
        <div className="text-center mb-6">
          <Lock className="h-12 w-12 sm:h-14 sm:w-14 text-primary mx-auto mb-3" />
          <h2 className="text-xl sm:text-2xl font-bold">Dashboard Access</h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">Enter password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            disabled={isLoading}
            autoFocus
            className="min-h-[44px] text-base"
          />

          <Button
            type="submit"
            className="w-full min-h-[44px] text-base"
            disabled={!password.trim() || isLoading}
          >
            {isLoading ? 'Verifying...' : 'Access Dashboard'}
          </Button>
        </form>
      </div>
    </div>
  );
}
