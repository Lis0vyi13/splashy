'use client';

import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import {
  AuthFooter,
  AuthIntroPicture,
  AuthRedirectSection,
} from '@/features/auth';

import { Logo } from '@/shared/assets';
import { APP_NAME, ROUTES } from '@/shared/config';
import { fadeContainer, fadeInUp } from '@/shared/lib/animations';
import { Typography } from '@/shared/ui';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();
  const isSignUpPage = pathName === ROUTES.SIGN_UP;

  return (
    <section className="auth">
      <div className="container h-screen max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <motion.div
          className="flex flex-col lg:flex-row h-full gap-10"
          variants={fadeContainer}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.main
            className="w-full lg:w-1/2 gap-8 flex flex-col justify-between h-full"
            variants={fadeInUp}
          >
            <header className="flex items-center justify-between gap-2">
              <div className="flex mt-4 sm:mt-0 justify-center max-sm:mx-auto items-center gap-2 max-sm:w-full">
                <Logo />
                <Typography className="sm:block" variant="h1">
                  {APP_NAME}
                </Typography>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <AuthRedirectSection isSignUp={isSignUpPage} />
              </div>
            </header>

            <motion.div
              key={pathName}
              className="mx-auto text-center w-full md:w-md"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* mobile */}
              <div className="block sm:hidden">
                {children}
                <hr className="h-[1px] bg-ghost/10 mt-6" />
                <div className="mt-6">
                  <AuthRedirectSection isSignUp={isSignUpPage} />
                </div>
              </div>

              {/* desktop */}
              <div className="hidden sm:block">{children}</div>
            </motion.div>

            <AuthFooter />
          </motion.main>

          <motion.aside className="hidden lg:block w-1/2" variants={fadeInUp}>
            <AuthIntroPicture />
          </motion.aside>
        </motion.div>
      </div>
    </section>
  );
};

export default AuthLayout;
