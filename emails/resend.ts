import EmailVerification from "@/emails/email-verification";
import { Resend } from "resend";
import { z } from "zod";

const RESEND_API_KEY = z
  .string({
    description: "API key for Resend",
    required_error: "The environment variable RESEND_API_KEY is required",
  })
  .parse(process.env.RESEND_API_KEY);

const RESEND_FROM_EMAIL = z
  .string({
    description: "Email address to send from via Resend",
    required_error: "The environment variable RESEND_FROM_EMAIL is required",
  })
  .email("RESEND_FROM_EMAIL must be a valid email address")
  .parse(process.env.RESEND_FROM_EMAIL);

export const resend = new Resend(RESEND_API_KEY);
export const from = RESEND_FROM_EMAIL;

export async function sendEmailVerification({
  userEmail,
  username,
  verificationLink,
}: {
  userEmail: string;
  username: string;
  verificationLink: string;
}) {
  return resend.emails.send({
    from,
    to: userEmail,
    subject: "Startacus - Verify your email address",
    react: EmailVerification({
      userEmail,
      username,
      verificationLink,
    }),
  });
}
