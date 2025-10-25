'use client';

import { usePathname } from 'next/navigation';

import { menuItems } from '../model';
import SidebarMenuItem from './SidebarMenuItem';

const SidebarMenu = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {menuItems.map((item) => {
        const active = item.href?.startsWith(pathname);
        return <SidebarMenuItem active={active} key={item.id} item={item} />;
      })}
    </nav>
  );
};

export default SidebarMenu;
