'use client';

import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  Sidebar as UISidebar,
} from '@/shared/ui';

import SidebarDownloadApp from './SidebarDownloadApp';
import SidebarMenu from './SidebarMenu';
import SidebarUserInfo from './SidebarUserInfo';

const Sidebar = () => {
  return (
    <UISidebar
      collapsible="icon"
      className="py-6 px-4 group-data-[collapsible=icon]:px-2"
    >
      <SidebarHeader>
        <SidebarUserInfo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu />
      </SidebarContent>
      <SidebarFooter>
        <SidebarDownloadApp />
      </SidebarFooter>
    </UISidebar>
  );
};

export default Sidebar;
