// ProfileImage.tsx
import Image from 'next/image';
import { DEFAULT_IMAGE } from '@/constants/detail/detail.const';
import { useState } from 'react';

interface ProfileImageProps {
  src: string | null;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export const ProfileImage = ({ src, alt, width, height, className }: ProfileImageProps) => {
  const [imgSrc, setImgSrc] = useState(src || DEFAULT_IMAGE.PROFILE);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setImgSrc(DEFAULT_IMAGE.PROFILE)}
    />
  );
};