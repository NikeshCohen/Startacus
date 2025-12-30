import { createAccessControl } from "better-auth/plugins/access";

const statement = {
  user: [
    "create",
    "list",
    "set-role",
    "ban",
    "impersonate",
    "delete",
    "set-password",
  ],
  session: ["list", "revoke", "delete"],
} as const;

export const accessControl = createAccessControl(statement);

export const adminRole = accessControl.newRole({
  user: ["create", "list", "set-role"],
  session: ["list", "revoke"],
});

export const superadminRole = accessControl.newRole({
  user: [
    "create",
    "list",
    "set-role",
    "ban",
    "impersonate",
    "delete",
    "set-password",
  ],
  session: ["list", "revoke", "delete"],
});
