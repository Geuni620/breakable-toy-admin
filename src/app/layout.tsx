import { AppSidebar } from "../components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <AppSidebar />
        <SidebarTrigger />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
};
