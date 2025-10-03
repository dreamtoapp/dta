"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadJobAttachment } from "@/lib/cloudinary";
import {
  sendEmail,
  createApplicationConfirmationEmail,
  createAdminNotificationEmail
} from "@/lib/email";

// Zod schema for form validation
const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10,15}$/, "Invalid phone number"),
  age: z.number().min(18).max(65),
  gender: z.enum(['male', 'female']),
  areaOfExpertise: z.enum([
    'web-development', 'mobile-development', 'ui-ux-design', 'marketing',
    'project-management', 'quality-assurance', 'devops', 'data-science'
  ]),
  yearsOfExperience: z.number().min(0).max(50),
  aboutYou: z.string().min(10, "About you must be at least 10 characters").max(500, "About you must be less than 500 characters"),
  agreeToTerms: z.boolean().refine(val => val === true, "You must agree to terms"),
  attachmentUrl: z.string().optional(),
  attachmentName: z.string().optional(),
  locale: z.string().default("en"),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

export async function submitApplication(formData: FormData) {
  try {
    // Handle file upload first
    const attachmentFile = formData.get("attachmentFile") as File | null;
    let attachmentUrl: string | undefined;

    if (attachmentFile) {
      try {
        // Convert file to buffer
        const bytes = await attachmentFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
        attachmentUrl = await uploadJobAttachment(buffer, attachmentFile.name, formData.get("name") as string);
        console.log("✅ File uploaded successfully:", attachmentUrl);
      } catch (uploadError) {
        console.error("❌ File upload failed:", uploadError);
        // Continue without attachment
      }
    }

    // Parse and validate form data
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      age: parseInt(formData.get("age") as string),
      gender: formData.get("gender") as string,
      areaOfExpertise: formData.get("areaOfExpertise") as string,
      yearsOfExperience: parseInt(formData.get("yearsOfExperience") as string),
      aboutYou: formData.get("aboutYou") as string,
      agreeToTerms: formData.get("agreeToTerms") === "true",
      attachmentUrl: attachmentUrl,
      attachmentName: formData.get("attachmentName") as string || undefined,
      locale: formData.get("locale") as string || "en",
    };

    const validatedData = applicationSchema.parse(rawData);

    // Create application in database with status history
    const application = await prisma.jobApplication.create({
      data: {
        fullName: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        age: validatedData.age,
        gender: validatedData.gender,
        areaOfExpertise: validatedData.areaOfExpertise,
        yearsOfExperience: validatedData.yearsOfExperience,
        aboutYou: validatedData.aboutYou,
        attachmentUrl: validatedData.attachmentUrl,
        attachmentName: validatedData.attachmentName,
        applicationNumber: `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "SUBMITTED",
        submittedAt: new Date(),
        locale: validatedData.locale,
        source: "team-apply-form",
      },
    });

    // Send email notifications
    try {
      // Send confirmation email to applicant
      const confirmationEmail = createApplicationConfirmationEmail(
        validatedData.name,
        validatedData.email,
        application.applicationNumber,
        validatedData.locale
      );
      await sendEmail(confirmationEmail);

      // Send notification email to admin
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@dreamtoapp.com';
      const adminNotificationEmail = createAdminNotificationEmail(
        adminEmail,
        application.applicationNumber,
        validatedData.name,
        validatedData.email,
        validatedData.areaOfExpertise,
        validatedData.yearsOfExperience,
        validatedData.locale
      );
      await sendEmail(adminNotificationEmail);

      console.log("✅ Email notifications sent successfully");
    } catch (emailError) {
      console.error("❌ Email notification failed:", emailError);
      // Don't fail the application submission if email fails
    }

    // Revalidate the page to show updated state
    revalidatePath("/team/apply");

    return {
      success: true,
      message: "Application submitted successfully!",
      applicationNumber: application.applicationNumber,
      data: application,
    };

  } catch (error) {
    console.error("Application submission error:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed",
        errors: error.errors.map(err => ({
          field: err.path.join("."),
          message: err.message,
        })),
      };
    }

    return {
      success: false,
      message: "Failed to submit application. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
