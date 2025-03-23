import { SidebarMain } from "@/components/sidebar-main";
import { env } from "@/env/server";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import { Command, Settings2 } from "lucide-react";
import Link from "next/link";

interface AppSidebarProps {}

const navMain = [
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings2,
    isActive: true,
    items: [
      {
        title: "General",
        url: "/admin/settings/general",
      },
    ],
  },
];

function AppSidebar({}: AppSidebarProps) {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  {/* Replace with logo later on */}
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {env.SITE_NAME}
                  </span>
                  <span className="truncate text-xs">Admin Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMain items={navMain} />
      </SidebarContent>
    </Sidebar>
  );
}

export { AppSidebar };
