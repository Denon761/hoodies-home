"use client";

import { useEffect, useState } from "react";

export function useHtmlImage(src) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!src) {
      setImage(null);
      return;
    }
    const img = new window.Image();
    img.onload = () => setImage(img);
    img.src = src;
    return () => {
      img.onload = null;
    };
  }, [src]);

  return image;
}
