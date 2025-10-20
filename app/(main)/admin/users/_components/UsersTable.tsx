"use client";

import { useEffect, useState } from "react";

import { fetchAllUsers } from "@/app/(main)/admin/users/utils/queries";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";

import { LoaderButton } from "@/components/global/LoaderButton";

type NavigationAction = "first" | "prev" | "next" | "last" | null;

function UsersTable() {
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ history: "push" }),
  );
  const [loadingAction, setLoadingAction] = useState<NavigationAction>(null);
  const queryClient = useQueryClient();
  const pageSize = 10;

  const { data, isPending, isError, isFetching, error } = useQuery(
    fetchAllUsers(page, pageSize),
  );

  useEffect(() => {
    if (!isFetching) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoadingAction(null);
    }
  }, [isFetching]);

  const { users = [], total = 0 } = data || {};
  const totalPages = Math.ceil(total / pageSize);

  const handleNavigation = (action: NavigationAction) => {
    setLoadingAction(action);
    switch (action) {
      case "first":
        setPage(1);
        break;
      case "prev":
        setPage((prev) => Math.max(1, prev - 1));
        break;
      case "next":
        setPage((prev) => prev + 1);
        queryClient.prefetchQuery(fetchAllUsers(page + 2, pageSize));
        break;
      case "last":
        setPage(totalPages);
        break;
    }
  };

  const navigationButtons = [
    {
      action: "first" as NavigationAction,

      icon: ChevronFirst,
      disabled: page === 1,
    },
    {
      action: "prev" as NavigationAction,

      icon: ChevronLeft,
      disabled: page === 1,
    },
    {
      action: "next" as NavigationAction,
      icon: ChevronRight,
      disabled: page >= totalPages,
    },
    {
      action: "last" as NavigationAction,
      icon: ChevronLast,
      disabled: page >= totalPages,
    },
  ];

  // Handle invalid page numbers in URL
  useEffect(() => {
    if (data && !isPending) {
      if (page > totalPages && totalPages > 0) {
        setPage(totalPages);
      }
      if (page < 1) {
        setPage(1);
      }
    }
  }, [data, page, totalPages, setPage, isPending]);

  if (isPending) return <div>Loading...</div>;
  if (isError)
    return <div>Error: {error?.message || "Failed to fetch users"}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div className="my-32 w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Users ({total} users)</h2>
      </div>

      <div className="rounded-md border p-4">
        <pre className="max-h-[500px] overflow-auto whitespace-pre-wrap">
          {JSON.stringify(users, null, 2)}
        </pre>
      </div>

      <div className="flex items-center justify-between gap-2">
        <span></span>
        <div className="flex items-center gap-2">
          {navigationButtons.map(({ action, icon: Icon, disabled }) => (
            <LoaderButton
              key={action}
              onClick={() => handleNavigation(action)}
              disabled={disabled}
              isLoading={isFetching && loadingAction === action}
              variant="outline"
              size="sm"
            >
              <Icon className="h-4 w-4" />
            </LoaderButton>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UsersTable;
