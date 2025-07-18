import * as z from "zod";

export const BETTER_AUTH_SECRET = z
  .string()
  .nonempty("The environment variable BETTER_AUTH_SECRET is required")
  .parse(process.env.BETTER_AUTH_SECRET);

export const BETTER_AUTH_URL = z
  .string()
  .nonempty("The environment variable BETTER_AUTH_URL is required")
  .url()
  .parse(process.env.BETTER_AUTH_URL);

export const GOOGLE_CLIENT_ID = z
  .string()
  .nonempty("The environment variable GOOGLE_CLIENT_ID is required")
  .parse(process.env.GOOGLE_CLIENT_ID);

export const GOOGLE_CLIENT_SECRET = z
  .string()
  .nonempty("The environment variable GOOGLE_CLIENT_SECRET is required")
  .parse(process.env.GOOGLE_CLIENT_SECRET);

export const GITHUB_CLIENT_ID = z
  .string()
  .nonempty("The environment variable GITHUB_CLIENT_ID is required")
  .parse(process.env.GITHUB_CLIENT_ID);

export const GITHUB_CLIENT_SECRET = z
  .string()
  .nonempty("The environment variable GITHUB_CLIENT_SECRET is required")
  .parse(process.env.GITHUB_CLIENT_SECRET);

export const RESEND_API_KEY = z
  .string()
  .nonempty("The environment variable RESEND_API_KEY is required")
  .parse(process.env.RESEND_API_KEY);

export const RESEND_FROM_EMAIL = z
  .string()
  .nonempty("The environment variable RESEND_FROM_EMAIL is required")
  .email("RESEND_FROM_EMAIL must be a valid email address")
  .parse(process.env.RESEND_FROM_EMAIL);
