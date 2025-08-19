"use server";

import { z } from "zod";
import db from "@/lib/prisma";

// Define a schema for input validation
const CromboDataSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  mobile: z
    .string()
    .min(10, "Mobile number must be at least 10 characters long"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters long"),
  note: z.string().optional(),
});

type CromboData = z.infer<typeof CromboDataSchema>;

export async function saveCromboData(data: CromboData) {
  try {
    // Validate input data
    const validatedData = CromboDataSchema.parse(data);

    // Attempt to create the record
    const newCromboEntry = await db.crombo.create({
      data: {
        ...validatedData,
        note: validatedData.note ?? "", // Ensure note is always a string
      },
    });

    return {
      success: true,
      data: newCromboEntry,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      return {
        success: false,
        error: "Validation failed",
        details: error.errors,
      };
    }

    // Handle database errors
    console.error("Database Error:", error);
    return {
      success: false,
      error: "Failed to save data",
    };
  }
} 