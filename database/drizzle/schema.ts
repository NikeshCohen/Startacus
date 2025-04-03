import { pgTable, unique, serial, text, integer, foreignKey, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const usersTable = pgTable("users_table", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	age: integer().notNull(),
	email: text().notNull(),
}, (table) => [
	unique("users_table_email_unique").on(table.email),
]);

export const postsTable = pgTable("posts_table", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	content: text().notNull(),
	userId: integer("user_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [usersTable.id],
			name: "posts_table_user_id_users_table_id_fk"
		}).onDelete("cascade"),
]);
