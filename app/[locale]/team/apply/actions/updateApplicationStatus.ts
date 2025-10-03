"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sendEmail, createStatusUpdateEmail } from "@/lib/email";

// Zod schema for status update
const statusUpdateSchema = z.object({
  applicationId: z.string(),
  status: z.enum([
    'DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'INTERVIEW_SCHEDULED',
    'INTERVIEWED', 'OFFER_EXTENDED', 'HIRED', 'REJECTED', 'WITHDRAWN'
  ]),
  notes: z.string().optional(),
  changedBy: z.string().optional(),
});

export type StatusUpdateData = z.infer<typeof statusUpdateSchema>;

export async function updateApplicationStatus(formData: FormData) {
  try {
    // Parse and validate form data
    const rawData = {
      applicationId: formData.get("applicationId") as string,
      status: formData.get("status") as string,
      notes: formData.get("notes") as string || undefined,
      changedBy: formData.get("changedBy") as string || "admin",
    };

    const validatedData = statusUpdateSchema.parse(rawData);

    // Update application status and create history entry
    const updatedApplication = await prisma.jobApplication.update({
      where: { id: validatedData.applicationId },
      data: {
        status: validatedData.status,
        updatedAt: new Date(),
      },
    });

    // Send status update email to applicant
    try {
      const statusUpdateEmail = createStatusUpdateEmail(
        updatedApplication.fullName,
        updatedApplication.email,
        updatedApplication.applicationNumber,
        validatedData.status,
        validatedData.notes,
        updatedApplication.locale
      );
      await sendEmail(statusUpdateEmail);
      console.log("✅ Status update email sent successfully");
    } catch (emailError) {
      console.error("❌ Status update email failed:", emailError);
      // Don't fail the status update if email fails
    }

    // Revalidate the admin page
    revalidatePath("/admin/applications");

    return {
      success: true,
      message: "Application status updated successfully!",
      data: updatedApplication,
    };

  } catch (error) {
    console.error("Status update error:", error);

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
      message: "Failed to update application status. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Get application with status history
export async function getApplicationWithHistory(applicationId: string) {
  try {
    const application = await prisma.jobApplication.findUnique({
      where: { id: applicationId },
    });

    if (!application) {
      return {
        success: false,
        message: "Application not found",
      };
    }

    return {
      success: true,
      data: application,
    };

  } catch (error) {
    console.error("Get application error:", error);
    return {
      success: false,
      message: "Failed to retrieve application",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
