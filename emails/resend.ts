import { RESEND_API_KEY, RESEND_FROM_EMAIL } from "@/constants/envs";
import EmailChangeConfirmation from "@/emails/email-change-confirmation";
import EmailVerification from "@/emails/email-verification";
import MagicLinkEmail from "@/emails/magic-link";
import { Resend } from "resend";

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

export async function sendEmailChangeConfirmation({
  userEmail,
  newEmail,
  username,
  confirmationLink,
}: {
  userEmail: string;
  newEmail: string;
  username: string;
  confirmationLink: string;
}) {
  return resend.emails.send({
    from,
    to: userEmail,
    subject: "Startacus - Confirm your email address change",
    react: EmailChangeConfirmation({
      userEmail,
      newEmail,
      username,
      confirmationLink,
    }),
  });
}
