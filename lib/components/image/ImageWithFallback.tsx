"use client";

import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import fallbackImage from "@/public/images/common/image-placeholder.png";

interface ImageWithFallbackProps {
  src: string | StaticImageData;
  alt: string;
  fallBackImage?: string | StaticImageData;
  layout?: string;
  objectFit?: string;
  className?: string;
  width?: number;
  height?: number;
  onError?: (e: any) => void;
  onClick?: (e: any) => void;
}

const ImageWithFallback = ({
  src,
  alt,
  layout,
  fallBackImage = fallbackImage,
  className,
  objectFit,
  width,
  height,
  onError,
  onClick,
}: ImageWithFallbackProps) => {
  const [imageSrc, setImageSrc] = useState<string | StaticImageData>(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  const handleError = (e: any) => {
    if (onError) {
      onError(e);
    }
    setImageSrc(fallBackImage);
  };

  const imageProps = {
    src: imageSrc,
    objectFit,
    className,
    onError: handleError,
    onClick,
  };

  if (width && height) {
    return <Image {...imageProps} width={width} height={height} alt={alt} />;
  }

  return <Image {...imageProps} layout={layout} alt={alt} />;
};

export default ImageWithFallback;
