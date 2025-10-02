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
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search by page name, path, or title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Badge variant="secondary">
          {filteredData.length} of {metadata.length} pages
        </Badge>
      </div>

      <div className="border rounded-lg">
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
    </div>
  );
}


