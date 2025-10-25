import { SignUpForm } from '@/features/auth/sign-up';

import { Typography } from '@/shared/ui';

const SignUpPage = () => {
  return (
    <>
      <Typography variant="p" affects="large">
        Create your account
      </Typography>
      <Typography
        textColor="secondary"
        affects="normal"
        variant="p"
        className="mb-6"
      >
        Please fill in the details below to get started.
      </Typography>
      <SignUpForm />
    </>
  );
};

export default SignUpPage;
