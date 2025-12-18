import {
  IconBuildingSkyscraper,
  IconChartBar,
  IconClipboardList,
  IconCreditCard,
  IconDashboard,
  IconDatabase,
  IconFileInvoice,
  IconHelp,
  IconReport,
  IconSettings,
} from "@tabler/icons-react";

type NavItem = {
  title: string;
  url: string;
  icon?: any;
  description?: string;
  comingSoon?: boolean;
  items?: NavItem[];
};

export const navConfig: Record<
  string,
  { main: NavItem[]; secondary: NavItem[]; documents: NavItem[] }
> = {
  exporter: {
    main: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: IconDashboard,
        description: "Overview of your Seedlot data and metrics.",
      },
      {
        title: "Seed Lots",
        url: "/dashboard/lots",
        icon: IconClipboardList,
        description: "Manage your seed lots and their details.",
      },
      {
        title: "Imports",
        url: "/dashboard/imports",
        icon: IconChartBar,
        description: "Track seed import activities.",
      },
      {
        title: "Validation",
        url: "/dashboard/validation",
        icon: IconFileInvoice,
        description: "Inspect and validate seed lots.",
      },
      {
        title: "Organizations & Suppliers",
        url: "/dashboard/orgs",
        icon: IconBuildingSkyscraper,
        description: "Manage organizations and suppliers.",
        items: [
          { title: "Organizations", url: "/dashboard/orgs" },
          { title: "Suppliers", url: "/dashboard/suppliers" },
        ],
      },
    ],
    secondary: [
      { title: "Settings", url: "/dashboard/settings", icon: IconSettings },
      { title: "Help & Support", url: "/dashboard/help", icon: IconHelp },
    ],
    documents: [
      { title: "Reports", url: "/dashboard/reports", icon: IconReport },
      { title: "Data Library", url: "/dashboard/data", icon: IconDatabase },
      { title: "Billing Plans", url: "/dashboard/plans", icon: IconCreditCard },
    ],
  },

  supplier: {
    main: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: IconDashboard,
        description: "Your submitted seed lots and guidance.",
      },
      {
        title: "Submit Seed Lot",
        url: "/dashboard/lots/new",
        icon: IconClipboardList,
        description: "Add new seed lot.",
      },
      {
        title: "Your Lots",
        url: "/dashboard/lots",
        icon: IconClipboardList,
        description: "Track submitted lots & status.",
      },
    ],
    secondary: [
      { title: "Settings", url: "/dashboard/settings", icon: IconSettings },
      { title: "Help & Support", url: "/dashboard/help", icon: IconHelp },
    ],
    documents: [],
  },

  inspector: {
    main: [
      { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
      {
        title: "Validation",
        url: "/dashboard/validation",
        icon: IconFileInvoice,
      },
    ],
    secondary: [
      { title: "Settings", url: "/dashboard/settings", icon: IconSettings },
    ],
    documents: [],
  },

  internal: {
    main: [
      { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
      {
        title: "Batch Review",
        url: "/dashboard/batch",
        icon: IconClipboardList,
      },
      { title: "Reports", url: "/dashboard/reports", icon: IconReport },
      {
        title: "Organizations & Suppliers",
        url: "/dashboard/orgs",
        icon: IconBuildingSkyscraper,
        description: "Manage organizations and suppliers.",
        items: [
          { title: "Organizations", url: "/dashboard/orgs" },
          { title: "Suppliers", url: "/dashboard/suppliers" },
        ],
      },
    ],
    secondary: [
      { title: "Settings", url: "/dashboard/settings", icon: IconSettings },
    ],
    documents: [],
  },

  importer: {
    main: [
      { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
      { title: "Shipments", url: "/dashboard/shipments", icon: IconChartBar },
    ],
    secondary: [
      { title: "Settings", url: "/dashboard/settings", icon: IconSettings },
    ],
    documents: [],
  },
};
