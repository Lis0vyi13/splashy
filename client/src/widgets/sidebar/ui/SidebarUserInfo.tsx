'use client';

import Link from 'next/link';

import { UserAvatar, useMeQuery } from '@/entities/user';

import { Logo } from '@/shared/assets';
import { ROUTES } from '@/shared/config';
import { Typography, useSidebar } from '@/shared/ui';

const SidebarUserInfo = () => {
  const { state } = useSidebar();
  const user = useMeQuery();

  const name = user?.data?.name;
  const username = user?.data?.username;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex justify-center items-center">
        <Link className="rounded-full" href={ROUTES.FEED}>
          <Logo className="group-data-[collapsible=icon]:hidden" />
        </Link>
        <UserAvatar
          className={`${state !== 'collapsed' ? '-ml-3' : ''}`}
          variant={state === 'collapsed' ? 'small' : 'medium'}
        />
      </div>
      <div className="text-center group-data-[collapsible=icon]:hidden">
        <Typography className="font-bold truncate" variant="p" affects="small">
          {name}
        </Typography>

        <Typography
          className="truncate"
          variant="p"
          affects="caption"
          textColor="secondary"
        >
          @{username}
        </Typography>
      </div>
    </div>
  );
};

export default SidebarUserInfo;
