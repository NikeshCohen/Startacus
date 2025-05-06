import { useQuery } from "@tanstack/react-query";

import { authClient } from "@/lib/auth/auth-client";

export function useSessions() {
  return useQuery({
    queryKey: ["user-sessions"],
    queryFn: async () => {
      const { data } = await authClient.listSessions();
      return data;
    },
  });
}

export function useAccounts() {
  return useQuery({
    queryKey: ["user-accounts"],
    queryFn: async () => {
      const { data } = await authClient.listAccounts();
      return data;
    },
  });
}
