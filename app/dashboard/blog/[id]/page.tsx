import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BlogForm } from '../components/BlogForm';
import { getBlogPostById } from '../actions/getBlogPosts';
import { getAllCategoriesForDashboard } from '../actions/getCategories';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params;
  const [postResult, categoriesResult] = await Promise.all([
    getBlogPostById(id),
    getAllCategoriesForDashboard(),
  ]);

  if (!postResult.success || !postResult.post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Blog Post</h1>
        <p className="text-muted-foreground">Update the blog post content and settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
          <CardDescription>
            Edit the blog post in both English and Arabic
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BlogForm
            initialData={postResult.post}
            isEditing
            categories={categoriesResult.categories || []}
          />
        </CardContent>
      </Card>
    </div>
  );
}


