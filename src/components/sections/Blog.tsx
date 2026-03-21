import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function Blog() {
  const posts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1603048297172-c92544798d5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "News",
      title: "Poverty Not Only Money It Can Be Food Sometimes",
      author: "Super Admin",
      date: "Sep 2, 2023",
      excerpt: "Many families struggle with food insecurity, which is a hidden dimension of poverty that needs immediate attention from organizations..."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Articles",
      title: "New Award To Support Children Affected by Crises",
      author: "Super Admin",
      date: "Oct 15, 2023",
      excerpt: "We are proud to announce our new grant aimed at delivering rapid response kits to children in disaster zones around the country..."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Education",
      title: "The Plant-Powered Dietitian To Consume Habit",
      author: "Super Admin",
      date: "Nov 5, 2023",
      excerpt: "Nutrition is critical for cognitive development. Learn how we are introducing sustainable, plant-powered meals into local schools..."
    }
  ]

  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h3 className="text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-widest text-sm">News & Articles</h3>
          <h2 className="text-3xl md:text-5xl font-extrabold text-black dark:text-white leading-tight">
            Organization set up to provide help and raise money for those in need
          </h2>
          <div className="w-20 h-1.5 bg-black dark:bg-white mx-auto mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden border-0 shadow-lg bg-white dark:bg-neutral-900 rounded-none group hover:-translate-y-2 transition-transform duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
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
                    {post.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white leading-snug group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors cursor-pointer">
                  {post.title}
                </h3>
              </CardHeader>
              
              <CardContent className="text-neutral-600 dark:text-neutral-400 text-sm px-6 pb-6">
                <p className="line-clamp-3 leading-relaxed">{post.excerpt}</p>
              </CardContent>
              
              <CardFooter className="px-6 pb-6 pt-0 border-t border-neutral-100 dark:border-neutral-800 mt-auto">
                <a href="#" className="mt-4 text-black dark:text-white font-bold text-sm uppercase tracking-wide hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors flex items-center gap-2 group-hover:gap-3 duration-300">
                  Read More <span className="text-lg leading-none">&raquo;</span>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
