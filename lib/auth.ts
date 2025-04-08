import { db } from "@/database";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { z } from "zod";

const BETTER_AUTH_SECRET = z
  .string({
    description: "The secret key for the BetterAuth",
    required_error: "The environment variable BETTER_AUTH_SECRET is required",
  })
  .url()
  .parse(process.env.DATABASE_URL);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BETTER_AUTH_URL = z
  .string({
    description: "The URL of the app, required for the BetterAuth",
    required_error: "The environment variable BETTER_AUTH_URL is required",
  })
  .url()
  .parse(process.env.DATABASE_URL);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  secret: BETTER_AUTH_SECRET,
});
