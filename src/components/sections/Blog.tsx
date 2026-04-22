import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { getPublishedPosts, type BlogPost } from "@/lib/firebase"
import { FirebaseImage } from "@/components/ui/FirebaseImage"

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPublishedPosts();
        // Only show max 3 posts on the preview
        setPosts(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <section className="py-24 bg-neutral-50 dark:bg-neutral-950 text-center font-bold text-neutral-500 animate-pulse">Loading Latest News...</section>;
  }

  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-950" id="blogs">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl space-y-4">
            <h3 className="text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-widest text-sm">Articles</h3>
            <h2 className="text-3xl md:text-5xl font-extrabold text-black dark:text-white leading-tight">
              Here to provide help and relief for those in need
            </h2>
            <div className="w-20 h-1.5 bg-black dark:bg-white mt-6"></div>
          </div>
          <Link to="/blogs" className="shrink-0 bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black font-bold uppercase tracking-wide text-xs px-6 py-4 rounded-none transition-all duration-300 transform hover:scale-105 shadow-md self-start md:self-end">
            View All Posts
          </Link>
        </div>
        
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
                      <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-500"></span>
                      By {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-500"></span>
                      {formattedDate}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white leading-snug group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                </CardHeader>
                
                <CardContent className="text-neutral-600 dark:text-neutral-400 text-sm px-6 pb-6 flex-1">
                  <p className="line-clamp-3 leading-relaxed">{post.excerpt}</p>
                </CardContent>
                
                <CardFooter className="px-6 pb-6 pt-0 border-t border-neutral-100 dark:border-neutral-800 mt-auto">
                  <span className="mt-4 text-black dark:text-white font-bold text-sm uppercase tracking-wide group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors flex items-center gap-2 group-hover:gap-3 duration-300">
                    Read More <span className="text-lg leading-none">&raquo;</span>
                  </span>
                </CardFooter>
              </Link>
            </Card>
          )})}
        </div>

        {posts.length === 0 && (
          <div className="text-center text-neutral-500 py-12 font-bold uppercase tracking-wider">No published articles yet. Check back soon!</div>
        )}
      </div>
    </section>
  )
}
