"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CromboForm from './CromboForm';

interface CromboDialogProps {
  name: string;
  title: string;
}

export default function CromboDialog({ name, title }: CromboDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSuccess = () => {
    setMessage("✅ تم إرسال بياناتك بنجاح!");
    setTimeout(() => {
      handleClose();
      setMessage("");
    }, 3000);
  };

  const handleError = (errorMessage: string) => {
    setMessage(errorMessage);
  };

  return (
    <>
      {/* Action Button */}
      <Button
        onClick={handleOpen}
        className="bg-gradient-to-r from-[#d7a50d] to-[#f4c430] hover:from-[#f4c430] hover:to-[#d7a50d] text-white text-base sm:text-lg lg:text-xl font-bold px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 rounded-xl shadow-2xl hover:shadow-[#d7a50d]/25 transition-all duration-300 ease-in-out hover:scale-105 transform"
      >
        <span className="text-base sm:text-lg lg:text-xl font-semibold">احصل على الخدمة مجاناً</span>
      </Button>

      {/* Dialog */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-2xl shadow-2xl border border-border">
              {/* Header */}
              <div className="sticky top-0 flex items-center justify-between p-4 sm:p-6 border-b border-border bg-background/95 backdrop-blur-sm rounded-t-2xl">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0d3ad7] to-[#d7a50d]">
                    {name}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {title}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="h-8 w-8 rounded-full hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <CromboForm onSuccess={handleSuccess} onError={handleError} />

                {message && (
                  <div className="mt-4 p-4 rounded-lg text-center"
                    style={{
                      backgroundColor: message.includes("success")
                        ? "rgba(34, 197, 94, 0.1)"
                        : "rgba(239, 68, 68, 0.1)",
                      color: message.includes("success") ? "#22c55e" : "#ef4444"
                    }}
                  >
                    <p className="font-medium text-sm sm:text-base">{message}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
} 