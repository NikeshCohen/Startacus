import { timestamps } from "@/database/schema/columns";
import { usersTable } from "@/database/schema/users";
import { integer, serial, pgTable as table, text } from "drizzle-orm/pg-core";

export const postsTable = table("posts_table", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  ...timestamps,
});

export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;
