import { SidebarMain } from "@/components/sidebar-main";
import { SidebarUser } from "@/components/sidebar-user";
import { env } from "@/env/server";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import { Command, LucideIcon } from "lucide-react";
import Link from "next/link";

interface AppSidebarProps {
  type: "ADMIN";
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}

function AppSidebar({ items, type, user }: AppSidebarProps) {
  let root = "";

  switch (type) {
    case "ADMIN":
      root = "/admin";
  }

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={root}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  {/* Replace with logo later on */}
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {env.SITE_NAME}
                  </span>
                  <span className="truncate text-xs">
                    {type === "ADMIN" && "Admin Dashboard"}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMain items={items} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}

export { AppSidebar };
