import { Route } from "next";

import {
  BarChart,
  FileText,
  Frame,
  HandCoins,
  Map,
  PieChart,
  Send,
  Settings2,
  ShoppingCart,
  SquareTerminal,
  Users,
} from "lucide-react";

export const sidebarMenus = {
  user: {
    name: "James",
    email: "james@example.com",
    avatar: "/avatars/avatar.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/overview" as Route,
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard/overview" as Route,
        },
        {
          title: "Activity Logs",
          url: "/dashboard/activity-logs" as Route,
        },
      ],
    },
    {
      title: "Leads",
      url: "/dashboard/leads" as Route,
      icon: HandCoins,
      items: [
        {
          title: "All Leads",
          url: "/dashboard/leads" as Route,
        },
        {
          title: "Qualified Leads",
          url: "/dashboard/leads/qualified" as Route,
        },
        {
          title: "Lead Scoring",
          url: "/dashboard/leads/lead-scoring" as Route,
        },
      ],
    },
    {
      title: "Customers",
      url: "/dashboard/customers" as Route,
      icon: Users,
      items: [
        {
          title: "All Customers",
          url: "/dashboard/customers" as Route,
        },
        {
          title: "Segments",
          url: "/dashboard/customers/segments" as Route,
        },
        {
          title: "Import/Export",
          url: "/dashboard/customers/import-export" as Route,
        },
      ],
    },
    {
      title: "Orders",
      url: "/dashboard/orders" as Route,
      icon: ShoppingCart,
      items: [
        {
          title: "All Orders",
          url: "/dashboard/orders" as Route,
        },
        {
          title: "Pending Orders",
          url: "/dashboard/orders/pending" as Route,
        },
        {
          title: "Completed Orders",
          url: "/dashboard/orders/completed" as Route,
        },
      ],
    },

    {
      title: "Invoices",
      url: "/dashboard/invoices" as Route,
      icon: FileText,
      items: [
        {
          title: "All Invoices",
          url: "/dashboard/invoices" as Route,
        },
        {
          title: "Pending",
          url: "/dashboard/invoices/pending" as Route,
        },
        {
          title: "Paid",
          url: "/dashboard/invoices/paid" as Route,
        },
      ],
    },
    {
      title: "Reports",
      url: "/dashboard/reports/sales" as Route,
      icon: BarChart,
      items: [
        {
          title: "Sales Report",
          url: "/dashboard/reports/sales" as Route,
        },
        {
          title: "Customer Insights",
          url: "/dashboard/reports/customer-insights" as Route,
        },
        {
          title: "Revenue",
          url: "/dashboard/reports/revenue" as Route,
        },
      ],
    },
    {
      title: "Settings",
      url: "/dashboard/settings/general" as Route,
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/dashboard/settings/general" as Route,
        },
        {
          title: "Users & Permissions",
          url: "/dashboard/settings/users" as Route,
        },
        {
          title: "Integrations",
          url: "/dashboard/settings/integrations" as Route,
        },
        {
          title: "API Settings",
          url: "/dashboard/settings/api" as Route,
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Feedback",
      url: "/dashboard/feedback" as Route,
      icon: Send,
    },
  ],
  workspaces: [
    {
      name: "Customer Management",
      url: "/dashboard/customers" as Route,
      icon: Frame,
    },
    {
      name: "Sales Performance",
      url: "/dashboard/reports/sales" as Route,
      icon: PieChart,
    },
    {
      name: "Business Expansion",
      url: "/dashboard/reports/sales" as Route,
      icon: Map,
    },
  ],
};
