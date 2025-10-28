import {
  boolean,
  foreignKey,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const verification = pgTable("verification", {
  id: text().primaryKey().notNull(),
  identifier: text().notNull(),
  value: text().notNull(),
  expires_at: timestamp({ mode: "string" }).notNull(),
  created_at: timestamp({ mode: "string" }),
  updated_at: timestamp({ mode: "string" }),
});

export const user = pgTable(
  "user",
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    email: text().notNull(),
    email_verified: boolean().notNull(),
    image: text(),
    role: text(),
    banned: boolean(),
    ban_reason: text(),
    ban_expires: timestamp({ mode: "string" }),
    created_at: timestamp({ mode: "string" }).defaultNow().notNull(),
    updated_at: timestamp({ mode: "string" }).notNull(),
  },
  (table) => [unique("user_email_unique").on(table.email)],
);

export const account = pgTable(
  "account",
  {
    id: text().primaryKey().notNull(),
    account_id: text().notNull(),
    provider_id: text().notNull(),
    user_id: text().notNull(),
    access_token: text(),
    refresh_token: text(),
    id_token: text(),
    access_token_expires_at: timestamp({ mode: "string" }),
    refresh_token_expires_at: timestamp({ mode: "string" }),
    scope: text(),
    password: text(),
    created_at: timestamp({ mode: "string" }).defaultNow().notNull(),
    updated_at: timestamp({ mode: "string" }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.user_id],
      foreignColumns: [user.id],
      name: "account_user_id_user_id_fk",
    }).onDelete("cascade"),
  ],
);

export const passkey = pgTable(
  "passkey",
  {
    id: text().primaryKey().notNull(),
    name: text(),
    public_key: text().notNull(),
    user_id: text().notNull(),
    credential_i_d: text().notNull(),
    counter: integer().notNull(),
    device_type: text().notNull(),
    backed_up: boolean().notNull(),
    transports: text(),
    created_at: timestamp({ mode: "string" }),
  },
  (table) => [
    foreignKey({
      columns: [table.user_id],
      foreignColumns: [user.id],
      name: "passkey_user_id_user_id_fk",
    }).onDelete("cascade"),
  ],
);

export const session = pgTable(
  "session",
  {
    id: text().primaryKey().notNull(),
    expires_at: timestamp({ mode: "string" }).notNull(),
    token: text().notNull(),
    ip_address: text(),
    user_agent: text(),
    user_id: text().notNull(),
    impersonated_by: text(),
    created_at: timestamp({ mode: "string" }).defaultNow().notNull(),
    updated_at: timestamp({ mode: "string" }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.user_id],
      foreignColumns: [user.id],
      name: "session_user_id_user_id_fk",
    }).onDelete("cascade"),
    unique("session_token_unique").on(table.token),
  ],
);
