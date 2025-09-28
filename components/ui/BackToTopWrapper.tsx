"use client";

import { useState, useEffect } from 'react';

const BackToTopWrapper: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      try {
        // Show button when user scrolls down more than 300px
        if (window.scrollY > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } catch (error) {
        console.warn('Error toggling back to top visibility:', error);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', toggleVisibility);

      // Cleanup
      return () => window.removeEventListener('scroll', toggleVisibility);
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={() => {
        try {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
          console.warn('Error scrolling to top:', error);
          // Fallback to instant scroll
          window.scrollTo(0, 0);
        }
      }}
      className="fixed bottom-24 right-4 md:bottom-6 md:right-6 w-12 h-12 bg-primary/90 backdrop-blur-sm text-white rounded-full shadow-xl hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background transition-all duration-300 hover:scale-110 z-40 md:z-50 border border-primary/20"
      aria-label="Back to top"
    >
      <svg
        className="w-5 h-5 mx-auto"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
};

export default BackToTopWrapper; 