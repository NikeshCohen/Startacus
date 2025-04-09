import { timestamps } from "@/database/schema/columns";
import { user } from "@/database/schema/user";
import { serial, pgTable as table, text } from "drizzle-orm/pg-core";

export const posts = table("posts", {
  id: serial().primaryKey(),
  title: text().notNull(),
  content: text().notNull(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  ...timestamps,
});

export type InsertPost = typeof posts.$inferInsert;
export type SelectPost = typeof posts.$inferSelect;
