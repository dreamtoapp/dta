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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createFAQ } from '../actions/createFAQ';
import { updateFAQ } from '../actions/updateFAQ';
import { toast } from 'sonner';
import type { FAQ } from '@prisma/client';

const faqSchema = z.object({
  pagePath: z.string().min(1, 'Page path is required'),
  questionEn: z.string().min(10, 'Question must be at least 10 characters').max(200, 'Question must be under 200 characters'),
  questionAr: z.string().min(10, 'Question must be at least 10 characters').max(200, 'Question must be under 200 characters'),
  answerEn: z.string().min(20, 'Answer must be at least 20 characters').max(1000, 'Answer must be under 1000 characters'),
  answerAr: z.string().min(20, 'Answer must be at least 20 characters').max(1000, 'Answer must be under 1000 characters'),
  displayOrder: z.coerce.number().min(0, 'Display order must be non-negative'),
  isActive: z.boolean(),
});

type FAQFormValues = z.infer<typeof faqSchema>;

type FAQFormProps = {
  initialData?: FAQ | null;
  isEditing?: boolean;
};

const PAGE_OPTIONS = [
  { value: '/', label: 'Homepage' },
  { value: '/services', label: 'Services' },
  { value: '/influencers', label: 'Influencers' },
  { value: '/worksample', label: 'Work Samples' },
  { value: '/team', label: 'Team' },
  { value: '/contactus', label: 'Contact Us' },
];

export function FAQForm({ initialData, isEditing = false }: FAQFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FAQFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      pagePath: initialData?.pagePath ?? '/',
      questionEn: initialData?.questionEn ?? '',
      questionAr: initialData?.questionAr ?? '',
      answerEn: initialData?.answerEn ?? '',
      answerAr: initialData?.answerAr ?? '',
      displayOrder: initialData?.displayOrder ?? 0,
      isActive: initialData?.isActive ?? true,
    },
  });

  async function onSubmit(values: FAQFormValues) {
    setIsSubmitting(true);

    try {
      const result = isEditing && initialData
        ? await updateFAQ(initialData.id, values)
        : await createFAQ(values);

      if (result.success) {
        toast.success(
          isEditing ? 'FAQ updated successfully' : 'FAQ created successfully'
        );
        router.push('/dashboard/faqs');
        router.refresh();
      } else {
        toast.error(result.error || 'An error occurred');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to save FAQ');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6">
          {/* Page Path Selection */}
          <FormField
            control={form.control}
            name="pagePath"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a page" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PAGE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select which page this FAQ should appear on
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bilingual Content Tabs */}
          <Tabs defaultValue="en" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="ar">Arabic</TabsTrigger>
            </TabsList>

            {/* English Content */}
            <TabsContent value="en" className="space-y-4">
              <FormField
                control={form.control}
                name="questionEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question (English)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="What services does DreamToApp provide?"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {field.value.length}/200 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="answerEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer (English)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="We provide comprehensive digital services including..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {field.value.length}/1000 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>

            {/* Arabic Content */}
            <TabsContent value="ar" className="space-y-4">
              <FormField
                control={form.control}
                name="questionAr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question (Arabic)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ما الخدمات التي تقدمها دريم تو آب؟"
                        dir="rtl"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {field.value.length}/200 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="answerAr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer (Arabic)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="نقدم خدمات رقمية شاملة تشمل..."
                        className="min-h-[120px]"
                        dir="rtl"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {field.value.length}/1000 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>

          {/* Display Order */}
          <FormField
            control={form.control}
            name="displayOrder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Order</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Lower numbers appear first (0 = highest priority)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Active Status */}
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Active Status</FormLabel>
                  <FormDescription>
                    Only active FAQs will be displayed on the website
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

        {/* Form Actions */}
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? isEditing
                ? 'Updating...'
                : 'Creating...'
              : isEditing
                ? 'Update FAQ'
                : 'Create FAQ'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
