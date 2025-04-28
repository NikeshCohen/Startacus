import { relations } from "drizzle-orm/relations";
import { user, account, session } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.user_id],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	sessions: many(session),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.user_id],
		references: [user.id]
	}),
}));