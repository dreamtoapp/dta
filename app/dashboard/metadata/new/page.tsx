import { MetadataForm } from '../components/MetadataForm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Add New Page Metadata',
  description: 'Create metadata for a new page',
};

export default function NewMetadataPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Add New Page</h1>
          <p className="text-muted-foreground mt-1">
            Create SEO metadata for a new page
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/dashboard/metadata">Back to List</Link>
        </Button>
      </div>

      <MetadataForm isEditing={false} />
    </div>
  );
}


