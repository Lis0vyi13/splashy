import Image from 'next/image';

const AuthIntroPicture = () => {
  return (
    <div className="relative w-full h-full">
      <Image
        src="/auth_intro.jpg"
        fill
        priority
        alt="Auth illustration"
        fetchPriority="high"
        className="object-cover rounded-3xl"
      />
    </div>
  );
};

export default AuthIntroPicture;
