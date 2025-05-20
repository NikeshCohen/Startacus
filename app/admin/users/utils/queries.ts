import { listUsers } from "@/actions/admin";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export const fetchAllUsers = (page: number = 1, pageSize: number = 10) => {
  return queryOptions({
    queryKey: ["users", page],
    queryFn: async () => {
      const data = await listUsers(pageSize, page);
      return data;
    },
    placeholderData: keepPreviousData,
  });
};
