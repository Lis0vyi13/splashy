import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

import { Logo } from '@/shared/assets';
import { APP_NAME } from '@/shared/config';
import { Button, Typography } from '@/shared/ui';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="auth">
      <div className="container h-screen max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex gap-10 h-full">
          <main className="flex-1/2 flex flex-col justify-between">
            <header className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Logo />
                <Typography variant="h1">{APP_NAME}</Typography>
              </div>
              <div className="flex items-center gap-2">
                <Typography affects="small" variant="p" textColor="secondary">
                  Are you a new user?
                </Typography>
                <Button fontSize="sm" variant="outline" size="sm">
                  Sign Up
                </Button>
              </div>
            </header>

            <div className="mx-auto text-center w-full md:w-md">{children}</div>

            <footer className="mx-auto text-center text-sm flex gap-3 items-center">
              <Typography textColor="secondary" affects="caption" variant="p">
                ©2025 Oleksandr Lisovyi. All Rights Reserved.
              </Typography>
              <Typography textColor="secondary" affects="caption" variant="p">
                ·
              </Typography>
              <Link
                href="mailto:lisovyy13@gmail.com"
                className="text-ghost text-xs hover:underline"
              >
                lisovyy13@gmail.com
              </Link>
            </footer>
          </main>

          <aside className="flex-1/2">
            <div className="relative w-full h-full">
              <Image
                src="/auth_intro.jpg"
                fill
                priority
                alt="1"
                className="object-cover rounded-3xl"
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
