"use client";

import { Route } from "next";
import Link from "next/link";

import {
  Breadcrumb as BreadcrumbType,
  useBreadcrumbs,
} from "@/hooks/useBreadCrumbs";
import { ChevronRight } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface DashboardBreadCrumbsProps {
  homeHref?: Route;
  homeLabel?: string;
  showHome?: boolean;
  className?: string;
}

export function DashboardBreadCrumbs({
  homeHref = "/dashboard",
  homeLabel = "Home",
  showHome = true,
  className,
}: DashboardBreadCrumbsProps) {
  const breadcrumbs = useBreadcrumbs();

  if (breadcrumbs.length === 0) return null;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList aria-label="Navigation breadcrumbs">
        {showHome && (
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={homeHref}>{homeLabel}</Link>
            </BreadcrumbLink>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </BreadcrumbItem>
        )}

        {breadcrumbs.map((crumb: BreadcrumbType) => (
          <BreadcrumbItem key={crumb.href}>
            {!crumb.isCurrent ? (
              <>
                <BreadcrumbLink asChild>
                  <Link href={crumb.href as Route}>{crumb.label}</Link>
                </BreadcrumbLink>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </>
            ) : (
              <BreadcrumbPage aria-current="page">{crumb.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
