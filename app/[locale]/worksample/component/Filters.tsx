"use client";

import React from 'react';

interface FiltersProps {
  folders: string[];
  value: string;
  onChange: (folder: string) => void;
}

export default function Filters({ folders, value, onChange }: FiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onChange('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${value === 'all' || value === ''
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
      >
        All
      </button>
      {folders.map((folder) => (
        <button
          key={folder}
          onClick={() => onChange(folder)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${value === folder
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
        >
          {folder}
        </button>
      ))}
    </div>
  );
}
