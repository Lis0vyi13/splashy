'use client';

import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import { Logo } from '@/shared/assets';
import { APP_NAME, ROUTES } from '@/shared/config';
import { Button, Typography } from '@/shared/ui';

const fadeContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
  exit: { opacity: 0 },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.3 },
  },
};

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();
  const isSignUpPage = pathName === ROUTES.SIGN_UP;

  const RedirectSection = () => (
    <div className="flex justify-center items-center gap-2">
      <Typography textColor="secondary" affects="small" variant="p">
        {isSignUpPage ? 'Already have an account?' : "Don't have an account?"}
      </Typography>
      <Link href={isSignUpPage ? ROUTES.LOGIN : ROUTES.SIGN_UP}>
        <Button fontSize="sm" variant="outline" size="sm">
          {isSignUpPage ? 'Login' : 'Sign Up'}
        </Button>
      </Link>
    </div>
  );

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
            className="w-full lg:w-1/2 flex flex-col justify-between h-full"
            variants={fadeInUp}
          >
            <header className="flex items-center justify-between gap-2">
              <div className="flex mt-4 sm:mt-0 flex-col sm:flex-row justify-center max-sm:mx-auto items-center gap-6 sm:gap-2 max-sm:w-full">
                <Logo />
                <Typography className="hidden sm:block" variant="h1">
                  {APP_NAME}
                </Typography>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <RedirectSection />
              </div>
            </header>

            <AnimatePresence mode="wait">
              <motion.div
                key={pathName}
                className="mx-auto text-center w-full md:w-md"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="block sm:hidden">
                  {children}
                  <hr className="h-[1px] bg-ghost/10 mt-6" />
                  <div className="mt-6">
                    <RedirectSection />
                  </div>
                </div>

                <div className="hidden sm:block">{children}</div>
              </motion.div>
            </AnimatePresence>

            <footer className="mx-auto text-center text-sm flex flex-col sm:flex-row gap-3 items-center mt-4">
              <Typography textColor="secondary" affects="caption" variant="p">
                ©2025 Oleksandr Lisovyi. All Rights Reserved.
              </Typography>
              <Typography
                className="hidden sm:block"
                textColor="secondary"
                affects="caption"
                variant="p"
              >
                ·
              </Typography>
              <Link
                href="mailto:lisovyy13@gmail.com"
                className="text-ghost text-xs hover:underline"
              >
                lisovyy13@gmail.com
              </Link>
            </footer>
          </motion.main>

          <motion.aside className="hidden lg:block w-1/2" variants={fadeInUp}>
            <div className="relative w-full h-full">
              <Image
                src="/auth_intro.jpg"
                fill
                priority
                alt="Auth illustration"
                className="object-cover rounded-3xl"
              />
            </div>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  );
};

export default AuthLayout;
