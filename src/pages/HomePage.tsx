import { Hero } from "@/components/sections/Hero"
import { Overview } from "@/components/sections/Overview"
import { Blog } from "@/components/sections/Blog"
import { Contact } from "@/components/sections/Contact"

export function HomePage() {
  return (
    <>
      <Hero />
      <Overview />
      <Contact />
      <Blog />
    </>
  )
}
