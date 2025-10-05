'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { togglePageMetadataStatus, deletePageMetadata } from '@/lib/actions/metadataActions';
import { toast } from 'sonner';

type PageMetadata = {
  id: string;
  pagePath: string;
  pageName: string;
  titleEn: string;
  titleAr: string;
  isActive: boolean;
  updatedAt: Date;
};

type MetadataTableProps = {
  data: PageMetadata[];
};

export function MetadataTable({ data }: MetadataTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [metadata, setMetadata] = useState(data);

  const filteredData = metadata.filter(
    (item) =>
      item.pageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.pagePath.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.titleAr.includes(searchTerm)
  );

  const handleToggleStatus = async (pagePath: string) => {
    const result = await togglePageMetadataStatus(pagePath);
    if (result.success) {
      setMetadata((prev) =>
        prev.map((item) =>
          item.pagePath === pagePath
            ? { ...item, isActive: !item.isActive }
            : item
        )
      );
      toast.success('Status updated successfully');
    } else {
      toast.error(result.error || 'Failed to update status');
    }
  };

  const handleDelete = async (pagePath: string, pageName: string) => {
    if (!confirm(`Are you sure you want to delete metadata for "${pageName}"?`)) {
      return;
    }

    const result = await deletePageMetadata(pagePath);
    if (result.success) {
      setMetadata((prev) => prev.filter((item) => item.pagePath !== pagePath));
      toast.success('Metadata deleted successfully');
    } else {
      toast.error(result.error || 'Failed to delete metadata');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <Input
          placeholder="Search by page name, path, or title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-h-[44px] text-base"
        />
        <Badge variant="secondary" className="self-start sm:self-auto shrink-0">
          {filteredData.length} of {metadata.length} pages
        </Badge>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Page Name</TableHead>
              <TableHead>Path</TableHead>
              <TableHead>Title (EN)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No pages found
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.pageName}</TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {item.pagePath}
                    </code>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {item.titleEn}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={item.isActive}
                        onCheckedChange={() => handleToggleStatus(item.pagePath)}
                      />
                      <span className="text-sm">
                        {item.isActive ? (
                          <Badge variant="default">Active</Badge>
                        ) : (
                          <Badge variant="secondary">Inactive</Badge>
                        )}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/dashboard/metadata/${encodeURIComponent(item.pagePath)}`}>
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(item.pagePath, item.pageName)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {filteredData.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No pages found
          </div>
        ) : (
          filteredData.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base break-words">{item.pageName}</h3>
                  <code className="text-xs bg-muted px-2 py-1 rounded break-all inline-block mt-1">
                    {item.pagePath}
                  </code>
                </div>
                <Badge variant={item.isActive ? "default" : "secondary"} className="shrink-0">
                  {item.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Title (EN):</span>
                  <p className="font-medium line-clamp-2 mt-1">{item.titleEn}</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  Updated: {new Date(item.updatedAt).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={item.isActive}
                    onCheckedChange={() => handleToggleStatus(item.pagePath)}
                  />
                  <span className="text-xs text-muted-foreground">Toggle</span>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="default" className="min-h-[44px] text-sm">
                    <Link href={`/dashboard/metadata/${encodeURIComponent(item.pagePath)}`}>
                      Edit
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="default"
                    className="min-h-[44px] text-sm"
                    onClick={() => handleDelete(item.pagePath, item.pageName)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}






