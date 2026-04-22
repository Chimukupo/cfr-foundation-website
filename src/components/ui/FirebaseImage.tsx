import { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

interface FirebaseImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function FirebaseImage({ src, alt, className }: FirebaseImageProps) {
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) return;
    
    // If it's already a full HTTP url, just use it directly
    if (src.startsWith("http")) {
      setUrl(src);
      return;
    }

    // Otherwise, it's a storage path or gs:// URI, so resolve it
    const imageRef = src.startsWith("gs://") ? ref(storage, src) : ref(storage, src);
    
    getDownloadURL(imageRef)
      .then((downloadUrl) => {
        setUrl(downloadUrl);
      })
      .catch((err) => {
        console.error("Failed to load Firebase image:", src, err);
        setError(true);
      });
  }, [src]);

  if (error) {
    return (
      <div className={`bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center ${className}`}>
        <span className="text-neutral-400 text-xs font-bold uppercase">Image Error</span>
      </div>
    );
  }

  if (!url) {
    return <div className={`bg-neutral-200 dark:bg-neutral-800 animate-pulse ${className}`} />;
  }

  return <img src={url} alt={alt} className={className} />;
}
