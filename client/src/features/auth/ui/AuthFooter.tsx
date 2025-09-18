import Link from 'next/link';

import { Typography } from '@/shared/ui';

const AuthFooter = () => {
  return (
    <footer className="mx-auto pb-4 sm:pb-0 text-center text-sm flex flex-col sm:flex-row gap-3 items-center mt-4">
      <Typography textColor="secondary" affects="caption" variant="p">
        ©2025 Oleksandr Lisovyi. All Rights Reserved.
      </Typography>
      <Typography
        className="hidden sm:block"
        textColor="secondary"
        affects="caption"
        variant="p"
      >
        •
      </Typography>
      <Link
        href="mailto:lisovyy13@gmail.com"
        className="text-ghost text-xs hover:underline"
      >
        lisovyy13@gmail.com
      </Link>
    </footer>
  );
};

export default AuthFooter;
