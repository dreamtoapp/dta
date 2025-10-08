import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { getFAQs } from './actions/getFAQs';
import type { FAQListItem } from './actions/getFAQs';
import { deleteFAQ } from './actions/deleteFAQ';
import { toast } from 'sonner';

async function FAQList() {
  const result = await getFAQs();

  if (!result.success || result.data.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-4">No FAQs found</p>
          <Link href="/dashboard/faqs/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create First FAQ
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  const faqs = result.data as FAQListItem[];

  const groupedFAQs = faqs.reduce((acc, faq) => {
    if (!acc[faq.pagePath]) {
      acc[faq.pagePath] = [] as FAQListItem[];
    }
    acc[faq.pagePath].push(faq);
    return acc;
  }, {} as Record<string, FAQListItem[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedFAQs).map(([pagePath, faqs]) => (
        <Card key={pagePath}>
          <CardHeader>
            <CardTitle className="text-lg">
              {pagePath === '/' ? 'Homepage' : pagePath.replace('/', '').charAt(0).toUpperCase() + pagePath.slice(2)}
            </CardTitle>
            <CardDescription>{faqs.length} FAQs</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question (EN)</TableHead>
                  <TableHead>Question (AR)</TableHead>
                  <TableHead className="w-[100px]">Order</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead className="w-[100px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faqs.map((faq) => (
                  <TableRow key={faq.id}>
                    <TableCell className="font-medium max-w-[300px] truncate">
                      {faq.questionEn}
                    </TableCell>
                    <TableCell className="max-w-[300px] truncate" dir="rtl">
                      {faq.questionAr}
                    </TableCell>
                    <TableCell>{faq.displayOrder}</TableCell>
                    <TableCell>
                      <Badge variant={faq.isActive ? 'default' : 'secondary'}>
                        {faq.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/dashboard/faqs/${faq.id}`}>
                          <Button variant="ghost" size="icon">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        <form
                          action={async () => {
                            'use server';
                            await deleteFAQ(faq.id);
                          }}
                        >
                          <Button variant="ghost" size="icon" type="submit">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </form>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function FAQsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">FAQs Management</h1>
          <p className="text-muted-foreground">
            Manage frequently asked questions across your website
          </p>
        </div>
        <Link href="/dashboard/faqs/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New FAQ
          </Button>
        </Link>
      </div>

      <Suspense
        fallback={
          <Card>
            <CardContent className="py-12 flex items-center justify-center">
              <p className="text-muted-foreground">Loading FAQs...</p>
            </CardContent>
          </Card>
        }
      >
        <FAQList />
      </Suspense>
    </div>
  );
}
