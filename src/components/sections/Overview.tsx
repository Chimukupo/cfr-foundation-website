import { Button } from "@/components/ui/button"
import { PlayCircle } from "lucide-react"

export function Overview() {
  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-900 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Section */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-widest text-sm mb-4">About CareFirst</h3>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black dark:text-white leading-tight">
              All children deserve to live in safe, nurturing homes to feel valued and loved.
            </h2>
            <div className="w-16 h-1.5 bg-black dark:bg-white my-8"></div>
            <div className="space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
              <p>
                CareFirst Recovery Foundation is an independent NGO dedicated to the relief and environmental well-being of marginalized and vulnerable children and youths. We believe that by creating supportive environments, we can unlock their potentials and secure a better future for communities.
              </p>
              <p>
                Our ongoing missions aim to tackle root causes of poverty, lack of education, and environmental degradation that directly impacts young lives. We envision a world where every child enjoys their basic rights in a sustainable environment.
              </p>
            </div>
            <Button className="bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black font-bold px-8 py-6 rounded-none mt-6 uppercase tracking-wider transition-transform hover:scale-105 shadow-md cursor-pointer">
              Read More
            </Button>
          </div>
          
          {/* Image/Video Section */}
          <div className="lg:col-span-7 relative pl-0 lg:pl-12 mt-10 lg:mt-0">
            {/* Background Accent Element */}
            <div className="absolute -left-6 -top-6 w-3/4 h-3/4 bg-neutral-200/50 dark:bg-neutral-800/30 rounded-3xl -z-10 hidden lg:block"></div>
            
            <div className="flex flex-col space-y-4 items-end">
              <div className="text-center w-full mb-6 relative">
                 <h4 className="text-neutral-500 dark:text-neutral-400 font-bold text-lg mb-1 tracking-wide uppercase">In A Mission Since 2020</h4>
                 <h2 className="text-2xl md:text-3xl text-black dark:text-white font-bold">To help the Helpless and uplift the Society</h2>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] w-full bg-neutral-200 dark:bg-neutral-800 group">
                <img 
                  // src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  src="/images/group_photo.jpeg" 
                  alt="CareFirst Recovery Foundation Team"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-black/80 dark:bg-white/90 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform duration-300">
                    <PlayCircle className="text-white dark:text-black w-10 h-10 md:w-12 md:h-12 fill-white dark:fill-black bg-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
