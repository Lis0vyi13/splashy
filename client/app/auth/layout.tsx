'use client';

import * as motion from 'motion/react-client';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import {
  AuthFooter,
  AuthHeader,
  AuthIntroPicture,
  AuthRedirectSection,
} from '@/features/auth';

import { fadeContainer } from '@/shared/lib/animations';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();

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
          <motion.section
            className="w-full lg:w-1/2 gap-8 flex flex-col justify-between h-full"
            variants={fadeContainer}
          >
            <AuthHeader />

            <motion.div
              key={pathName}
              className="mx-auto text-center w-full md:w-md"
              variants={fadeContainer}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* mobile */}
              <div className="block sm:hidden">
                {children}
                <hr className="h-[1px] bg-ghost/10 mt-6" />
                <div className="mt-6">
                  <AuthRedirectSection />
                </div>
              </div>

              {/* desktop */}
              <div className="hidden sm:block">{children}</div>
            </motion.div>

            <AuthFooter />
          </motion.section>

          <aside className="hidden lg:block w-1/2">
            <AuthIntroPicture />
          </aside>
        </motion.div>
      </div>
    </section>
  );
};

export default AuthLayout;
