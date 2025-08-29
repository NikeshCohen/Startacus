"use client";

import {
  Folder,
  type LucideIcon,
  MoreHorizontal,
  Share,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavWorkspace({
  workspaces,
}: {
  workspaces: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup
      className="group-data-[collapsible=icon]:hidden"
      aria-label="Workspace navigation"
    >
      <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
      <SidebarMenu>
        {workspaces.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a
                href={item.url}
                className="hover:bg-transparent active:bg-transparent"
                aria-label={`Workspace: ${item.name}`}
              >
                <item.icon aria-hidden="true" />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  className="cursor-pointer hover:bg-transparent"
                  aria-label={`${item.name} options`}
                >
                  <MoreHorizontal aria-hidden="true" />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
                role="menu"
                aria-label={`${item.name} options`}
              >
                <DropdownMenuItem role="menuitem">
                  <Folder
                    className="text-muted-foreground"
                    aria-hidden="true"
                  />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem role="menuitem">
                  <Share className="text-muted-foreground" aria-hidden="true" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem role="menuitem">
                  <Trash2 aria-hidden="true" className="text-destructive" />
                  <span className="text-destructive">Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
