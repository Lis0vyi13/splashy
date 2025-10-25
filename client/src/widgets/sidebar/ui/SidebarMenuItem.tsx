import Link from 'next/link';

import { cn } from '@/shared/lib/utils';
import { Typography } from '@/shared/ui';

import type { MenuItem } from '../model';

interface SidebarMenuItemProps {
  item: MenuItem;
  active?: boolean;
}

const SidebarMenuItem = ({ item, active }: SidebarMenuItemProps) => {
  const Icon = item.icon;

  const baseClasses = cn(
    'flex items-center gap-2 px-4 py-2 rounded-2xl font-medium transition-colors bg-text',
    active ? 'bg-primary text-secondary' : 'text-primary hover:bg-muted'
  );

  return (
    <Link href={item.href} className={baseClasses}>
      <Icon className="size-5 flex-shrink-0" />
      <Typography className="group-data-[collapsible=icon]:hidden" variant="p">
        {item.label}
      </Typography>
    </Link>
  );
};

export default SidebarMenuItem;
