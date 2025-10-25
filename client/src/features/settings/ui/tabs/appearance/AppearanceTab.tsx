import SettingsFeatureWrapper from '../../SettingsFeatureWrapper';
import ThemeToggle from './ThemeToggle';

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
