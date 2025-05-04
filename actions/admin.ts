import { authClient } from "@/lib/auth/auth-client";

export const createNewUser = async (
  name: string,
  email: string,
  password: string,
  role: "admin" | "user" | ("admin" | "user")[],
) => {
  const newUser = await authClient.admin.createUser({
    name,
    email,
    password,
    role, // this can also be an array for multiple roles (e.g. ["admin", "sale"])
  });

  if (newUser.error) return { error: newUser.error };

  return { newUser };
};

export const updateUserRole = async (
  userId: string,
  role: "admin" | "user" | ("admin" | "user")[],
) => {
  const updatedUser = await authClient.admin.setRole({
    userId,
    role, // this can also be an array for multiple roles (e.g. ["admin", "sale"])
  });

  if (updatedUser.error) return { error: updatedUser.error };

  return { updatedUser };
};

export const deleteUser = async (userId: string) => {
  const deletedUser = await authClient.admin.removeUser({
    userId,
  });

  if (deletedUser.error) return { error: deletedUser.error };

  return { deletedUser };
};

export const banUser = async (userId: string, banReason?: string) => {
  const bannedUser = await authClient.admin.banUser({
    userId,
    banReason,
  });

  if (bannedUser.error) return { error: bannedUser.error };

  return { bannedUser };
};

export const unbanUser = async (userId: string) => {
  const unbannedUser = await authClient.admin.unbanUser({
    userId,
  });

  if (unbannedUser.error) return { error: unbannedUser.error };

  return { unbannedUser };
};

export const listUserSessions = async (userId: string) => {
  const sessions = await authClient.admin.listUserSessions({
    userId,
  });

  if (sessions.error) return { error: sessions.error };

  return { sessions };
};

export const revokeAllUserSessions = async (userId: string) => {
  const revokedSessions = await authClient.admin.revokeUserSessions({
    userId,
  });

  if (revokedSessions.error) return { error: revokedSessions.error };

  return { revokedSessions };
};

export const revokeUserSession = async (sessionToken: string) => {
  const revokedSession = await authClient.admin.revokeUserSession({
    sessionToken,
  });

  if (revokedSession.error) return { error: revokedSession.error };

  return { revokedSession };
};

export const impersonateUser = async (userId: string) => {
  const impersonatedSession = await authClient.admin.impersonateUser({
    userId,
  });

  if (impersonatedSession.error) return { error: impersonatedSession.error };

  return { impersonatedSession };
};

export const stopImpersonation = async () => {
  await authClient.admin.stopImpersonating();
};

export const listUsers = async (pageSize: number, currentPage: number) => {
  const users = await authClient.admin.listUsers({
    query: {
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
    },
  });

  if (users.error) return { error: users.error };

  return {
    users: users.data?.users ?? [],
    total: users.data?.total ?? 0,
  };
};
