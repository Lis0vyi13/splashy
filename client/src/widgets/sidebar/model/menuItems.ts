import { NewspaperIcon, Settings } from 'lucide-react';

import { ROUTES } from '@/shared/config';

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
}

export const menuItems: MenuItem[] = [
  { id: 'feed', label: 'Feed', href: ROUTES.FEED, icon: NewspaperIcon },
  { id: 'settings', label: 'Settings', href: '/settings', icon: Settings },
];
