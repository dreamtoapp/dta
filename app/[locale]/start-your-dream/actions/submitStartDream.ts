"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import db from "@/lib/prisma";
import { sendWhatsAppMessage } from "@/lib/actions/sendWhatsapp";

// Start Dream Form Schema - Updated to handle multiple services
const startDreamFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().min(10, "Mobile number must be at least 10 characters"),
  email: z.string().email("Please enter a valid email address"),
  serviceType: z.array(z.string()).min(1, "Please select at least one service"),
  projectDescription: z.string().min(10, "Project description must be at least 10 characters"),
  message: z.string().optional(),
});

export async function submitStartDream(
  prevState: { success: boolean; message: string; errors: Record<string, string[]> } | null,
  formData: FormData
) {
  try {
    // Handle multiple serviceType values from FormData
    const serviceTypeValues: string[] = [];
    formData.getAll("serviceType").forEach((value) => {
      if (typeof value === "string") {
        serviceTypeValues.push(value);
      }
    });

    const rawData = {
      name: formData.get("name") as string,
      mobile: formData.get("mobile") as string,
      email: formData.get("email") as string,
      serviceType: serviceTypeValues,
      projectDescription: formData.get("projectDescription") as string,
      message: formData.get("message") as string,
    };

    // Validate form data
    const validation = startDreamFormSchema.safeParse(rawData);
    if (!validation.success) {
      const errors: Record<string, string[]> = {};
      validation.error.errors.forEach((error) => {
        const field = error.path[0] as string;
        if (!errors[field]) {
          errors[field] = [];
        }
        errors[field].push(error.message);
      });

      return {
        success: false,
        message: "",
        errors,
      };
    }

    const data = validation.data;

    // Convert service types array to readable string
    const serviceTypeString = data.serviceType.join(", ");

    // Save to database
    const contact = await db.contactus.create({
      data: {
        name: data.name,
        mobile: data.mobile,
        email: data.email,
        projectType: serviceTypeString,
        projectDetails: data.projectDescription,
        budget: "", // Removed from form
        message: data.message || "",
      },
    });

    // Send WhatsApp notification
    const message = `🎉 *New Start Dream Project Request*

👤 *Name:* ${data.name}
📱 *Mobile:* ${data.mobile}
📧 *Email:* ${data.email}
🛠️ *Services:* ${serviceTypeString}
📝 *Project:* ${data.projectDescription}
💬 *Additional:* ${data.message || "None"}

🆔 *ID:* ${contact.id || "N/A"}
📅 *Date:* ${new Date().toLocaleString("ar-SA")}

Please respond within 2 hours! 🚀`;

    await sendWhatsAppMessage(message);

    // Revalidate the page
    revalidatePath("/start-your-dream");

    return {
      success: true,
      message: "Your dream project request has been sent! We'll get back to you within 24 hours to discuss your vision.",
      errors: {},
    };
  } catch (error) {
    console.error("Error processing start dream form:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again or contact us directly.",
      errors: {},
    };
  }
} 