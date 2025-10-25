'use client';

import Image from 'next/image';

import { Logo } from '@/shared/assets';

const url = 'https://play.google.com/store/apps/details?id=your_app_id';

const SidebarMobileAds = () => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        relative cursor-pointer rounded-2xl border-3 border-dashed border-gray p-6 sm:p-10
        flex items-center justify-center
        hover:bg-blue-100/30 transition-colors
        group-data-[collapsible=icon]:p-2
        group-data-[collapsible=icon]:w-12
        group-data-[collapsible=icon]:h-12
      "
    >
      <div className="group-data-[collapsible=icon]:hidden">
        <Logo variant="large" />
      </div>

      <div className="hidden group-data-[collapsible=icon]:block">
        <Logo variant="small" />
      </div>

      <Image
        src="https://i.pravatar.cc/150?img=32"
        alt="User 1"
        width={30}
        height={30}
        className="
          absolute top-1/4 left-1/3 -translate-1/2 -rotate-12 rounded-full shadow-md
          group-data-[collapsible=icon]:hidden
        "
      />
      <Image
        src="https://i.pravatar.cc/150?img=13"
        alt="User 2"
        width={50}
        height={50}
        className="
          absolute -top-3 -right-3 rounded-full rotate-[20deg] shadow-md
          group-data-[collapsible=icon]:hidden
        "
      />
      <Image
        src="https://i.pravatar.cc/150?img=52"
        alt="User 3"
        width={35}
        height={35}
        className="
          absolute top-3/5 left-3/5 rounded-full rotate-[30deg] shadow-md
          group-data-[collapsible=icon]:hidden
        "
      />
    </a>
  );
};

export default SidebarMobileAds;
