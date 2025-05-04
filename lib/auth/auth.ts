import { db } from "@/database";
import { account, session, user, verification } from "@/database/schema/user";
import { sendEmailVerification, sendMagicLinkEmail } from "@/emails/resend";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin, haveIBeenPwned, magicLink } from "better-auth/plugins";
import { oAuthProxy } from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { z } from "zod";

const BETTER_AUTH_SECRET = z
  .string({
    description: "The secret key for the BetterAuth",
    required_error: "The environment variable BETTER_AUTH_SECRET is required",
  })
  .parse(process.env.BETTER_AUTH_SECRET);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BETTER_AUTH_URL = z
  .string({
    description: "The URL for the BetterAuth",
    required_error: "The environment variable BETTER_AUTH_URL is required",
  })
  .parse(process.env.BETTER_AUTH_URL);

const GOOGLE_CLIENT_ID = z
  .string({
    description: "The client ID for the Google provider",
    required_error: "The environment variable GOOGLE_CLIENT_ID is required",
  })
  .parse(process.env.GOOGLE_CLIENT_ID);

const GOOGLE_CLIENT_SECRET = z
  .string({
    description: "The client secret for the Google provider",
    required_error: "The environment variable GOOGLE_CLIENT_SECRET is required",
  })
  .parse(process.env.GOOGLE_CLIENT_SECRET);

const GITHUB_CLIENT_ID = z
  .string({
    description: "The client ID for the GitHub provider",
    required_error: "The environment variable GITHUB_CLIENT_ID is required",
  })
  .parse(process.env.GITHUB_CLIENT_ID);

const GITHUB_CLIENT_SECRET = z
  .string({
    description: "The client secret for the GitHub provider",
    required_error: "The environment variable GITHUB_CLIENT_SECRET is required",
  })
  .parse(process.env.GITHUB_CLIENT_SECRET);

export const auth = betterAuth({
  appName: "Startacus",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  socialProviders: {
    google: {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, url }) {
      await sendEmailVerification({
        userEmail: user.email,
        username: user.name,
        verificationLink: url,
      });
    },
  },
  account: {
    accountLinking: {
      trustedProviders: ["google", "github"],
    },
  },
  plugins: [
    nextCookies(),
    oAuthProxy(),
    admin({
      defaultRole: "user",
      adminRoles: ["admin", "superadmin"],
    }),
    passkey(),
    haveIBeenPwned({
      customPasswordCompromisedMessage: "Please choose a more secure password.",
    }),
    magicLink({
      disableSignUp: true,
      sendMagicLink: async ({ email, url }) => {
        await sendMagicLinkEmail({
          userEmail: email,
          magicLinkUrl: url,
        });
      },
    }),
  ],
  secret: BETTER_AUTH_SECRET,
  advanced: {
    cookiePrefix: "startacus",
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 30, // Cache duration in seconds
    },
  },
});
