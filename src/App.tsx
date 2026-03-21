import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { Overview } from "@/components/sections/Overview"
import { Blog } from "@/components/sections/Blog"
import { Contact } from "@/components/sections/Contact"

export function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-neutral-900 dark:text-neutral-100 selection:bg-neutral-200 selection:text-black dark:selection:bg-neutral-700 dark:selection:text-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <Overview />
        <Contact />
        <Blog />
      </main>
      <Footer />
    </div>
  )
}

export default App
