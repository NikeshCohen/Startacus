import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const config = {
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
};

export default config;
