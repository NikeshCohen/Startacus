import { account, passkey, session, user } from "@/database/drizzle/schema";
import { relations } from "drizzle-orm/relations";

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.user_id],
    references: [user.id],
  }),
}));

export const userRelations = relations(user, ({ many }) => ({
  accounts: many(account),
  passkeys: many(passkey),
  sessions: many(session),
}));

export const passkeyRelations = relations(passkey, ({ one }) => ({
  user: one(user, {
    fields: [passkey.user_id],
    references: [user.id],
  }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.user_id],
    references: [user.id],
  }),
}));
