"use client";

import { useEffect } from "react";

import { fetchAllUsers } from "@/app/admin/users/utils/queries";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";

function UsersTable() {
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ history: "push" }),
  );
  const queryClient = useQueryClient();
  const pageSize = 10;

  const { data, isPending, isError, error } = useQuery(
    fetchAllUsers(page, pageSize),
  );

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
    queryClient.prefetchQuery(fetchAllUsers(page + 2, pageSize));
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  // Handle invalid page numbers in URL
  useEffect(() => {
    if (data && !isPending) {
      const { total = 0 } = data;
      const totalPages = Math.ceil(total / pageSize);

      if (page > totalPages && totalPages > 0) {
        setPage(totalPages);
      }

      // Handle negative page numbers
      if (page < 1) {
        setPage(1);
      }
    }
  }, [data, page, pageSize, setPage, isPending]);

  if (isPending) return <div>Loading...</div>;
  if (isError)
    return <div>Error: {error?.message || "Failed to fetch users"}</div>;
  if (!data) return <div>No data available</div>;

  const { users = [], total = 0 } = data;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Users</h2>
        <div className="flex items-center gap-2">
          <span>
            Page {page} of {totalPages} ({total} users)
          </span>
          <div className="flex items-center gap-2">
            <Button
              onClick={handlePrevPage}
              disabled={page === 1}
              variant="outline"
            >
              Previous
            </Button>
            <Button
              onClick={handleNextPage}
              disabled={page >= totalPages}
              variant="outline"
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-md border p-4">
        <pre className="max-h-[500px] overflow-auto whitespace-pre-wrap">
          {JSON.stringify(users, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default UsersTable;
