import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { getPublishedPosts, type BlogPost } from "@/lib/firebase"
import { FirebaseImage } from "@/components/ui/FirebaseImage"

export function BlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    const fetchPosts = async () => {
      try {
        const data = await getPublishedPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-black dark:text-white leading-tight">
            Our Latest <span style={{ color: '#dc9e9f' }}>News &</span> <br /> 
            <span style={{ color: '#dc9e9f' }}>Updates</span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 font-medium text-lg max-w-xl">
            Stay up to date with the latest missions, events, and relief efforts from the CareFirst Recovery Foundation.
          </p>
          <div className="w-20 h-1.5 bg-[#dc9e9f] mt-6"></div>
        </div>

        {loading ? (
          <div className="text-center py-24 font-bold text-neutral-500 animate-pulse">Loading all articles...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const dateObj = post.publishedDate?.toDate ? post.publishedDate.toDate() : new Date();
              const formattedDate = dateObj.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
              
              return (
              <Card key={post.id} className="overflow-hidden border-0 shadow-lg bg-white dark:bg-neutral-900 rounded-none group hover:-translate-y-2 transition-transform duration-300">
                <Link to={`/blog/${post.slug}`} className="flex flex-col h-full">
                  <div className="relative h-64 overflow-hidden">
                    {post.imageUrl ? (
                      <FirebaseImage 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
                        <span className="text-neutral-400 text-sm font-bold uppercase">No Image</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-wider px-3 py-1">
                      {post.category}
                    </div>
                  </div>
                  
                  <CardHeader className="pb-4 pt-6 px-6">
                    <div className="flex gap-4 text-xs text-neutral-500 dark:text-neutral-400 font-medium mb-3 uppercase tracking-wide">
                      <span className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-[#dc9e9f]"></span>
                        By {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-[#dc9e9f]"></span>
                        {formattedDate}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white leading-snug group-hover:text-[#dc9e9f] transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                  </CardHeader>
                  
                  <CardContent className="text-neutral-600 dark:text-neutral-400 text-sm px-6 pb-6 flex-1">
                    <p className="line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  </CardContent>
                  
                  <CardFooter className="px-6 pb-6 pt-0 border-t border-neutral-100 dark:border-neutral-800 mt-auto">
                    <span className="mt-4 text-black dark:text-white font-bold text-sm uppercase tracking-wide group-hover:text-[#dc9e9f] transition-colors flex items-center gap-2 group-hover:gap-3 duration-300">
                      Read More <span className="text-lg leading-none">&raquo;</span>
                    </span>
                  </CardFooter>
                </Link>
              </Card>
            )})}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="text-center text-neutral-500 py-12 font-bold uppercase tracking-wider">No published articles yet. Check back soon!</div>
        )}
      </div>
    </div>
  )
}
