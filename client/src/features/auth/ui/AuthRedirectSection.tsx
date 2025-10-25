'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ROUTES } from '@/shared/config';
import { Button, Typography } from '@/shared/ui';

const AuthRedirectSection = () => {
  const pathName = usePathname();
  const isSignUp = pathName === ROUTES.SIGN_UP;

  return (
    <div className="flex justify-center items-center gap-2">
      <Typography textColor="secondary" affects="small" variant="p">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
      </Typography>
      <Button asChild fontSize="sm" variant="outline" size="sm">
        <Link href={isSignUp ? ROUTES.LOGIN : ROUTES.SIGN_UP}>
          {isSignUp ? 'Login' : 'Sign Up'}
        </Link>
      </Button>
    </div>
  );
};

export default AuthRedirectSection;
