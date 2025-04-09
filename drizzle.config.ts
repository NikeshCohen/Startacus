import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
import type { Config } from "drizzle-kit";

dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

export default defineConfig({
  schema: "./database/schema",
  out: "./database/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  schemaFilter: ["public"],
  introspect: {
    casing: "preserve",
  },
  verbose: true,
  strict: true,
}) satisfies Config;
