import { useEffect } from "react"
import { Link } from "react-router-dom"
import { AboutIntroSection } from "@/components/sections/AboutIntroSection"

export function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-neutral-50 pt-6 pb-5 dark:bg-neutral-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center md:mb-16">
          <h3 className="mt-0 text-sm font-bold tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
            About CareFirst
          </h3>
          <h1 className="text-4xl leading-tight font-extrabold text-black md:text-4xl dark:text-white">
            Who we are and what we stand for
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-neutral-500 dark:text-neutral-400">
            Learn about our purpose, our work in communities, and how we support
            vulnerable children and young people in Zambia and beyond.
          </p>
          <div className="mx-auto mt-6 h-1.5 w-20 bg-[#DC9E9F]"></div>
        </div>
      </div>

      <AboutIntroSection variant="full" />

      <section className="bg-white py-24 dark:bg-neutral-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 aspect-[4/3] w-full overflow-hidden rounded-sm bg-neutral-200 shadow-2xl lg:order-1 dark:bg-neutral-800">
              <img
                src="/images/donation_photo3.jpg"
                alt="CareFirst community relief and support in action"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="order-1 space-y-6 lg:order-2">
              <h2 className="text-2xl leading-tight font-extrabold text-black md:text-3xl dark:text-white">
                Relief, learning, and care on the ground
              </h2>
              <div className="h-1.5 w-16 bg-[#dc9e9f]"></div>
              <div className="space-y-4 text-lg leading-relaxed font-medium text-neutral-600 dark:text-neutral-400">
                <p>
                  In every outreach, we look beyond immediate assistance to what
                  helps children and young people build stability: safe spaces
                  to learn, access to basics when crisis hits, and projects that
                  care for the land and water they depend on. Our work is
                  designed to be practical, respectful, and community-driven.
                </p>
                <p>
                  We are grateful to everyone who donates, volunteers, and
                  shares our story. Together we can widen that circle of support
                  and make sure the most vulnerable in our communities are never
                  forgotten.
                </p>
                <p>
                  <a
                    href="/#contact"
                    className="font-bold text-[#dc9e9f] underline underline-offset-2 transition-colors hover:text-black dark:hover:text-white"
                  >
                    Get in touch
                  </a>{" "}
                  to partner with us, or{" "}
                  <Link
                    to="/blogs"
                    className="font-bold text-[#dc9e9f] underline underline-offset-2 transition-colors hover:text-black dark:hover:text-white"
                  >
                    explore our blog
                  </Link>{" "}
                  for the latest updates from the field.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
