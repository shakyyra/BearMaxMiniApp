import { useEffect, useState } from "react";

export function useImagePreloader(urls: string[]): boolean {
  const [loaded, setLoaded] = useState(urls.length === 0);

  useEffect(() => {
    if (typeof window === "undefined" || urls.length === 0) {
      setLoaded(true);
      return;
    }

    let isCancelled = false;
    let completed = 0;

    const handleComplete = () => {
      completed += 1;
      if (!isCancelled && completed >= urls.length) {
        setLoaded(true);
      }
    };

    const images = urls.map((url) => {
      const img = new Image();
      img.onload = handleComplete;
      img.onerror = handleComplete;
      img.src = url;
      return img;
    });

    return () => {
      isCancelled = true;
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [urls]);

  return loaded;
}
