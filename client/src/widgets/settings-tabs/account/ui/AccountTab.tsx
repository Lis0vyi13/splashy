import { UpdateEmailForm } from '@/features/update-email';

import { SettingsFeatureWrapper } from '@/shared/ui';

const AccountTab = () => {
  return (
    <SettingsFeatureWrapper
      title="Account"
      subtitle="Manage your account settings and preferences."
    >
      <UpdateEmailForm />
    </SettingsFeatureWrapper>
  );
};

export default AccountTab;
