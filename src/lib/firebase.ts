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

/**
 * If the CMS only stores a file name, prefix a Storage folder (e.g. blog_images,
 * event_images) for the default bucket.
 */
function ensureStorageObjectPath(
  s: string,
  bareFileFolder: "blog_images" | "event_images" = "blog_images"
): string {
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
    return `${bareFileFolder}/${t}`
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
    t.includes("event_images/") ||
    t.includes("firebasestorage.googleapis.com")
  )
    return true
  if (
    (t.includes("/") || t.startsWith("blog_") || t.startsWith("event_")) &&
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
        (t.includes("blog_") ||
          t.includes("event_") ||
          t.includes("/") ||
          t.includes("images/"))
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

/** Upcoming event from Firestore `events` (FireCMS, etc.) */
export interface FoundationEvent {
  id: string
  title: string
  excerpt: string
  eventDate: Timestamp | { toDate: () => Date } | null
  imageUrl: string
  isPublished: boolean
  location?: string
  slug?: string
}

function eventDateToMs(ev: FoundationEvent): number {
  const d = ev.eventDate
  if (!d) return 0
  return d && "toDate" in d && typeof d.toDate === "function"
    ? d.toDate().getTime()
    : 0
}

export function normalizeEvent(id: string, data: DocumentData): FoundationEvent {
  const raw = resolvePostImageField(data)
  const imageUrl = raw
    ? ensureStorageObjectPath(raw, "event_images")
    : ""
  return {
    id,
    ...data,
    imageUrl,
  } as FoundationEvent
}

/**
 * Published events with an `eventDate` in the future, soonest first.
 * Uses `events` collection; align field names in FireCMS (`isPublished`, `eventDate`, etc.).
 */
export const getUpcomingEvents = async (): Promise<FoundationEvent[]> => {
  const ref = collection(db, "events")
  const q = query(ref, where("isPublished", "==", true))
  const snap = await getDocs(q)
  const now = Date.now()
  const list = snap.docs
    .map((doc) => normalizeEvent(doc.id, doc.data()))
    .filter((ev) => {
      const t = eventDateToMs(ev)
      return t > now
    })
  return list.sort((a, b) => eventDateToMs(a) - eventDateToMs(b))
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
