import { getPageMetadata } from '@/lib/actions/metadataActions';
import { MetadataForm } from '../components/MetadataForm';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function EditMetadataPage({
  params,
}: {
  params: Promise<{ pagePath: string }>;
}) {
  const { pagePath } = await params;
  const decodedPath = decodeURIComponent(pagePath);

  const metadata = await getPageMetadata(decodedPath);

  if (!metadata) {
    notFound();
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Edit Metadata</h1>
          <p className="text-muted-foreground mt-1">
            Update SEO metadata for: <code className="bg-muted px-2 py-1 rounded">{decodedPath}</code>
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/dashboard/metadata">Back to List</Link>
        </Button>
      </div>

      <MetadataForm
        initialData={metadata}
        isEditing={true}
      />
    </div>
  );
}


