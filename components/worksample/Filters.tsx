"use client";

import React, { useEffect, useRef, useState } from 'react';

interface FiltersProps {
  folders: string[];
  value: string; // 'all' or folder name
  onChange: (next: string) => void;
}

export default function Filters({ folders, value, onChange }: FiltersProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <div className="flex justify-end mb-4">
      <div className="relative inline-block text-left z-50" ref={menuRef}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm bg-background hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
          aria-haspopup="menu"
          aria-expanded={open}
        >
          {value === 'all' ? 'All' : value}
          <span aria-hidden>▾</span>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg border bg-popover shadow-lg p-1 z-50">
            <button
              className={`w-full text-left px-3 py-2 rounded-md hover:bg-muted ${value === 'all' ? 'font-semibold' : ''}`}
              onClick={() => { onChange('all'); setOpen(false); }}
            >
              All
            </button>
            {folders.map((f) => (
              <button
                key={f}
                className={`w-full text-left px-3 py-2 rounded-md hover:bg-muted ${value === f ? 'font-semibold' : ''}`}
                onClick={() => { onChange(f); setOpen(false); }}
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
