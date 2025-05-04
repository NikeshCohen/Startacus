import EmailVerification from "@/emails/email-verification";
import MagicLinkEmail from "@/emails/magic-link";
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

export const colors = {
  primary: "#cb6441",
  background: "#ffffff",
  text: "#333333",
  mutedText: "#666666",
};

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

export async function sendMagicLinkEmail({
  userEmail,
  magicLinkUrl,
}: {
  userEmail: string;
  magicLinkUrl: string;
}) {
  return resend.emails.send({
    from,
    to: userEmail,
    subject: "Startacus - Your magic link to sign in",
    react: MagicLinkEmail({
      userEmail,
      magicLinkUrl,
    }),
  });
}
