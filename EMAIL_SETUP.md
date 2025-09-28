# 📧 Email Notification Setup

## Overview

The job application feature now includes comprehensive email notifications using Nodemailer with Gmail SMTP. This system sends emails to both applicants and administrators at key points in the application process.

## 🔧 Setup Requirements

### 1. Gmail Account Setup
1. Use your Gmail account for sending emails
2. Enable 2-factor authentication on your Gmail account
3. Generate an App Password for the application

### 2. Environment Variables
Add these to your `.env.local` file:

```env
# Nodemailer Email Service (Gmail SMTP)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password

# Admin Email (for notifications)
ADMIN_EMAIL=admin@yourdomain.com
```

## 📨 Email Types

### 1. Application Confirmation Email
- **Trigger**: When a job application is submitted
- **Recipient**: Applicant
- **Content**: Confirmation of receipt, application number, next steps
- **Languages**: English and Arabic (RTL support)

### 2. Admin Notification Email
- **Trigger**: When a new job application is submitted
- **Recipient**: Admin/HR team
- **Content**: Application details, applicant info, direct link to review
- **Languages**: English and Arabic

### 3. Status Update Email
- **Trigger**: When application status is changed
- **Recipient**: Applicant
- **Content**: New status, notes, next steps
- **Languages**: English and Arabic

## 🎨 Email Templates

All emails use branded templates with:
- DreamToApp color scheme (#d7a50d, #0d3ad7)
- Responsive design
- RTL support for Arabic
- Professional styling
- Call-to-action buttons

## 🔄 Status Flow

```
SUBMITTED → UNDER_REVIEW → INTERVIEW_SCHEDULED → INTERVIEWED → OFFER_EXTENDED → HIRED
     ↓              ↓                ↓              ↓              ↓           ↓
   Email         Email            Email          Email          Email       Email
```

## 🛠️ Implementation Details

### Files Created/Modified:
- `lib/email.ts` - Email utility functions and templates
- `app/[locale]/apply-job/actions/submitApplication.ts` - Added email notifications
- `app/[locale]/apply-job/actions/updateApplicationStatus.ts` - Added status update emails

### Dependencies Added:
- `nodemailer` - Email sending library for Node.js
- `@types/nodemailer` - TypeScript types for nodemailer

## 🧪 Testing

### Test Email Sending:
```typescript
import { sendEmail, createApplicationConfirmationEmail } from '@/lib/email';

// Test confirmation email
const testEmail = createApplicationConfirmationEmail(
  'John Doe',
  'john@example.com',
  'APP-123456',
  'en'
);

const success = await sendEmail(testEmail);
console.log('Email sent:', success);
```

### Environment Testing:
1. Set up Gmail App Password
2. Use test email addresses
3. Check email delivery and formatting
4. Test both English and Arabic templates

## 🚀 Production Deployment

### 1. Gmail Configuration
- Use production Gmail account
- Ensure App Password is properly configured
- Test email delivery

### 2. Environment Setup
- Set production `EMAIL_USER` and `EMAIL_PASS`
- Configure production `ADMIN_EMAIL`
- Test all email flows

### 3. Monitoring
- Monitor email delivery rates
- Check for failed emails
- Review Gmail sending limits

## 📊 Email Analytics

Gmail provides basic analytics for:
- Delivery rates
- Bounce rates
- Spam reports

## 🔒 Security Considerations

- Email credentials are stored in environment variables
- Emails are sent server-side only
- No sensitive data in email content
- Gmail handles rate limiting and security

## 🆘 Troubleshooting

### Common Issues:
1. **Email not sending**: Check Gmail credentials and App Password
2. **Template not rendering**: Verify HTML syntax and CSS
3. **RTL issues**: Check Arabic template direction
4. **Delivery failures**: Check spam filters and Gmail limits

### Debug Commands:
```bash
# Check environment variables
echo $EMAIL_USER
echo $EMAIL_PASS

# Test email sending
npm run test:email

# Check logs
tail -f logs/email.log
```

## 📞 Support

For email-related issues:
1. Check Gmail App Password setup
2. Review application logs
3. Test with different email clients
4. Contact support if needed

---

**Note**: This email system is designed to be reliable and fail gracefully. If email sending fails, the application submission or status update will still succeed, and the error will be logged for debugging. 