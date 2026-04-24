import { useState, useEffect } from "react"
import { getApp } from "firebase/app"
import { getDownloadURL, getStorage, ref } from "firebase/storage"
import { storage } from "@/lib/firebase"

interface FirebaseImageProps {
  src: string
  alt: string
  className?: string
}

/** `refFromURL` is not in this SDK build; resolve gs:// via bucket + object path. */
function storageRefFromSrc(src: string) {
  if (src.startsWith("gs://")) {
    const match = /^gs:\/\/([^/]+)\/(.+)$/.exec(src)
    if (match) {
      const bucket = match[1]
      const objectPath = decodeURIComponent(match[2].replace(/\+/g, " "))
      const bucketStorage = getStorage(getApp(), `gs://${bucket}`)
      return ref(bucketStorage, objectPath)
    }
  }
  return ref(storage, src)
}

function normalizeObjectPath(s: string): string {
  return s.trim().replace(/^\s+/, "").replace(/^\/+/, "")
}

function getStorageDownloadUrl(pathOrGs: string) {
  const n = pathOrGs.startsWith("gs://")
    ? pathOrGs
    : normalizeObjectPath(pathOrGs)
  return getDownloadURL(storageRefFromSrc(n))
}

export function FirebaseImage({ src, alt, className }: FirebaseImageProps) {
  const isHttpUrl =
    Boolean(src) && (src.startsWith("http://") || src.startsWith("https://"))

  const [fetchedUrl, setFetchedUrl] = useState<string | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (isHttpUrl) {
      return
    }
    if (!src) {
      void (async () => {
        await Promise.resolve()
        setFetchedUrl(null)
        setError(false)
      })()
      return
    }

    let cancelled = false
    void (async () => {
      await Promise.resolve()
      if (cancelled) return
      setError(false)
      setFetchedUrl(null)
      try {
        const downloadUrl = await getStorageDownloadUrl(src)
        if (!cancelled) setFetchedUrl(downloadUrl)
      } catch (err) {
        console.error("Failed to load Firebase image:", src, err)
        if (!cancelled) setError(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [src, isHttpUrl])

  if (!src) {
    return null
  }

  if (isHttpUrl) {
    return <img src={src} alt={alt} className={className} />
  }

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 ${className}`}
      >
        <span className="text-xs font-bold text-neutral-400 uppercase">
          Image Error
        </span>
      </div>
    )
  }

  if (!fetchedUrl) {
    return (
      <div
        className={`animate-pulse bg-neutral-200 dark:bg-neutral-800 ${className}`}
      />
    )
  }

  return <img src={fetchedUrl} alt={alt} className={className} />
}
