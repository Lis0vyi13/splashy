import { ThemeToggle } from '@/features/toggle-theme';

import { SettingsFeatureWrapper } from '@/shared/ui';

const AppearanceTab = () => {
  return (
    <SettingsFeatureWrapper
      title="Themes"
      subtitle="Customize the look and feel of the application."
    >
      <ThemeToggle />
    </SettingsFeatureWrapper>
  );
};

export default AppearanceTab;
