import Link from 'next/link';

import { LoginForm } from '@/features/auth/login';

import { ROUTES } from '@/shared/config';
import { Typography } from '@/shared/ui';

const LoginPage = () => {
  return (
    <>
      <Typography variant="p" affects="large">
        Welcome back
      </Typography>
      <Typography
        textColor="secondary"
        affects="normal"
        variant="p"
        className="mb-6"
      >
        Please enter your credentials to continue.
      </Typography>
      <LoginForm />
      <Link
        className="mt-6 hover:underline inline-block"
        href={ROUTES.FORGOT_PASSWORD}
      >
        <Typography variant="p" affects="small">
          Forgot Password?
        </Typography>
      </Link>
    </>
  );
};

export default LoginPage;
