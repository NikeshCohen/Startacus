import { relations } from "drizzle-orm/relations";
import { user, posts, account, session } from "./schema";

export const postsRelations = relations(posts, ({one}) => ({
	user: one(user, {
		fields: [posts.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	posts: many(posts),
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