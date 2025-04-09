import { relations } from "drizzle-orm/relations";
import { user, account, session, posts } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	sessions: many(session),
	posts: many(posts),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const postsRelations = relations(posts, ({one}) => ({
	user: one(user, {
		fields: [posts.userId],
		references: [user.id]
	}),
}));