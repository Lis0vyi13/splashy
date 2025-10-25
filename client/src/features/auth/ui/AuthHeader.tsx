import { Logo } from '@/shared/assets';
import { APP_NAME } from '@/shared/config';
import { Typography } from '@/shared/ui';

import AuthRedirectSection from './AuthRedirectSection';

const AuthHeader = () => {
  return (
    <header className="flex items-center justify-between gap-2">
      <div className="flex mt-4 sm:mt-0 justify-center max-sm:mx-auto items-center gap-2 max-sm:w-full">
        <Logo />
        <Typography className="sm:block" variant="h1">
          {APP_NAME}
        </Typography>
      </div>
      <div className="hidden sm:flex items-center gap-2">
        <AuthRedirectSection />
      </div>
    </header>
  );
};

export default AuthHeader;
