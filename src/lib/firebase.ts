import { initializeApp } from "firebase/app"
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  type DocumentData,
  type Timestamp,
} from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Types
export interface BlogPost {
  id: string
  title: string
  slug: string
  category: string
  author: string
  publishedDate: Timestamp | { toDate: () => Date } | null
  excerpt: string
  content: string
  imageUrl: string
  isPublished: boolean
}

/** If the CMS only stores a file name, prefix the folder used in your Storage bucket. */
function ensureStorageObjectPath(s: string): string {
  const t = s.trim()
  if (!t) return t
  if (
    t.startsWith("http://") ||
    t.startsWith("https://") ||
    t.startsWith("gs://")
  ) {
    return t
  }
  if (t.includes("/")) return t
  if (/\.(jpe?g|png|gif|webp|svg|bmp)$/i.test(t)) {
    return `blog_images/${t}`
  }
  return t
}

function looksLikeImageString(s: string): boolean {
  const t = s.trim()
  if (t.length < 3) return false
  if (t.startsWith("http://") || t.startsWith("https://")) return true
  if (t.startsWith("gs://")) return true
  if (
    t.includes("blog_images/") ||
    t.includes("firebasestorage.googleapis.com")
  )
    return true
  if (
    (t.includes("/") || t.startsWith("blog_")) &&
    /\.(jpe?g|png|gif|webp|svg|bmp)/i.test(t)
  ) {
    return true
  }
  return false
}

/**
 * FireCMS (and similar) may store the cover image as `imageUrl`, `image`, or
 * a nested object with `url` / `path`, or under a custom field name. This
 * returns a value suitable for {@link FirebaseImage} (https URL, gs://, or
 * relative Storage object path in the default bucket).
 */
export function resolvePostImageField(data: DocumentData): string {
  const d = data as Record<string, unknown>
  const stringKeys = [
    "imageUrl",
    "image",
    "featuredImage",
    "coverImage",
    "cover",
    "thumbnail",
    "mainImage",
    "heroImage",
    "headerImage",
    "header_image",
    "postImage",
    "post_image",
    "blog_image",
    "featured_media",
  ] as const

  const fromObject = (
    o: Record<string, unknown>,
    depth = 0
  ): string | undefined => {
    if (depth > 4) return undefined
    const fileKeys = [
      "url",
      "downloadURL",
      "downloadUrl",
      "path",
      "storagePath",
      "fileUrl",
      "src",
      "value",
      "fullPath",
    ] as const
    for (const k of fileKeys) {
      const v = o[k]
      if (typeof v !== "string" || !v.trim()) continue
      const t = v.trim()
      if (looksLikeImageString(t)) return t
      if (
        (k === "path" ||
          k === "storagePath" ||
          k === "fullPath" ||
          k === "value") &&
        (t.includes("blog_") || t.includes("/") || t.includes("images/"))
      ) {
        return t
      }
    }
    for (const nested of ["data", "metadata", "ref"]) {
      const n = o[nested]
      if (n && typeof n === "object" && !Array.isArray(n)) {
        const s = fromObject(n as Record<string, unknown>, depth + 1)
        if (s) return s
      }
    }
    return undefined
  }

  for (const key of stringKeys) {
    const v = d[key]
    if (typeof v === "string" && v.trim() && looksLikeImageString(v))
      return v.trim()
    if (
      typeof v === "string" &&
      v.trim() &&
      (v.includes("blog_") || v.startsWith("gs://"))
    )
      return v.trim()
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const s = fromObject(v as Record<string, unknown>)
      if (s) return s
    }
    if (Array.isArray(v) && v.length > 0) {
      const first = v[0]
      if (
        typeof first === "string" &&
        first.trim() &&
        looksLikeImageString(first)
      )
        return first.trim()
      if (first && typeof first === "object" && !Array.isArray(first)) {
        const s = fromObject(first as Record<string, unknown>)
        if (s) return s
      }
    }
  }

  // Any top-level string that clearly references Storage / URL (FireCMS custom keys)
  for (const [, v] of Object.entries(d)) {
    if (typeof v === "string" && v.trim() && looksLikeImageString(v))
      return v.trim()
  }

  // Shallow pass on nested objects (one level of common wrappers)
  for (const v of Object.values(d)) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const s = fromObject(v as Record<string, unknown>, 0)
      if (s) return s
    }
  }

  if (import.meta.env.DEV) {
    const likely = Object.keys(d).filter((k) =>
      /image|file|media|photo|cover|storage|blog|hero|header|thumb/i.test(k)
    )
    if (likely.length) {
      const sample: Record<string, unknown> = {}
      for (const k of likely) sample[k] = d[k]
      console.warn(
        "[CareFirst] Could not parse a cover image from this post. Relevant fields:",
        sample
      )
    }
  }

  return ""
}

export function normalizeBlogPost(id: string, data: DocumentData): BlogPost {
  const raw = resolvePostImageField(data)
  const imageUrl = raw ? ensureStorageObjectPath(raw) : ""
  return {
    id,
    ...data,
    imageUrl,
  } as BlogPost
}

// Fetch published posts
export const getPublishedPosts = async (): Promise<BlogPost[]> => {
  const postsRef = collection(db, "posts")
  const q = query(postsRef, where("isPublished", "==", true))

  const querySnapshot = await getDocs(q)
  const posts = querySnapshot.docs.map((doc) =>
    normalizeBlogPost(doc.id, doc.data())
  )

  // Sort locally by publishedDate (descending) to avoid needing a Firestore composite index
  return posts.sort((a, b) => {
    const dateA = a.publishedDate?.toDate
      ? a.publishedDate.toDate().getTime()
      : 0
    const dateB = b.publishedDate?.toDate
      ? b.publishedDate.toDate().getTime()
      : 0
    return dateB - dateA
  })
}
