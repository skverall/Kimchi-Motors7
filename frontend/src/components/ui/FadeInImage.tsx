"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

export type FadeInImageProps = ImageProps;

export const FadeInImage: React.FC<FadeInImageProps> = ({
  className,
  onLoadingComplete,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      {...props}
      className={`${className ?? ""} transition-opacity duration-500 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
      onLoadingComplete={(img) => {
        setLoaded(true);
        onLoadingComplete?.(img);
      }}
    />
  );
};

export default FadeInImage;
