"use server";

import db from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for newsletter subscription
const newsletterSchema = z.object({
  email: z.string().email('يرجى إدخال بريد إلكتروني صحيح'),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

export async function subscribeToNewsletter(formData: FormData) {
  try {
    // Validate the form data
    const validatedFields = newsletterSchema.safeParse({
      email: formData.get('email'),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        error: validatedFields.error.errors[0]?.message || 'بيانات غير صحيحة',
      };
    }

    const { email } = validatedFields.data;

    // Check if email already exists
    const existingSubscription = await db.newsletterSubscription.findUnique({
      where: { email },
    });

    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return {
          success: false,
          error: 'أنت مشترك بالفعل في النشرة الإخبارية',
        };
      } else {
        // Reactivate the subscription
        await db.newsletterSubscription.update({
          where: { email },
          data: { isActive: true, updatedAt: new Date() },
        });

        return {
          success: true,
          message: 'تم إعادة تفعيل اشتراكك في النشرة الإخبارية بنجاح',
        };
      }
    }

    // Create new subscription
    await db.newsletterSubscription.create({
      data: {
        email,
        isActive: true,
      },
    });

    return {
      success: true,
      message: 'تم الاشتراك في النشرة الإخبارية بنجاح',
    };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      success: false,
      error: 'حدث خطأ أثناء الاشتراك. يرجى المحاولة مرة أخرى',
    };
  }
}

export async function unsubscribeFromNewsletter(email: string) {
  try {
    const subscription = await db.newsletterSubscription.findUnique({
      where: { email },
    });

    if (!subscription) {
      return {
        success: false,
        error: 'لم يتم العثور على هذا البريد الإلكتروني في قائمة المشتركين',
      };
    }

    if (!subscription.isActive) {
      return {
        success: false,
        error: 'أنت غير مشترك بالفعل في النشرة الإخبارية',
      };
    }

    await db.newsletterSubscription.update({
      where: { email },
      data: { isActive: false, updatedAt: new Date() },
    });

    return {
      success: true,
      message: 'تم إلغاء الاشتراك بنجاح',
    };
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return {
      success: false,
      error: 'حدث خطأ أثناء إلغاء الاشتراك. يرجى المحاولة مرة أخرى',
    };
  }
}

export async function getNewsletterStats() {
  try {
    const totalSubscribers = await db.newsletterSubscription.count({
      where: { isActive: true },
    });

    const recentSubscribers = await db.newsletterSubscription.count({
      where: {
        isActive: true,
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        },
      },
    });

    return {
      success: true,
      data: {
        totalSubscribers,
        recentSubscribers,
      },
    };
  } catch (error) {
    console.error('Newsletter stats error:', error);
    return {
      success: false,
      error: 'حدث خطأ أثناء جلب إحصائيات النشرة الإخبارية',
    };
  }
} 