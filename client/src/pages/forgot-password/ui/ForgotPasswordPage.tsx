import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { ForgotPasswordForm } from '@/features/auth/forgot-password';

import { ROUTES } from '@/shared/config';
import { Typography } from '@/shared/ui/Typography';

const ForgotPasswordPage = () => {
  return (
    <>
      <Typography variant="p" affects="large">
        Forgot password?
      </Typography>
      <Typography
        textColor="secondary"
        affects="normal"
        variant="p"
        className="mb-6"
      >
        No worries, we&apos;ll send you reset instructions.{' '}
      </Typography>
      <ForgotPasswordForm />
      <Link className="mt-6 hover:underline inline-block" href={ROUTES.LOGIN}>
        <Typography
          className="flex items-center gap-1"
          variant="p"
          affects="small"
        >
          <ArrowLeft /> Back to log in
        </Typography>
      </Link>
    </>
  );
};

export default ForgotPasswordPage;
