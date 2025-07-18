"use client";

import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import fallbackImage from "@/public/images/common/image-placeholder.png";

interface ImageWithFallbackProps {
  src: string | StaticImageData;
  alt: string;
  fallBackImage?: string | StaticImageData;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  onError?: (e: any) => void;
  onClick?: (e: any) => void;
}

const ImageWithFallback = ({
  src,
  alt,
  fallBackImage = fallbackImage,
  className,
  width,
  height,
  fill,
  onError,
  onClick,
}: ImageWithFallbackProps) => {
  const [imageSrc, setImageSrc] = useState<string | StaticImageData>(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  const handleError = (e: any) => {
    if (onError) onError(e);
    setImageSrc(fallBackImage);
  };

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      className={className}
      onError={handleError}
      onClick={onClick}
    />
  );
};

export default ImageWithFallback;
