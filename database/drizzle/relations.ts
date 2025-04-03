import { relations } from "drizzle-orm/relations";
import { usersTable, postsTable } from "./schema";

export const postsTableRelations = relations(postsTable, ({one}) => ({
	usersTable: one(usersTable, {
		fields: [postsTable.userId],
		references: [usersTable.id]
	}),
}));

export const usersTableRelations = relations(usersTable, ({many}) => ({
	postsTables: many(postsTable),
}));