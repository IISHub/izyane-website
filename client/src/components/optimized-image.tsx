import React, { ImgHTMLAttributes } from "react";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  webpSrc?: string;
}

export default function OptimizedImage({
  src,
  alt,
  webpSrc,
  ...props
}: OptimizedImageProps) {
  // Auto-generate webp src if not provided
  const webp = webpSrc || src.replace(/\.(jpg|jpeg|png)$/i, ".webp");

  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      <img src={src} alt={alt} {...props} loading="lazy" decoding="async" />
    </picture>
  );
}
