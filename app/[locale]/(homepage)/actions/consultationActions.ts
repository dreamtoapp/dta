'use server';

import { z } from 'zod';
import db from '@/lib/prisma';
import nodemailer from 'nodemailer';

// Validation schema for consultation form
const ConsultationSchema = z.object({
  name: z.string().min(2, 'الاسم يجب أن يكون على الأقل حرفين'),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  phone: z.string().min(10, 'رقم الهاتف يجب أن يكون على الأقل 10 أرقام'),
  service: z.string().min(1, 'يرجى اختيار خدمة'),
  message: z.string().min(10, 'الرسالة يجب أن تكون على الأقل 10 أحرف'),
});

type ConsultationData = z.infer<typeof ConsultationSchema>;

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send email notification
async function sendEmailNotification(consultationData: ConsultationData, consultationId: string) {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.ADMIN_EMAIL) {
      console.log('Email notification skipped: Email configuration not complete');
      return;
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `طلب استشارة جديد - ${consultationData.name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5; text-align: center;">طلب استشارة جديد</h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">تفاصيل العميل:</h3>
            <p><strong>الاسم:</strong> ${consultationData.name}</p>
            <p><strong>البريد الإلكتروني:</strong> ${consultationData.email}</p>
            <p><strong>رقم الهاتف:</strong> ${consultationData.phone}</p>
            <p><strong>الخدمة المطلوبة:</strong> ${consultationData.service}</p>
          </div>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">الرسالة:</h3>
            <p style="line-height: 1.6;">${consultationData.message}</p>
          </div>
          
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;">
              <strong>معرف الطلب:</strong> ${consultationId}
            </p>
            <p style="margin: 5px 0 0 0; color: #92400e;">
              <strong>تاريخ الإرسال:</strong> ${new Date().toLocaleString('ar-SA')}
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #6b7280; font-size: 14px;">
              يرجى الرد على هذا الطلب خلال 48 ساعة عمل
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email notification sent successfully');
  } catch (error) {
    console.error('Error sending email notification:', error);
    // Don't throw error to avoid breaking the form submission
  }
}

export async function submitConsultationRequest(data: ConsultationData) {
  try {
    // Validate the input data
    const validatedData = ConsultationSchema.parse(data);

    // Save to database using the ConsultationRequest model
    const consultation = await db.consultationRequest.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: `${validatedData.service}: ${validatedData.message}`,
        createdAt: new Date(),
      },
    });

    console.log('Consultation request saved:', consultation.id);

    // Send email notification
    await sendEmailNotification(validatedData, consultation.id);

    // Send WhatsApp notification
    try {
      // Use the WhatsApp API directly instead of internal API route
      const whatsappMessage = `
🔔 استشارة جديدة من DreamToApp

الاسم: ${validatedData.name}
الجوال: ${validatedData.phone}
البريد: ${validatedData.email}
الخدمة: ${validatedData.service}
الرسالة: ${validatedData.message}

التاريخ: ${new Date().toLocaleString('ar-SA', { timeZone: 'Asia/Riyadh' })}
      `.trim();

      const whatsappUrl = `https://api.callmebot.com/whatsapp.php?phone=966554113107&text=${encodeURIComponent(whatsappMessage)}&apikey=3675221`;

      const whatsappResponse = await fetch(whatsappUrl);
      const result = await whatsappResponse.text();

      if (result.includes('Message queued') || result.includes('queued')) {
        console.log('WhatsApp notification sent successfully');
      } else {
        console.error('WhatsApp API response:', result);
      }
    } catch (whatsappError) {
      console.error('Error sending WhatsApp notification:', whatsappError);
      // Don't throw error to avoid breaking the form submission
    }

    return {
      success: true,
      message: 'تم إرسال طلب الاستشارة بنجاح! سنتواصل معك خلال 48 ساعة عمل.',
      id: consultation.id,
    };
  } catch (error) {
    console.error('Error submitting consultation request:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'يرجى التحقق من صحة البيانات المدخلة',
        errors: error.flatten().fieldErrors,
      };
    }

    return {
      success: false,
      message: 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.',
    };
  }
}

// Get consultation statistics for admin dashboard
export async function getConsultationStats() {
  try {
    const total = await db.consultationRequest.count();
    const recent = await db.consultationRequest.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        },
      },
    });

    return {
      total,
      recent,
    };
  } catch (error) {
    console.error('Error fetching consultation stats:', error);
    return {
      total: 0,
      recent: 0,
    };
  }
}
