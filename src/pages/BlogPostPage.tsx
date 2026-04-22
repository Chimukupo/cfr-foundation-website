import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, type BlogPost } from "@/lib/firebase";
import { ArrowLeft } from "lucide-react";
import { FirebaseImage } from "@/components/ui/FirebaseImage";

export function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);

    const fetchPost = async () => {
      if (!slug) return;
      try {
        const q = query(
          collection(db, "posts"), 
          where("slug", "==", slug), 
          where("isPublished", "==", true)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setPost({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as BlogPost);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) return <div className="py-24 text-center text-neutral-500 font-bold animate-pulse">Loading Article...</div>;
  if (!post) return <div className="py-24 text-center text-red-500 font-bold">Article not found. It may have been unpublished.</div>;

  // Format date safely
  const dateObj = post.publishedDate?.toDate ? post.publishedDate.toDate() : new Date();
  const formattedDate = dateObj.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <article className="py-16 md:py-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <Link to="/" className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-neutral-500 hover:text-black dark:hover:text-white mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-neutral-500">
            <span className="text-[#dc9e9f]">{post.category}</span>
            <span>&bull;</span>
            <span>{formattedDate}</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-black dark:text-white leading-[1.1]">
            {post.title}
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 font-bold tracking-wide uppercase text-sm mt-4">
            By {post.author}
          </p>
        </div>
        
        {post.imageUrl && (
          <div className="mb-12 rounded-none overflow-hidden shadow-xl border border-neutral-200 dark:border-neutral-800">
            <FirebaseImage src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover max-h-[600px]" />
          </div>
        )}
        
        {/* Render Rich Text HTML directly */}
        <div 
          className="
            max-w-none text-lg leading-relaxed text-neutral-700 dark:text-neutral-300
            [&>p]:mb-6
            [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-black [&>h2]:dark:text-white [&>h2]:mt-12 [&>h2]:mb-6
            [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-black [&>h3]:dark:text-white [&>h3]:mt-8 [&>h3]:mb-4
            [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-6 [&>ul>li]:mb-2
            [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-6 [&>ol>li]:mb-2
            [&>a]:text-[#dc9e9f] [&>a]:underline [&>a]:hover:text-black dark:[&>a]:hover:text-white
            [&>blockquote]:border-l-4 [&>blockquote]:border-[#dc9e9f] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-neutral-500 dark:[&>blockquote]:text-neutral-400 [&>blockquote]:mb-6
            [&>img]:rounded-xl [&>img]:shadow-md [&>img]:mb-6
          "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}
