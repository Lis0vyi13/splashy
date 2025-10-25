'use client';

import { useTheme } from 'next-themes';

import type { Theme } from '@/shared/config';
import { cn } from '@/shared/lib';
import {
  Checkbox,
  Label,
  RadioGroup,
  RadioGroupItem,
  Typography,
} from '@/shared/ui';

import ThemePreview from './ThemePreview';

const modeMap: Record<Theme, string> = {
  light: 'Light Mode',
  dark: 'Dark Mode',
  system: 'System Preferences',
} as const;

const getLabelClasses = (
  themeType: keyof typeof modeMap,
  isCurrent: boolean
) => {
  const isDarkOrSystem = themeType === 'dark' || themeType === 'system';
  if (!isCurrent)
    return 'flex gap-0 flex-col items-baseline rounded-lg border-2 transition-all cursor-pointer';
  return cn(
    'flex gap-0 flex-col items-baseline rounded-lg border-2 transition-all  cursor-pointer',
    !isDarkOrSystem
      ? 'border-purple-300 bg-purple-50'
      : 'border-indigo-500 bg-indigo-900'
  );
};

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <RadioGroup
      value={theme}
      onValueChange={(value) => setTheme(value as Theme)}
      className="flex space-x-4 w-full"
    >
      {(['light', 'dark', 'system'] as Theme[]).map((t) => {
        const isCurrentTheme = t === theme;
        const mode = modeMap[t];

        return (
          <div key={t} className="flex items-center space-x-2">
            <RadioGroupItem value={t} id={t} className="hidden" />
            <Label htmlFor={t} className={getLabelClasses(t, isCurrentTheme)}>
              <div className="p-3">
                <ThemePreview themeType={t} />
              </div>
              <div
                className={cn(
                  'flex items-center gap-2 w-full px-2 py-3 rounded-bl-md rounded-br-md',
                  isCurrentTheme && 'bg-purple-200 dark:bg-indigo-950'
                )}
              >
                <Checkbox
                  size="sm"
                  checked={isCurrentTheme}
                  shape="round"
                  className={cn(
                    'bg-white',
                    isCurrentTheme && 'dark:bg-indigo-900'
                  )}
                  onCheckedChange={() => setTheme(t as Theme)}
                />
                <Typography
                  className={cn(
                    isCurrentTheme ? 'dark:text-white' : 'text-ghost'
                  )}
                  affects="small"
                >
                  {mode}
                </Typography>
              </div>
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
};

export default ThemeToggle;
