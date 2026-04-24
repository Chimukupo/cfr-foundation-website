import { Button } from "@/components/ui/button"
// import { PlayCircle } from "lucide-react"

export function Overview() {
  return (
    <section className="relative bg-neutral-50 py-24 dark:bg-neutral-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Text Section */}
          <div className="space-y-6 lg:col-span-5">
            <h3 className="mb-4 text-sm font-bold tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
              About CareFirst
            </h3>
            <h2 className="text-3xl leading-tight font-extrabold text-black md:text-4xl lg:text-5xl dark:text-white">
              All children deserve to live in safe, nurturing homes to feel
              valued and loved.
            </h2>
            <div className="my-8 h-1.5 w-16 bg-black dark:bg-white"></div>
            <div className="space-y-4 leading-relaxed font-medium text-neutral-600 dark:text-neutral-400">
              <p>
                CareFirst Recovery Foundation is an independent NGO dedicated to
                the relief and environmental well-being of marginalized and
                vulnerable children and youths. We believe that by creating
                supportive environments, we can unlock their potentials and
                secure a better future for communities.
              </p>
              <p>
                Our ongoing missions aim to tackle root causes of poverty, lack
                of education, and environmental degradation that directly
                impacts young lives. We envision a world where every child
                enjoys their basic rights in a sustainable environment.
              </p>
            </div>
            <Button className="mt-6 cursor-pointer rounded-none bg-black px-8 py-6 font-bold tracking-wider text-white uppercase shadow-md transition-transform hover:scale-105 hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
              Read More
            </Button>
          </div>

          {/* Image/Video Section */}
          <div className="relative mt-10 pl-0 lg:col-span-7 lg:mt-0 lg:pl-12">
            {/* Background Accent Element */}
            <div className="absolute -top-6 -left-6 -z-10 hidden h-3/4 w-3/4 rounded-3xl bg-neutral-200/50 lg:block dark:bg-neutral-800/30"></div>

            <div className="flex flex-col items-end space-y-4">
              <div className="relative mb-6 w-full text-center">
                <h4 className="mb-1 text-lg font-bold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                  In A Mission Since 2020
                </h4>
                <h2 className="text-2xl font-bold text-black md:text-2xl dark:text-white">
                  To help the Helpless and uplift the Society
                </h2>
              </div>

              <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-neutral-200 shadow-2xl dark:bg-neutral-800">
                <img
                  src="/images/group_photo.jpeg"
                  alt="CareFirst Recovery Foundation Team"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div> */}
                {/* Play Button Overlay */}
                {/* <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-black/80 dark:bg-white/90 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform duration-300">
                    <PlayCircle className="text-white dark:text-black w-10 h-10 md:w-12 md:h-12 fill-white dark:fill-black bg-transparent" />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
