import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@workspace/ui/components/sidebar";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
    </SidebarProvider>
  );
}
