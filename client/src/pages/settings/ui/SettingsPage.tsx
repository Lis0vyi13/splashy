import { AccountTab, AppearanceTab, ProfileTab } from '@/widgets/settings-tabs';

import { LogoutButton } from '@/features/auth/logout';
import { settingsTabs } from '@/features/settings';

import {
  Separator,
  SidebarTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography,
} from '@/shared/ui';

const SettingsPage = () => {
  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between space-y-1 pr-6">
        <div>
          <div className="flex items-center gap-1">
            <SidebarTrigger />
            <Typography className="font-bold" variant="h2">
              Settings
            </Typography>
          </div>
          <Typography textColor="secondary" affects="small" variant="p">
            Manage your account settings and preferences
          </Typography>
        </div>

        <LogoutButton />
      </header>
      <Separator />
      <Tabs className="space-y-4" defaultValue="profile">
        <TabsList>
          {settingsTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="profile">
          <ProfileTab />
        </TabsContent>

        <TabsContent value="account">
          <AccountTab />
        </TabsContent>

        <TabsContent value="appearance">
          <AppearanceTab />
        </TabsContent>

        <TabsContent value="privacy">Change your privacy here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
