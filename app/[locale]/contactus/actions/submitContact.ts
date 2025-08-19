"use server";

import { z } from "zod";
import db from "@/lib/prisma";
import { sendWhatsAppMessage } from "@/lib/actions/sendWhatsapp";

// Simplified contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().regex(/^[0-9]{10,15}$/, "Invalid mobile number"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function submitContact(
  prevState: any,
  formData: FormData
): Promise<{ success: boolean; message?: string; errors?: Record<string, string[]> }> {
  try {
    // Parse and validate form data
    const validatedData = contactFormSchema.parse({
      name: formData.get("name"),
      mobile: formData.get("mobile"),
      email: formData.get("email"),
      message: formData.get("message"),
    });

    // Save to database
    const contact = await db.contactus.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        mobile: validatedData.mobile,
        projectType: "contact", // Default value for standard contact form
        projectDetails: validatedData.message,
        budget: "not-specified", // Default value for standard contact form
        message: validatedData.message,
      },
    });

    // Send WhatsApp notification
    const whatsappMessage = `New Contact Form Submission:
Name: ${validatedData.name}
Email: ${validatedData.email}
Mobile: ${validatedData.mobile}
Message: ${validatedData.message}`;

    await sendWhatsAppMessage(whatsappMessage);

    return {
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    };
  } catch (error) {
    console.error("Contact form submission error:", error);

    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {};
      error.errors.forEach((err) => {
        const field = err.path[0] as string;
        if (!errors[field]) {
          errors[field] = [];
        }
        errors[field].push(err.message);
      });

      return {
        success: false,
        message: "Please check your input and try again.",
        errors,
      };
    }

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
} 