import SettingsFeatureWrapper from '../../SettingsFeatureWrapper';
import AvatarUploader from './AvatarUploader';
import GeneralSettingsForm from './GeneralSettingsForm';

const ProfileTab = () => {
  return (
    <SettingsFeatureWrapper title="General" subtitle="General account settings">
      <div className="flex w-full gap-[200px]">
        <GeneralSettingsForm />
        <AvatarUploader />
      </div>
    </SettingsFeatureWrapper>
  );
};

export default ProfileTab;
