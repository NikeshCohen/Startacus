import { relations } from "drizzle-orm/relations";
import { user, passkey, account, session } from "./schema";

export const passkeyRelations = relations(passkey, ({one}) => ({
	user: one(user, {
		fields: [passkey.user_id],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	passkeys: many(passkey),
	accounts: many(account),
	sessions: many(session),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.user_id],
		references: [user.id]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.user_id],
		references: [user.id]
	}),
}));