import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { getAllCategoriesForDashboard } from '../actions/getCategories';

export default async function CategoriesPage() {
  const { categories } = await getAllCategoriesForDashboard();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Blog Categories</h1>
          <p className="text-muted-foreground">Manage blog post categories</p>
        </div>
        <Link href="/dashboard/blog">
          <Button variant="outline">Back to Posts</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Categories ({categories?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {!categories || categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No categories yet</p>
              <p className="text-sm text-muted-foreground">
                Use Prisma Studio to add categories
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{category.nameEn}</h3>
                      <Badge variant={category.isActive ? 'default' : 'secondary'}>
                        {category.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{category.nameAr}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Slug: {category.slugEn} / {category.slugAr}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground px-3">
                      Order: {category.displayOrder}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h3 className="font-semibold mb-2">💡 Managing Categories</h3>
        <p className="text-sm text-muted-foreground">
          Currently, categories are managed via Prisma Studio. Run <code className="bg-background px-2 py-1 rounded">npx prisma studio</code> to add, edit, or remove categories.
        </p>
      </div>
    </div>
  );
}


