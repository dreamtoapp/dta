"use client";

import React from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { FolderOpen } from 'lucide-react';

interface FiltersProps {
  folders: string[];
  value: string;
  onChange: (folder: string) => void;
}

export default function Filters({ folders, value, onChange }: FiltersProps) {
  return (
    <Card className="border-0 shadow-sm bg-card/50 backdrop-blur-sm">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <FolderOpen className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Categories</h3>
          <Badge variant="secondary" className="ml-auto text-xs">
            {folders.length}
          </Badge>
        </div>

        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2 pb-2">
            {folders.map((folder) => (
              <button
                key={folder}
                onClick={() => onChange(folder)}
                className={`
                  inline-flex items-center justify-center px-4 py-2 rounded-lg 
                  text-sm font-medium transition-all duration-200
                  border whitespace-nowrap
                  ${value === folder
                    ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105'
                    : 'bg-background/60 text-foreground border-border hover:bg-accent hover:text-accent-foreground hover:border-accent hover:shadow-sm'
                  }
                `}
              >
                {folder}
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="h-2" />
        </ScrollArea>
      </div>
    </Card>
  );
}
