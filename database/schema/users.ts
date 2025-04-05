import { timestamps } from "@/database/schema/columns";
import {
  integer,
  serial,
  pgTable as table,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const usersTable = table(
  "users_table",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    age: integer("age").notNull(),
    email: text("email").notNull().unique(),
    ...timestamps,
  },
  (table) => [uniqueIndex("email_idx").on(table.email)],
);

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
