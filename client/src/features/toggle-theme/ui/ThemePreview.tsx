import type { Theme } from '@/shared/config';
import { Skeleton } from '@/shared/ui';

const ThemePreview = ({ themeType }: { themeType: Theme }) => (
  <div className="relative w-40 p-2 h-24 border border-gray-400 rounded-lg overflow-hidden shadow-sm">
    <Skeleton className="w-full h-full" />
    {themeType === 'light' && (
      <div className="absolute inset-0 bg-white grid grid-cols-2 grid-rows-2 gap-1 p-1">
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
      </div>
    )}
    {themeType === 'dark' && (
      <div className="absolute inset-0 bg-gray-800 grid grid-cols-2 grid-rows-2 gap-1 p-1">
        <div className="bg-gray-700"></div>
        <div className="bg-gray-700"></div>
        <div className="bg-gray-700"></div>
        <div className="bg-gray-700"></div>
      </div>
    )}
    {themeType === 'system' && (
      <div className="absolute inset-0 bg-white grid grid-cols-2 grid-rows-2 gap-1 p-1">
        <div className="bg-gray-100"></div>
        <div className="bg-gray-700"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-700"></div>
      </div>
    )}
    <div className="absolute top-1 left-1 flex space-x-0.5">
      <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
    </div>
  </div>
);

export default ThemePreview;
