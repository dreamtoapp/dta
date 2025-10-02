'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { upsertPageMetadata } from '@/lib/actions/metadataActions';
import { toast } from 'sonner';
import type { PageMetadata } from '@prisma/client';

const metadataSchema = z.object({
  pagePath: z.string().min(1, 'Page path is required'),
  pageName: z.string().min(1, 'Page name is required'),
  titleEn: z.string().min(1, 'English title is required').max(70, 'Title should be under 70 characters'),
  titleAr: z.string().min(1, 'Arabic title is required').max(70, 'Title should be under 70 characters'),
  descriptionEn: z.string().min(1, 'English description is required').max(160, 'Description should be under 160 characters'),
  descriptionAr: z.string().min(1, 'Arabic description is required').max(160, 'Description should be under 160 characters'),
  keywordsEn: z.string().optional(),
  keywordsAr: z.string().optional(),
  ogTitleEn: z.string().optional(),
  ogTitleAr: z.string().optional(),
  ogDescriptionEn: z.string().optional(),
  ogDescriptionAr: z.string().optional(),
  ogImage: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  twitterTitleEn: z.string().optional(),
  twitterTitleAr: z.string().optional(),
  twitterDescriptionEn: z.string().optional(),
  twitterDescriptionAr: z.string().optional(),
  category: z.string().optional(),
  author: z.string().optional(),
  canonicalUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  robotsIndex: z.boolean(),
  robotsFollow: z.boolean(),
  isActive: z.boolean(),
});

type MetadataFormValues = z.infer<typeof metadataSchema>;

type MetadataFormProps = {
  initialData?: PageMetadata | null;
  isEditing?: boolean;
};

export function MetadataForm({ initialData, isEditing = false }: MetadataFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<MetadataFormValues>({
    resolver: zodResolver(metadataSchema),
    defaultValues: {
      pagePath: initialData?.pagePath ?? '',
      pageName: initialData?.pageName ?? '',
      titleEn: initialData?.titleEn ?? '',
      titleAr: initialData?.titleAr ?? '',
      descriptionEn: initialData?.descriptionEn ?? '',
      descriptionAr: initialData?.descriptionAr ?? '',
      keywordsEn: initialData?.keywordsEn ?? '',
      keywordsAr: initialData?.keywordsAr ?? '',
      ogTitleEn: initialData?.ogTitleEn ?? '',
      ogTitleAr: initialData?.ogTitleAr ?? '',
      ogDescriptionEn: initialData?.ogDescriptionEn ?? '',
      ogDescriptionAr: initialData?.ogDescriptionAr ?? '',
      ogImage: initialData?.ogImage ?? '',
      twitterTitleEn: initialData?.twitterTitleEn ?? '',
      twitterTitleAr: initialData?.twitterTitleAr ?? '',
      twitterDescriptionEn: initialData?.twitterDescriptionEn ?? '',
      twitterDescriptionAr: initialData?.twitterDescriptionAr ?? '',
      category: initialData?.category ?? '',
      author: initialData?.author ?? 'DreamToApp Team',
      canonicalUrl: initialData?.canonicalUrl ?? '',
      robotsIndex: initialData?.robotsIndex ?? true,
      robotsFollow: initialData?.robotsFollow ?? true,
      isActive: initialData?.isActive ?? true,
    },
  });

  const onSubmit = async (data: MetadataFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await upsertPageMetadata(data);
      if (result.success) {
        toast.success(isEditing ? 'Metadata updated successfully' : 'Metadata created successfully');
        router.push('/dashboard/metadata');
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to save metadata');
      }
    } catch (error) {
      toast.error('An error occurred while saving metadata');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="pagePath"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page Path *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="/services"
                    {...field}
                    disabled={isEditing}
                  />
                </FormControl>
                <FormDescription>
                  The URL path for this page (e.g., /, /services, /contactus)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pageName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Services Page" {...field} />
                </FormControl>
                <FormDescription>
                  Human-readable name for admin reference
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic SEO</TabsTrigger>
            <TabsTrigger value="opengraph">OpenGraph</TabsTrigger>
            <TabsTrigger value="twitter">Twitter</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold">English Content</h3>
            <FormField
              control={form.control}
              name="titleEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title (EN) *</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Page Title" {...field} maxLength={70} />
                  </FormControl>
                  <FormDescription>
                    {field.value?.length || 0}/70 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descriptionEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (EN) *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A brief description of your page"
                      {...field}
                      maxLength={160}
                      rows={3}
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value?.length || 0}/160 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="keywordsEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keywords (EN)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="keyword1, keyword2, keyword3"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Comma-separated keywords (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <h3 className="text-lg font-semibold mt-6">Arabic Content</h3>
            <FormField
              control={form.control}
              name="titleAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title (AR) *</FormLabel>
                  <FormControl>
                    <Input placeholder="عنوان الصفحة" {...field} maxLength={70} dir="rtl" />
                  </FormControl>
                  <FormDescription>
                    {field.value?.length || 0}/70 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descriptionAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (AR) *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="وصف موجز للصفحة"
                      {...field}
                      maxLength={160}
                      rows={3}
                      dir="rtl"
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value?.length || 0}/160 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="keywordsAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keywords (AR)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="كلمة مفتاحية، كلمة مفتاحية، كلمة مفتاحية"
                      {...field}
                      dir="rtl"
                    />
                  </FormControl>
                  <FormDescription>
                    Comma-separated keywords (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="opengraph" className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold">OpenGraph - English</h3>
            <FormField
              control={form.control}
              name="ogTitleEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OG Title (EN)</FormLabel>
                  <FormControl>
                    <Input placeholder="Leave empty to use page title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ogDescriptionEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OG Description (EN)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Leave empty to use page description"
                      {...field}
                      rows={2}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <h3 className="text-lg font-semibold mt-6">OpenGraph - Arabic</h3>
            <FormField
              control={form.control}
              name="ogTitleAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OG Title (AR)</FormLabel>
                  <FormControl>
                    <Input placeholder="اترك فارغاً لاستخدام عنوان الصفحة" {...field} dir="rtl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ogDescriptionAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OG Description (AR)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="اترك فارغاً لاستخدام وصف الصفحة"
                      {...field}
                      rows={2}
                      dir="rtl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ogImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OG Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.dreamto.app/og-image.png"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Leave empty to use default image (1200x630px recommended)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="twitter" className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold">Twitter Card - English</h3>
            <FormField
              control={form.control}
              name="twitterTitleEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter Title (EN)</FormLabel>
                  <FormControl>
                    <Input placeholder="Leave empty to use page title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="twitterDescriptionEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter Description (EN)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Leave empty to use page description"
                      {...field}
                      rows={2}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <h3 className="text-lg font-semibold mt-6">Twitter Card - Arabic</h3>
            <FormField
              control={form.control}
              name="twitterTitleAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter Title (AR)</FormLabel>
                  <FormControl>
                    <Input placeholder="اترك فارغاً لاستخدام عنوان الصفحة" {...field} dir="rtl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="twitterDescriptionAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter Description (AR)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="اترك فارغاً لاستخدام وصف الصفحة"
                      {...field}
                      rows={2}
                      dir="rtl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Development Services" {...field} />
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
                    <Input placeholder="DreamToApp Team" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="canonicalUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Canonical URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.dreamto.app/services"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Leave empty to auto-generate based on page path
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="robotsIndex"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Index</FormLabel>
                      <FormDescription>
                        Allow search engines to index
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="robotsFollow"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Follow</FormLabel>
                      <FormDescription>
                        Allow crawlers to follow links
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Active</FormLabel>
                      <FormDescription>
                        Enable this metadata
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : isEditing ? 'Update Metadata' : 'Create Metadata'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard/metadata')}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}


