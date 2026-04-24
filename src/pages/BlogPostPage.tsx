import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db, type BlogPost } from "@/lib/firebase"
import { ArrowLeft } from "lucide-react"
import { FirebaseImage } from "@/components/ui/FirebaseImage"

export function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0)

    const fetchPost = async () => {
      if (!slug) return
      try {
        const q = query(
          collection(db, "posts"),
          where("slug", "==", slug),
          where("isPublished", "==", true)
        )
        const snapshot = await getDocs(q)
        if (!snapshot.empty) {
          setPost({
            id: snapshot.docs[0].id,
            ...snapshot.docs[0].data(),
          } as BlogPost)
        }
      } catch (error) {
        console.error("Error fetching post:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [slug])

  if (loading)
    return (
      <div className="animate-pulse py-24 text-center font-bold text-neutral-500">
        Loading Article...
      </div>
    )
  if (!post)
    return (
      <div className="py-24 text-center font-bold text-red-500">
        Article not found. It may have been unpublished.
      </div>
    )

  // Format date safely
  const dateObj = post.publishedDate?.toDate
    ? post.publishedDate.toDate()
    : new Date()
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <article className="min-h-screen bg-background py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <Link
          to="/"
          className="mb-10 inline-flex items-center text-sm font-bold tracking-wider text-neutral-500 uppercase transition-colors hover:text-black dark:hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>

        <div className="mb-10 space-y-4">
          <div className="flex items-center gap-4 text-xs font-bold tracking-widest text-neutral-500 uppercase">
            <span className="text-[#dc9e9f]">{post.category}</span>
            <span>&bull;</span>
            <span>{formattedDate}</span>
          </div>
          <h1 className="text-3xl leading-[1.1] font-extrabold tracking-tight text-black md:text-5xl lg:text-6xl dark:text-white">
            {post.title}
          </h1>
          <p className="mt-4 text-sm font-bold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
            By {post.author}
          </p>
        </div>

        {post.imageUrl && (
          <div className="mb-12 overflow-hidden rounded-none border border-neutral-200 shadow-xl dark:border-neutral-800">
            <FirebaseImage
              src={post.imageUrl}
              alt={post.title}
              className="h-auto max-h-[600px] w-full object-cover"
            />
          </div>
        )}

        {/* Render Rich Text HTML directly */}
        <div
          className="max-w-none text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 [&>a]:text-[#dc9e9f] [&>a]:underline [&>a]:hover:text-black dark:[&>a]:hover:text-white [&>blockquote]:mb-6 [&>blockquote]:border-l-4 [&>blockquote]:border-[#dc9e9f] [&>blockquote]:pl-4 [&>blockquote]:text-neutral-500 [&>blockquote]:italic dark:[&>blockquote]:text-neutral-400 [&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-black [&>h2]:dark:text-white [&>h3]:mt-8 [&>h3]:mb-4 [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-black [&>h3]:dark:text-white [&>img]:mb-6 [&>img]:rounded-xl [&>img]:shadow-md [&>ol]:mb-6 [&>ol]:ml-6 [&>ol]:list-decimal [&>ol>li]:mb-2 [&>p]:mb-6 [&>ul]:mb-6 [&>ul]:ml-6 [&>ul]:list-disc [&>ul>li]:mb-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  )
}
