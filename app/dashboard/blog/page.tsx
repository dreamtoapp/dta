import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { getAllBlogPostsForDashboard } from './actions/getBlogPosts';
import { deleteBlogPost } from './actions/deleteBlogPost';
import { formatDate } from '@/app/[locale]/blog/helpers/utils';
import { TweetButton } from './components/TweetButton';

export default async function BlogDashboardPage() {
  const { posts } = await getAllBlogPostsForDashboard();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">Manage blog posts and categories</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/blog/categories">
            <Button variant="outline">Manage Categories</Button>
          </Link>
          <Link href="/dashboard/blog/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Blog Posts ({posts?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {!posts || posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No blog posts yet</p>
              <Link href="/dashboard/blog/new">
                <Button>Create First Post</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{post.titleEn}</h3>
                      <Badge
                        variant="outline"
                        className="border-0"
                        style={{
                          backgroundColor:
                            post.status === 'PUBLISHED'
                              ? 'hsl(var(--success-soft-background))'
                              : post.status === 'DRAFT'
                                ? 'hsl(var(--neutral-soft-background))'
                                : 'hsl(var(--warning-soft-background))',
                          color:
                            post.status === 'PUBLISHED'
                              ? 'hsl(var(--success-foreground))'
                              : post.status === 'DRAFT'
                                ? 'hsl(var(--neutral-foreground))'
                                : 'hsl(var(--warning-foreground))',
                        }}
                      >
                        {post.status}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-0"
                        style={{
                          backgroundColor: 'hsl(var(--info-soft-background))',
                          color: 'hsl(var(--info-foreground))',
                        }}
                      >
                        {post.category.nameEn}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{post.titleAr}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{post.views} views</span>
                      <span>{post.readingTime} min read</span>
                      {post.publishedAt && (
                        <span>Published: {formatDate(post.publishedAt, 'en')}</span>
                      )}
                    </div>

                    {/* Data quality badges */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {!post.featuredImage && (
                        <Badge
                          variant="outline"
                          className="border-0"
                          style={{
                            backgroundColor: 'hsl(var(--info-soft-background))',
                            color: 'hsl(var(--info-foreground))',
                          }}
                        >
                          No image
                        </Badge>
                      )}
                      {/* Treat SEO as OK if excerpt exists (we fallback to it in OG). */}
                      {(!post.excerptEn || post.excerptEn.trim() === '') && (
                        <Badge
                          variant="outline"
                          className="border-0"
                          style={{
                            backgroundColor: 'hsl(var(--warning-soft-background))',
                            color: 'hsl(var(--warning-foreground))',
                          }}
                        >
                          Missing EN SEO
                        </Badge>
                      )}
                      {(!post.excerptAr || post.excerptAr.trim() === '') && (
                        <Badge
                          variant="outline"
                          className="border-0"
                          style={{
                            backgroundColor: 'hsl(var(--warning-soft-background))',
                            color: 'hsl(var(--warning-foreground))',
                          }}
                        >
                          Missing AR SEO
                        </Badge>
                      )}
                      {((!post.excerptEn || post.excerptEn.trim() === '') || (!post.excerptAr || post.excerptAr.trim() === '')) && (
                        <Badge
                          variant="outline"
                          className="border-0"
                          style={{
                            backgroundColor: 'hsl(var(--neutral-soft-background))',
                            color: 'hsl(var(--neutral-foreground))',
                          }}
                        >
                          Missing excerpt
                        </Badge>
                      )}
                      {((!post.slugEn || post.slugEn.trim() === '') || (!post.slugAr || post.slugAr.trim() === '')) && (
                        <Badge
                          variant="outline"
                          className="border-0"
                          style={{
                            backgroundColor: 'hsl(var(--danger-soft-background))',
                            color: 'hsl(var(--danger-foreground))',
                          }}
                        >
                          Missing slug
                        </Badge>
                      )}
                      {post.status === 'PUBLISHED' && !post.publishedAt && (
                        <Badge
                          variant="outline"
                          className="border-0"
                          style={{
                            backgroundColor: 'hsl(var(--special-soft-background))',
                            color: 'hsl(var(--special-foreground))',
                          }}
                        >
                          No publish date
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/en/blog/${post.slugEn}`} target="_blank">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <TweetButton
                      postId={post.id}
                      titleEn={post.titleEn}
                      titleAr={post.titleAr}
                      excerptEn={post.excerptEn}
                      excerptAr={post.excerptAr}
                      slugEn={post.slugEn}
                      slugAr={post.slugAr}
                      tags={post.tags}
                      featuredImage={post.featuredImage}
                    />
                    <Link href={`/dashboard/blog/${post.id}`}>
                      <Button variant="ghost" size="sm">
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </Link>
                    <form action={deleteBlogPost.bind(null, post.id)}>
                      <Button variant="ghost" size="sm" type="submit">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
