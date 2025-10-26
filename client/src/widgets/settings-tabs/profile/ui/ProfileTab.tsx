import { UpdateProfileForm } from '@/features/update-profile';
import { UserAvatarUploader } from '@/features/upload-user-avatar';

import { SettingsFeatureWrapper } from '@/shared/ui';

const ProfileTab = () => {
  return (
    <SettingsFeatureWrapper title="General" subtitle="General account settings">
      <div className="flex w-full gap-[200px]">
        <UpdateProfileForm />
        <UserAvatarUploader />
      </div>
    </SettingsFeatureWrapper>
  );
};

export default ProfileTab;
