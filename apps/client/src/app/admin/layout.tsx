import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@workspace/ui/components/sidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="ml-[var(--sidebar-width)] p-4">
        {children}
      </div>
    </SidebarProvider>
  );
}
