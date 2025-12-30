import {
  BETTER_AUTH_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "@/constants/envs";
import { db } from "@/database";
import { account, session, user, verification } from "@/database/schema/user";
import {
  sendEmailChangeConfirmation,
  sendEmailVerification,
  sendMagicLinkEmail,
} from "@/emails/resend";
import { BetterAuthOptions, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import {
  admin,
  customSession,
  haveIBeenPwned,
  magicLink,
  oAuthProxy,
} from "better-auth/plugins";

import { getBaseUrl } from "@/lib/utils";

const baseUrl = getBaseUrl();

const options = {
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
      redirectURI: `${baseUrl}/api/auth/callback/google`,
    },
    github: {
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      redirectURI: `${baseUrl}/api/auth/callback/github`,
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
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url }) => {
        await sendEmailChangeConfirmation({
          userEmail: user.email,
          newEmail,
          username: user.name,
          confirmationLink: url,
        });
      },
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      allowDifferentEmails: true,
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
} satisfies BetterAuthOptions;

export const auth = betterAuth({
  ...options,
  plugins: [
    ...(options.plugins ?? []),
    customSession(async ({ user, session }) => {
      return {
        user,
        session,
      };
    }, options),
  ],
});
