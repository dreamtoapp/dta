'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { BlogStatus } from '@prisma/client';
import { createBlogPost } from '../actions/createBlogPost';
import { updateBlogPost } from '../actions/updateBlogPost';
import { generateSlug, calculateReadingTime } from '@/app/[locale]/blog/helpers/utils';

const formSchema = z.object({
  titleEn: z.string().min(1, 'English title required').max(60, 'Max 60 characters'),
  titleAr: z.string().min(1, 'Arabic title required').max(60, 'بحد أقصى 60 حرفًا'),
  slugEn: z.string().min(1, 'English slug required'),
  slugAr: z.string().min(1, 'Arabic slug required'),
  excerptEn: z.string().min(10, 'English excerpt required (min 10 chars)').max(160, 'Max 160 characters'),
  excerptAr: z.string().min(10, 'Arabic excerpt required (min 10 chars)').max(160, 'بحد أقصى 160 حرفًا'),
  contentEn: z.string().min(50, 'English content required (min 50 chars)'),
  contentAr: z.string().min(50, 'Arabic content required (min 50 chars)'),
  categoryId: z.string().min(1, 'Category required'),
  tags: z.string(),
  status: z.nativeEnum(BlogStatus),
  author: z.string().default('DreamToApp Team'),
  metaTitleEn: z.string().default(''),
  metaTitleAr: z.string().default(''),
  metaDescriptionEn: z.string().default(''),
  metaDescriptionAr: z.string().default(''),
  featuredImage: z.string().default(''),
  imageAlt: z.string().default(''),
}).superRefine((data, ctx) => {
  // Strict SEO requirements for Published posts
  if (data.status === BlogStatus.PUBLISHED) {
    if (!data.featuredImage || data.featuredImage.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['featuredImage'],
        message: 'Featured image is required for published posts',
      });
    }

    // Use DRY fallbacks (title/excerpt) when checking required meta fields
    const effectiveMetaTitleEn = (data.metaTitleEn?.trim() || data.titleEn?.trim() || '');
    const effectiveMetaTitleAr = (data.metaTitleAr?.trim() || data.titleAr?.trim() || '');
    const effectiveMetaDescEn = (data.metaDescriptionEn?.trim() || data.excerptEn?.trim() || '');
    const effectiveMetaDescAr = (data.metaDescriptionAr?.trim() || data.excerptAr?.trim() || '');

    if (effectiveMetaTitleEn === '') {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['metaTitleEn'], message: 'Meta Title (EN) is required' });
    }
    if (effectiveMetaDescEn === '') {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['metaDescriptionEn'], message: 'Meta Description (EN) is required' });
    }
    if (effectiveMetaTitleAr === '') {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['metaTitleAr'], message: 'Meta Title (AR) is required' });
    }
    if (effectiveMetaDescAr === '') {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['metaDescriptionAr'], message: 'Meta Description (AR) is required' });
    }
  }
});

type FormValues = z.infer<typeof formSchema>;

interface BlogFormProps {
  initialData?: any;
  isEditing?: boolean;
  categories: Array<{ id: string; nameEn: string; nameAr: string }>;
}

export function BlogForm({ initialData, isEditing, categories }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      titleEn: initialData?.titleEn || '',
      titleAr: initialData?.titleAr || '',
      slugEn: initialData?.slugEn || '',
      slugAr: initialData?.slugAr || '',
      excerptEn: initialData?.excerptEn || '',
      excerptAr: initialData?.excerptAr || '',
      contentEn: initialData?.contentEn || '',
      contentAr: initialData?.contentAr || '',
      categoryId: initialData?.categoryId || '',
      tags: initialData?.tags?.join(', ') || '',
      status: initialData?.status || BlogStatus.DRAFT,
      author: initialData?.author || 'DreamToApp Team',
      metaTitleEn: initialData?.metaTitleEn || '',
      metaTitleAr: initialData?.metaTitleAr || '',
      metaDescriptionEn: initialData?.metaDescriptionEn || '',
      metaDescriptionAr: initialData?.metaDescriptionAr || '',
      featuredImage: initialData?.featuredImage || '',
      imageAlt: initialData?.imageAlt || '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log('Form submit triggered', { isEditing, values });
    setLoading(true);
    try {
      // DRY defaults: Meta Title <- Title, Meta Description <- Excerpt (EN/AR)
      const metaTitleEn = values.metaTitleEn?.trim() || values.titleEn?.trim();
      const metaTitleAr = values.metaTitleAr?.trim() || values.titleAr?.trim();
      const metaDescriptionEn = values.metaDescriptionEn?.trim() || values.excerptEn?.trim();
      const metaDescriptionAr = values.metaDescriptionAr?.trim() || values.excerptAr?.trim();

      // Soft length guards (SEO best practices)
      const clamp = (s: string | undefined, n: number) => (s ? (s.length > n ? s.slice(0, n) : s) : s);

      const tagsArray = values.tags.split(',').map(t => t.trim()).filter(Boolean);
      const readingTime = calculateReadingTime(values.contentEn);

      const data = {
        ...values,
        tags: tagsArray,
        readingTime,
        featuredImage: values.featuredImage || null,
        imageAlt: values.imageAlt || null,
        metaTitleEn: clamp(metaTitleEn, 60),
        metaTitleAr: clamp(metaTitleAr, 60),
        metaDescriptionEn: clamp(metaDescriptionEn, 160),
        metaDescriptionAr: clamp(metaDescriptionAr, 160),
      };

      console.log('Submitting data:', data);

      const result = isEditing
        ? await updateBlogPost(initialData.id, data)
        : await createBlogPost(data);

      console.log('Result:', result);

      if (result.success) {
        toast.success(result.message);
        router.push('/dashboard/blog');
        router.refresh();
      } else {
        toast.error(result.error || 'Operation failed');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate slugs from titles
  const handleTitleChange = (field: 'titleEn' | 'titleAr', value: string) => {
    form.setValue(field, value);
    const slugField = field === 'titleEn' ? 'slugEn' : 'slugAr';
    if (!isEditing || !form.getValues(slugField)) {
      form.setValue(slugField, generateSlug(value));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
        console.log('Validation errors:', errors);
        toast.error('Please fix validation errors before submitting');
      })} className="space-y-6">
        <Tabs defaultValue="english" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="english">English</TabsTrigger>
            <TabsTrigger value="arabic">Arabic</TabsTrigger>
          </TabsList>

          <TabsContent value="english" className="space-y-4">
            <FormField
              control={form.control}
              name="titleEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title (English)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => handleTitleChange('titleEn', e.target.value)}
                      placeholder="Getting Started with Next.js 15"
                      maxLength={60}
                    />
                  </FormControl>
                  <div className="text-xs text-muted-foreground mt-1">
                    {form.watch('titleEn')?.length || 0}/60
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slugEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug (English)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="nextjs-15-getting-started" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerptEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt (English)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Short description (150-160 chars)"
                      rows={3}
                      maxLength={160}
                    />
                  </FormControl>
                  <div className="text-xs text-muted-foreground mt-1">
                    {form.watch('excerptEn')?.length || 0}/160
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contentEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content (English)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Full blog post content..."
                      rows={15}
                      className="font-mono"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metaTitleEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Title (English) - Optional</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="SEO title (60 chars max)" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metaDescriptionEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description (English) - Optional</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="SEO description (150-160 chars)"
                      rows={2}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="arabic" className="space-y-4">
            <FormField
              control={form.control}
              name="titleAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العنوان (عربي)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => handleTitleChange('titleAr', e.target.value)}
                      placeholder="البدء مع Next.js 15"
                      dir="rtl"
                      maxLength={60}
                    />
                  </FormControl>
                  <div className="text-xs text-muted-foreground mt-1 text-right" dir="rtl">
                    {form.watch('titleAr')?.length || 0}/60
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slugAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الرابط (عربي)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="البدء-مع-nextjs-15" dir="rtl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerptAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المقتطف (عربي)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="وصف قصير (150-160 حرف)"
                      rows={3}
                      dir="rtl"
                      maxLength={160}
                    />
                  </FormControl>
                  <div className="text-xs text-muted-foreground mt-1 text-right" dir="rtl">
                    {form.watch('excerptAr')?.length || 0}/160
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contentAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المحتوى (عربي)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="محتوى المقالة الكامل..."
                      rows={15}
                      className="font-mono"
                      dir="rtl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metaTitleAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان SEO (عربي) - اختياري</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="عنوان SEO (60 حرف كحد أقصى)" dir="rtl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metaDescriptionAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>وصف SEO (عربي) - اختياري</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="وصف SEO (150-160 حرف)"
                      rows={2}
                      dir="rtl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>

        {/* Common Fields */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.nameEn} / {cat.nameAr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags (comma-separated)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="nextjs, react, web-development"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="DreamToApp Team" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="featuredImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Featured Image URL (Optional)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://res.cloudinary.com/..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageAlt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Alt Text (Optional)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Description for accessibility" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={BlogStatus.DRAFT}>Draft</SelectItem>
                    <SelectItem value={BlogStatus.PUBLISHED}>Published</SelectItem>
                    <SelectItem value={BlogStatus.ARCHIVED}>Archived</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard/blog')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
