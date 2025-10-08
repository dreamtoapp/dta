import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BlogForm } from '../components/BlogForm';
import { getAllCategoriesForDashboard } from '../actions/getCategories';

export default async function NewBlogPostPage() {
  const categoriesResult = await getAllCategoriesForDashboard();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create New Blog Post</h1>
        <p className="text-muted-foreground">Write a new blog post in both languages</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
          <CardDescription>
            Fill in all fields for both English and Arabic versions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BlogForm categories={categoriesResult.categories || []} />
        </CardContent>
      </Card>
    </div>
  );
}

