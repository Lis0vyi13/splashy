import Image from 'next/image';

import { LOGO } from '@/shared/config';

type LogoVariant = 'small' | 'medium' | 'large';

interface LogoProps {
  variant?: LogoVariant;
}

const sizeMap: Record<LogoVariant, number> = {
  small: 32,
  medium: 64,
  large: 128,
};

const Logo = ({ variant = 'medium' }: LogoProps) => {
  const size = sizeMap[variant];

  return (
    <div style={{ width: size, height: size }} className="relative">
      <Image src={LOGO} alt="Splashy Logo" fill className="object-contain" />
    </div>
  );
};

export default Logo;
