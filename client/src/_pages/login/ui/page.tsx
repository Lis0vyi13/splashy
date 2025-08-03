import { LoginForm } from '@/features/login';

import { Typography } from '@/shared/ui';

const LoginPage = () => {
  return (
    <>
      <Typography variant="p" affects="large">
        Welcome back
      </Typography>
      <Typography textColor="secondary" variant="p" className="mb-6">
        Please enter your credentials to continue.
      </Typography>
      <LoginForm />
    </>
  );
};

export default LoginPage;
