"server only";

import * as schema from "@/database/drizzle/schema";
import { DrizzleConfig as Config } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { z } from "zod";

const DATABASE_URL = z
  .string({
    description: "The URL of the Supabase database",
    required_error: "The environment variable DATABASE_URL is required",
  })
  .url()
  .parse(process.env.DATABASE_URL);

const config = {
  casing: "camelCase",
  logger: true,
  schema,
} satisfies Config<typeof schema>;

const db = drizzle({
  client: postgres(DATABASE_URL, { prepare: false }),
  ...config,
});

export { db };
