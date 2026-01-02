"use server";

import { siteConfig } from "@/constants/site.config";
import { sendFeedbackEmail } from "@/emails/resend";
import { z } from "zod";

const feedbackSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  feedbackType: z.enum(["bug", "suggestion", "question", "other"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function submitFeedback(formData: FormData) {
  try {
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      feedbackType: formData.get("feedbackType"),
      message: formData.get("message"),
    };

    const validatedData = feedbackSchema.parse(data);

    const feedbackTypeLabels = {
      bug: "Bug Report",
      suggestion: "Suggestion",
      question: "Question",
      other: "Other",
    };

    await sendFeedbackEmail({
      name: validatedData.name,
      email: validatedData.email,
      feedbackType: feedbackTypeLabels[validatedData.feedbackType],
      message: validatedData.message,
      adminEmail: siteConfig.adminEmail,
    });

    return { success: true, message: "Feedback sent successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid input",
        details: error,
      };
    }

    console.error("Error sending feedback:", error);
    return {
      success: false,
      error: "Failed to send feedback. Please try again.",
    };
  }
}
