"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div
      className="flex h-full w-full flex-col"
      aria-busy="true"
      aria-label="Loading dashboard"
    >
      {/* Header skeleton */}
      <div
        className="flex h-16 items-center justify-between border-b px-4"
        aria-hidden="true"
      >
        <div className="flex items-center space-x-4">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-40" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1">
        {/* Sidebar skeleton */}
        <div
          className="bg-background hidden w-64 border-r p-4 md:block"
          aria-hidden="true"
        >
          <Skeleton className="mb-8 h-10 w-32" />
          <div className="space-y-6">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-5 w-4/5" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="flex-1 space-y-6 p-6" aria-hidden="true">
          <div className="space-y-2">
            <Skeleton className="h-10 w-1/4" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-lg border p-4">
                <Skeleton className="mb-4 h-8 w-1/2" />
                <Skeleton className="h-24 w-full" />
                <div className="mt-4 flex justify-between">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
