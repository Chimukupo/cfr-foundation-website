import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { getPublishedPosts, type BlogPost } from "@/lib/firebase"
import { FirebaseImage } from "@/components/ui/FirebaseImage"

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPublishedPosts()
        // Only show max 3 posts on the preview
        setPosts(data.slice(0, 3))
      } catch (error) {
        console.error("Failed to fetch posts:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (loading) {
    return (
      <section className="animate-pulse bg-neutral-50 py-24 text-center font-bold text-neutral-500 dark:bg-neutral-950">
        Loading Latest News...
      </section>
    )
  }

  return (
    <section className="bg-neutral-50 py-10 dark:bg-neutral-950" id="blogs">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <h3 className="text-sm font-bold tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
            Articles
          </h3>
          <h2 className="text-3xl leading-tight font-extrabold text-black md:text-5xl dark:text-white">
            Here to provide help and relief for those in need
          </h2>
          <div className="mx-auto mt-6 h-1.5 w-20 bg-black dark:bg-white"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const dateObj = post.publishedDate?.toDate
              ? post.publishedDate.toDate()
              : new Date()
            const formattedDate = dateObj.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })

            return (
              <Card
                key={post.id}
                className="group overflow-hidden rounded-none border-0 bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2 dark:bg-neutral-900"
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="flex h-full flex-col"
                >
                  <div className="relative h-64 overflow-hidden">
                    {post.imageUrl ? (
                      <FirebaseImage
                        src={post.imageUrl}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-neutral-200 dark:bg-neutral-800">
                        <span className="text-sm font-bold text-neutral-400 uppercase">
                          No Image
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-black px-3 py-1 text-xs font-bold tracking-wider text-white uppercase dark:bg-white dark:text-black">
                      {post.category}
                    </div>
                  </div>

                  <CardHeader className="px-6 pt-6 pb-4">
                    <div className="mb-3 flex gap-4 text-xs font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                      <span className="flex items-center gap-1">
                        <span className="h-1 w-1 rounded-full bg-neutral-400 dark:bg-neutral-500"></span>
                        By {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="h-1 w-1 rounded-full bg-neutral-400 dark:bg-neutral-500"></span>
                        {formattedDate}
                      </span>
                    </div>
                    <h3 className="cursor-pointer text-xl leading-snug font-bold text-black transition-colors group-hover:text-neutral-500 dark:text-white dark:group-hover:text-neutral-400">
                      {post.title}
                    </h3>
                  </CardHeader>

                  <CardContent className="flex-1 px-6 pb-6 text-sm text-neutral-600 dark:text-neutral-400">
                    <p className="line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </CardContent>

                  <CardFooter className="mt-auto border-t border-neutral-100 px-6 pt-0 pb-6 dark:border-neutral-800">
                    <span className="mt-4 flex items-center gap-2 text-sm font-bold tracking-wide text-black uppercase transition-colors duration-300 group-hover:gap-3 group-hover:text-neutral-500 dark:text-white dark:group-hover:text-neutral-400">
                      Read More{" "}
                      <span className="text-lg leading-none">&raquo;</span>
                    </span>
                  </CardFooter>
                </Link>
              </Card>
            )
          })}
        </div>

        {posts.length === 0 && (
          <div className="py-12 text-center font-bold tracking-wider text-neutral-500 uppercase">
            No published articles yet. Check back soon!
          </div>
        )}

        {posts.length > 0 && (
          <div className="mt-14 flex justify-center">
            <Link
              to="/blogs"
              className="transform rounded-none bg-black px-10 py-5 text-xs font-bold tracking-wide text-white uppercase shadow-md transition-all duration-300 hover:scale-105 hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              View All Posts
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
