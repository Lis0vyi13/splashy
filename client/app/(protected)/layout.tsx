import { Sidebar } from '@/widgets/sidebar';

import { SidebarProvider } from '@/shared/ui';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex gap-6 w-full">
        <Sidebar />
        <main className="w-full py-6">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
