import Link from '@/components/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FolderX, ArrowLeft } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations("gallery");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto text-center">
        <Card className="p-8 border-muted bg-muted/5">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
            <FolderX className="w-8 h-8 text-muted-foreground" />
          </div>

          <h2 className="text-xl font-semibold text-foreground mb-2">
            Gallery Not Found
          </h2>

          <p className="text-muted-foreground mb-6">
            The gallery you're looking for doesn't exist or has been moved.
          </p>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href={`/${locale}/worksample`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
} 