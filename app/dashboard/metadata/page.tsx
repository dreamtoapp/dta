import { getAllPageMetadata } from '@/lib/actions/metadataActions';
import { MetadataTable } from './components/MetadataTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'SEO Metadata Management',
  description: 'Manage SEO metadata for all pages',
};

export default async function MetadataManagementPage() {
  const allMetadata = await getAllPageMetadata();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">SEO Metadata Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage SEO metadata for all {allMetadata.length} pages
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/metadata/new">Add New Page</Link>
        </Button>
      </div>

      <MetadataTable data={allMetadata} />
    </div>
  );
}






