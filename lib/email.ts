import nodemailer from 'nodemailer';

// Email configuration using nodemailer with Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail(template: EmailTemplate): Promise<boolean> {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('📧 Email sending disabled: EMAIL_USER or EMAIL_PASS not configured');
      console.log('📬 Would send email to:', template.to);
      console.log('📋 Subject:', template.subject);
      console.log('📝 Content preview:', template.html.substring(0, 100) + '...');
      return true; // Return true to not break the application flow
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: template.from || process.env.EMAIL_USER,
      to: template.to,
      subject: template.subject,
      html: template.html,
    };

    await transporter.sendMail(mailOptions);
    console.log('📧 Email sent successfully to:', template.to);
    return true;
  } catch (error) {
    console.error('📧 Email sending error:', error);
    return false;
  }
}

// Email templates for job applications
export function createApplicationConfirmationEmail(
  applicantName: string,
  applicantEmail: string,
  applicationNumber: string,
  locale: string = 'en'
): EmailTemplate {
  const isArabic = locale === 'ar';

  return {
    to: applicantEmail,
    subject: isArabic
      ? `تأكيد طلب التوظيف - ${applicationNumber}`
      : `Job Application Confirmation - ${applicationNumber}`,
    html: `
      <!DOCTYPE html>
      <html dir="${isArabic ? 'rtl' : 'ltr'}" lang="${locale}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${isArabic ? 'تأكيد طلب التوظيف' : 'Job Application Confirmation'}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #d7a50d, #0d3ad7); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .highlight { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #d7a50d; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .btn { display: inline-block; background: #d7a50d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${isArabic ? 'DreamToApp' : 'DreamToApp'}</h1>
            <p>${isArabic ? 'تأكيد طلب التوظيف' : 'Job Application Confirmation'}</p>
          </div>
          <div class="content">
            <h2>${isArabic ? `مرحباً ${applicantName}` : `Hello ${applicantName}`}</h2>
            <p>${isArabic
        ? 'شكراً لك على تقديم طلب التوظيف مع DreamToApp. لقد تم استلام طلبك بنجاح.'
        : 'Thank you for submitting your job application with DreamToApp. We have successfully received your application.'
      }</p>
            
            <div class="highlight">
              <strong>${isArabic ? 'رقم الطلب:' : 'Application Number:'}</strong> ${applicationNumber}<br>
              <strong>${isArabic ? 'تاريخ التقديم:' : 'Submission Date:'}</strong> ${new Date().toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
            </div>
            
            <p>${isArabic
        ? 'سنقوم بمراجعة طلبك بعناية وسنتواصل معك في أقرب وقت ممكن. عادةً ما تستغرق عملية المراجعة من 2-3 أيام عمل.'
        : 'We will carefully review your application and get back to you as soon as possible. The review process typically takes 2-3 business days.'
      }</p>
            
            <p>${isArabic
        ? 'إذا كان لديك أي أسئلة، لا تتردد في التواصل معنا.'
        : 'If you have any questions, please don\'t hesitate to contact us.'
      }</p>
            
            <div style="text-align: center;">
              <a href="https://dreamtoapp.com/${locale}/contactus" class="btn">
                ${isArabic ? 'تواصل معنا' : 'Contact Us'}
              </a>
            </div>
          </div>
          <div class="footer">
            <p>${isArabic
        ? 'هذا البريد الإلكتروني تم إرساله تلقائياً. يرجى عدم الرد عليه.'
        : 'This email was sent automatically. Please do not reply to this email.'
      }</p>
            <p>&copy; 2024 DreamToApp. ${isArabic ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
}

export function createStatusUpdateEmail(
  applicantName: string,
  applicantEmail: string,
  applicationNumber: string,
  newStatus: string,
  notes?: string,
  locale: string = 'en'
): EmailTemplate {
  const isArabic = locale === 'ar';

  const statusTranslations = {
    'REVIEWING': { en: 'Under Review', ar: 'قيد المراجعة' },
    'INTERVIEW': { en: 'Interview Scheduled', ar: 'تم تحديد موعد المقابلة' },
    'ACCEPTED': { en: 'Application Accepted', ar: 'تم قبول الطلب' },
    'REJECTED': { en: 'Application Status Update', ar: 'تحديث حالة الطلب' },
    'HIRED': { en: 'Congratulations! You\'re Hired!', ar: 'تهانينا! تم توظيفك!' }
  };

  const statusText = statusTranslations[newStatus as keyof typeof statusTranslations] ||
    { en: newStatus, ar: newStatus };

  return {
    to: applicantEmail,
    subject: isArabic
      ? `تحديث حالة الطلب - ${applicationNumber}`
      : `Application Status Update - ${applicationNumber}`,
    html: `
      <!DOCTYPE html>
      <html dir="${isArabic ? 'rtl' : 'ltr'}" lang="${locale}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${isArabic ? 'تحديث حالة الطلب' : 'Application Status Update'}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #d7a50d, #0d3ad7); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .status-badge { 
            display: inline-block; 
            padding: 8px 16px; 
            border-radius: 20px; 
            font-weight: bold; 
            margin: 10px 0;
            background: ${newStatus === 'ACCEPTED' || newStatus === 'HIRED' ? '#28a745' :
        newStatus === 'REJECTED' ? '#dc3545' : '#ffc107'};
            color: ${newStatus === 'ACCEPTED' || newStatus === 'HIRED' ? 'white' : 'black'};
          }
          .highlight { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #d7a50d; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .btn { display: inline-block; background: #d7a50d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${isArabic ? 'DreamToApp' : 'DreamToApp'}</h1>
            <p>${isArabic ? 'تحديث حالة الطلب' : 'Application Status Update'}</p>
          </div>
          <div class="content">
            <h2>${isArabic ? `مرحباً ${applicantName}` : `Hello ${applicantName}`}</h2>
            <p>${isArabic
        ? 'نود إعلامك بتحديث حالة طلب التوظيف الخاص بك.'
        : 'We would like to inform you about an update to your job application status.'
      }</p>
            
            <div class="highlight">
              <strong>${isArabic ? 'رقم الطلب:' : 'Application Number:'}</strong> ${applicationNumber}<br>
              <strong>${isArabic ? 'الحالة الجديدة:' : 'New Status:'}</strong> 
              <span class="status-badge">${isArabic ? statusText.ar : statusText.en}</span><br>
              <strong>${isArabic ? 'تاريخ التحديث:' : 'Update Date:'}</strong> ${new Date().toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
            </div>
            
            ${notes ? `<p><strong>${isArabic ? 'ملاحظات:' : 'Notes:'}</strong> ${notes}</p>` : ''}
            
            <p>${isArabic
        ? 'سنواصل التواصل معك مع أي تحديثات إضافية.'
        : 'We will continue to communicate with you regarding any additional updates.'
      }</p>
            
            <div style="text-align: center;">
              <a href="https://dreamtoapp.com/${locale}/contactus" class="btn">
                ${isArabic ? 'تواصل معنا' : 'Contact Us'}
              </a>
            </div>
          </div>
          <div class="footer">
            <p>${isArabic
        ? 'هذا البريد الإلكتروني تم إرساله تلقائياً. يرجى عدم الرد عليه.'
        : 'This email was sent automatically. Please do not reply to this email.'
      }</p>
            <p>&copy; 2024 DreamToApp. ${isArabic ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
}

export function createAdminNotificationEmail(
  adminEmail: string,
  applicationNumber: string,
  applicantName: string,
  applicantEmail: string,
  areaOfExpertise: string,
  yearsOfExperience: number,
  locale: string = 'en'
): EmailTemplate {
  const isArabic = locale === 'ar';

  return {
    to: adminEmail,
    subject: isArabic
      ? `طلب توظيف جديد - ${applicationNumber}`
      : `New Job Application - ${applicationNumber}`,
    html: `
      <!DOCTYPE html>
      <html dir="${isArabic ? 'rtl' : 'ltr'}" lang="${locale}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${isArabic ? 'طلب توظيف جديد' : 'New Job Application'}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #d7a50d, #0d3ad7); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .highlight { background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #0d3ad7; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .btn { display: inline-block; background: #0d3ad7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${isArabic ? 'DreamToApp' : 'DreamToApp'}</h1>
            <p>${isArabic ? 'طلب توظيف جديد' : 'New Job Application'}</p>
          </div>
          <div class="content">
            <h2>${isArabic ? 'طلب توظيف جديد تم استلامه' : 'New Job Application Received'}</h2>
            
            <div class="highlight">
              <strong>${isArabic ? 'رقم الطلب:' : 'Application Number:'}</strong> ${applicationNumber}<br>
              <strong>${isArabic ? 'اسم المتقدم:' : 'Applicant Name:'}</strong> ${applicantName}<br>
              <strong>${isArabic ? 'البريد الإلكتروني:' : 'Email:'}</strong> ${applicantEmail}<br>
              <strong>${isArabic ? 'مجال التخصص:' : 'Area of Expertise:'}</strong> ${areaOfExpertise}<br>
              <strong>${isArabic ? 'سنوات الخبرة:' : 'Years of Experience:'}</strong> ${yearsOfExperience}<br>
              <strong>${isArabic ? 'تاريخ التقديم:' : 'Submission Date:'}</strong> ${new Date().toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
            </div>
            
            <p>${isArabic
        ? 'يرجى مراجعة الطلب والرد على المتقدم في أقرب وقت ممكن.'
        : 'Please review the application and respond to the applicant as soon as possible.'
      }</p>
            
            <div style="text-align: center;">
              <a href="https://dreamtoapp.com/${locale}/admin/applications/${applicationNumber}" class="btn">
                ${isArabic ? 'عرض الطلب' : 'View Application'}
              </a>
            </div>
          </div>
          <div class="footer">
            <p>&copy; 2024 DreamToApp. ${isArabic ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
}

// ============================================================================
// INFLUENCER EMAIL TEMPLATES
// ============================================================================

export function createInfluencerContactNotificationEmail(
  influencerEmail: string,
  influencerName: string,
  clientName: string,
  clientEmail: string,
  clientCompany: string,
  message: string,
  budget: string,
  campaignType: string,
  timeline: string,
  locale: string = 'en'
): EmailTemplate {
  const isArabic = locale === 'ar';

  return {
    to: influencerEmail,
    subject: isArabic
      ? `طلب تعاون جديد من ${clientName}`
      : `New Collaboration Request from ${clientName}`,
    html: `
      <!DOCTYPE html>
      <html dir="${isArabic ? 'rtl' : 'ltr'}" lang="${locale}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${isArabic ? 'طلب تعاون جديد' : 'New Collaboration Request'}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #d7a50d, #0d3ad7); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .highlight { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #d7a50d; }
          .message-box { background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; border: 1px solid #dee2e6; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .btn { display: inline-block; background: #d7a50d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${isArabic ? 'DreamToApp' : 'DreamToApp'}</h1>
            <p>${isArabic ? 'طلب تعاون جديد' : 'New Collaboration Request'}</p>
          </div>
          <div class="content">
            <h2>${isArabic ? `مرحباً ${influencerName}` : `Hello ${influencerName}`}</h2>
            <p>${isArabic
        ? 'لديك طلب تعاون جديد من عميل محتمل.'
        : 'You have a new collaboration request from a potential client.'
      }</p>
            
            <div class="highlight">
              <strong>${isArabic ? 'اسم العميل:' : 'Client Name:'}</strong> ${clientName}<br>
              <strong>${isArabic ? 'البريد الإلكتروني:' : 'Email:'}</strong> ${clientEmail}<br>
              ${clientCompany ? `<strong>${isArabic ? 'الشركة:' : 'Company:'}</strong> ${clientCompany}<br>` : ''}
              ${budget ? `<strong>${isArabic ? 'الميزانية:' : 'Budget:'}</strong> ${budget}<br>` : ''}
              ${campaignType ? `<strong>${isArabic ? 'نوع الحملة:' : 'Campaign Type:'}</strong> ${campaignType}<br>` : ''}
              ${timeline ? `<strong>${isArabic ? 'الجدول الزمني:' : 'Timeline:'}</strong> ${timeline}<br>` : ''}
              <strong>${isArabic ? 'تاريخ الطلب:' : 'Request Date:'}</strong> ${new Date().toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
            </div>
            
            <div class="message-box">
              <h3>${isArabic ? 'رسالة العميل:' : 'Client Message:'}</h3>
              <p>${message}</p>
            </div>
            
            <p>${isArabic
        ? 'يرجى الرد على هذا الطلب في أقرب وقت ممكن لضمان أفضل تجربة للعميل.'
        : 'Please respond to this request as soon as possible to ensure the best client experience.'
      }</p>
            
            <div style="text-align: center;">
              <a href="mailto:${clientEmail}" class="btn">
                ${isArabic ? 'الرد على العميل' : 'Reply to Client'}
              </a>
            </div>
          </div>
          <div class="footer">
            <p>${isArabic
        ? 'هذا البريد الإلكتروني تم إرساله تلقائياً. يرجى عدم الرد عليه.'
        : 'This email was sent automatically. Please do not reply to this email.'
      }</p>
            <p>&copy; 2024 DreamToApp. ${isArabic ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
}

export function createClientContactConfirmationEmail(
  clientEmail: string,
  clientName: string,
  influencerName: string,
  influencerUsername: string,
  locale: string = 'en'
): EmailTemplate {
  const isArabic = locale === 'ar';

  return {
    to: clientEmail,
    subject: isArabic
      ? `تأكيد إرسال طلب التعاون إلى ${influencerName}`
      : `Collaboration Request Sent to ${influencerName}`,
    html: `
      <!DOCTYPE html>
      <html dir="${isArabic ? 'rtl' : 'ltr'}" lang="${locale}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${isArabic ? 'تأكيد إرسال طلب التعاون' : 'Collaboration Request Confirmation'}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #d7a50d, #0d3ad7); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .highlight { background: #d4edda; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #28a745; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .btn { display: inline-block; background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${isArabic ? 'DreamToApp' : 'DreamToApp'}</h1>
            <p>${isArabic ? 'تأكيد إرسال طلب التعاون' : 'Collaboration Request Confirmation'}</p>
          </div>
          <div class="content">
            <h2>${isArabic ? `مرحباً ${clientName}` : `Hello ${clientName}`}</h2>
            <p>${isArabic
        ? 'شكراً لك على إرسال طلب التعاون. لقد تم إرسال طلبك بنجاح إلى المؤثر المطلوب.'
        : 'Thank you for submitting your collaboration request. Your request has been successfully sent to the requested influencer.'
      }</p>
            
            <div class="highlight">
              <strong>${isArabic ? 'اسم المؤثر:' : 'Influencer Name:'}</strong> ${influencerName}<br>
              <strong>${isArabic ? 'اسم المستخدم:' : 'Username:'}</strong> @${influencerUsername}<br>
              <strong>${isArabic ? 'تاريخ الإرسال:' : 'Sent Date:'}</strong> ${new Date().toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
            </div>
            
            <p>${isArabic
        ? 'سيتم إشعار المؤثر بطلبك وسيقوم بالرد عليك في أقرب وقت ممكن. عادةً ما يستغرق الرد من 24-48 ساعة.'
        : 'The influencer will be notified of your request and will respond to you as soon as possible. Typically, responses take 24-48 hours.'
      }</p>
            
            <p>${isArabic
        ? 'إذا لم تتلق رداً خلال 48 ساعة، يمكنك التواصل معنا للمتابعة.'
        : 'If you don\'t receive a response within 48 hours, you can contact us for follow-up.'
      }</p>
            
            <div style="text-align: center;">
              <a href="https://dreamtoapp.com/${locale}/influencers" class="btn">
                ${isArabic ? 'استكشف المزيد من المؤثرين' : 'Explore More Influencers'}
              </a>
            </div>
          </div>
          <div class="footer">
            <p>${isArabic
        ? 'هذا البريد الإلكتروني تم إرساله تلقائياً. يرجى عدم الرد عليه.'
        : 'This email was sent automatically. Please do not reply to this email.'
      }</p>
            <p>&copy; 2024 DreamToApp. ${isArabic ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
}

export function createAdminInfluencerNotificationEmail(
  adminEmail: string,
  influencerName: string,
  influencerUsername: string,
  clientName: string,
  clientEmail: string,
  clientCompany: string,
  message: string,
  budget: string,
  campaignType: string,
  locale: string = 'en'
): EmailTemplate {
  const isArabic = locale === 'ar';

  return {
    to: adminEmail,
    subject: isArabic
      ? `طلب تعاون جديد - ${influencerName}`
      : `New Collaboration Request - ${influencerName}`,
    html: `
      <!DOCTYPE html>
      <html dir="${isArabic ? 'rtl' : 'ltr'}" lang="${locale}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${isArabic ? 'طلب تعاون جديد' : 'New Collaboration Request'}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #d7a50d, #0d3ad7); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .highlight { background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #0d3ad7; }
          .message-box { background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; border: 1px solid #dee2e6; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .btn { display: inline-block; background: #0d3ad7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${isArabic ? 'DreamToApp' : 'DreamToApp'}</h1>
            <p>${isArabic ? 'طلب تعاون جديد' : 'New Collaboration Request'}</p>
          </div>
          <div class="content">
            <h2>${isArabic ? 'طلب تعاون جديد تم استلامه' : 'New Collaboration Request Received'}</h2>
            
            <div class="highlight">
              <strong>${isArabic ? 'اسم المؤثر:' : 'Influencer Name:'}</strong> ${influencerName}<br>
              <strong>${isArabic ? 'اسم المستخدم:' : 'Username:'}</strong> @${influencerUsername}<br>
              <strong>${isArabic ? 'اسم العميل:' : 'Client Name:'}</strong> ${clientName}<br>
              <strong>${isArabic ? 'البريد الإلكتروني:' : 'Email:'}</strong> ${clientEmail}<br>
              ${clientCompany ? `<strong>${isArabic ? 'الشركة:' : 'Company:'}</strong> ${clientCompany}<br>` : ''}
              ${budget ? `<strong>${isArabic ? 'الميزانية:' : 'Budget:'}</strong> ${budget}<br>` : ''}
              ${campaignType ? `<strong>${isArabic ? 'نوع الحملة:' : 'Campaign Type:'}</strong> ${campaignType}<br>` : ''}
              <strong>${isArabic ? 'تاريخ الطلب:' : 'Request Date:'}</strong> ${new Date().toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
            </div>
            
            <div class="message-box">
              <h3>${isArabic ? 'رسالة العميل:' : 'Client Message:'}</h3>
              <p>${message}</p>
            </div>
            
            <p>${isArabic
        ? 'يرجى متابعة هذا الطلب والتأكد من أن المؤثر يرد على العميل في الوقت المناسب.'
        : 'Please follow up on this request and ensure the influencer responds to the client in a timely manner.'
      }</p>
            
            <div style="text-align: center;">
              <a href="https://dreamtoapp.com/${locale}/dashboard/influencers" class="btn">
                ${isArabic ? 'عرض لوحة التحكم' : 'View Dashboard'}
              </a>
            </div>
          </div>
          <div class="footer">
            <p>&copy; 2024 DreamToApp. ${isArabic ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
} 