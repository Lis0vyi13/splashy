import Image from 'next/image';

import { images } from '@/shared/assets';

const AuthIntroPicture = () => {
  return (
    <div className="relative w-full h-full bg-gray-500/20 rounded-3xl">
      <Image
        src={images.authIntro}
        fill
        priority
        alt="Auth illustration"
        placeholder="blur"
        className="object-cover rounded-3xl"
      />
    </div>
  );
};

export default AuthIntroPicture;
