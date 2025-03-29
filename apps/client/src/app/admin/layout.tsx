"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { getSession } from "@/utils/session";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { Separator } from "@workspace/ui/components/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import { Settings2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const items = [
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

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const session = await getSession();

  if (!session || session.user.type === "ADMIN") {
    router.push(`/unauthorized?origin=${encodeURIComponent(pathname)}`);
  }

  const user = {
    name: session?.user.name ?? "",
    email: "m@example.com",
    avatar: "",
  };

  return (
    <SidebarProvider>
      <AppSidebar items={items} type="ADMIN" user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Breadcrumb</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
