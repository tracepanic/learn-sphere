import { ClientSidebarWrapper } from "@/app/admin/layout-client";
import { AppSidebar } from "@/components/app-sidebar";
import { getSession } from "@/utils/session";
import { Settings2 } from "lucide-react";
import { redirect } from "next/navigation";

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
  const session = await getSession();

  if (!session || session.user.type !== "ADMIN") {
    redirect(`/unauthorized?origin=${encodeURIComponent("/admin/*")}`);
  }

  const user = {
    name: session.user.name ?? "",
    email: "m@example.com",
    avatar: "",
  };

  return (
    <ClientSidebarWrapper
      sidebar={<AppSidebar items={items} type="ADMIN" user={user} />}
    >
      {children}
    </ClientSidebarWrapper>
  );
}
