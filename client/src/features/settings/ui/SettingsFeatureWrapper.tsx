import type { ReactNode } from 'react';

import { Typography } from '@/shared/ui';

interface PageSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const SettingsFeatureWrapper = ({
  title,
  subtitle,
  children,
}: PageSectionProps) => {
  return (
    <section className="space-y-4">
      <header className="space-y-1">
        <Typography variant="p" className="font-bold">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="p" textColor="secondary" affects="caption">
            {subtitle}
          </Typography>
        )}
      </header>

      <div>{children}</div>
    </section>
  );
};

export default SettingsFeatureWrapper;
