'use client';

import Link from 'next/link';
import { memo } from 'react';

import { ROUTES } from '@/shared/config';
import { Button, Typography } from '@/shared/ui';

const AuthRedirectSection = memo(({ isSignUp }: { isSignUp: boolean }) => (
  <div className="flex justify-center items-center gap-2">
    <Typography textColor="secondary" affects="small" variant="p">
      {isSignUp ? 'Already have an account?' : "Don't have an account?"}
    </Typography>
    <Link href={isSignUp ? ROUTES.LOGIN : ROUTES.SIGN_UP}>
      <Button fontSize="sm" variant="outline" size="sm">
        {isSignUp ? 'Login' : 'Sign Up'}
      </Button>
    </Link>
  </div>
));

export default AuthRedirectSection;
