import { db } from "@/database";
import { account, session, user, verification } from "@/database/schema/user";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { z } from "zod";

const BETTER_AUTH_SECRET = z
  .string({
    description: "The secret key for the BetterAuth",
    required_error: "The environment variable BETTER_AUTH_SECRET is required",
  })
  .url()
  .parse(process.env.DATABASE_URL);

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
  account: {
    accountLinking: {
      trustedProviders: ["google", "github"],
    },
  },
  plugins: [nextCookies()],
  secret: BETTER_AUTH_SECRET,
  advanced: {
    cookiePrefix: "startacus",
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
});
