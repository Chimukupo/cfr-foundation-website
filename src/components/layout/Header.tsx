import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { SunIcon } from "@/components/icons/lucide-sun"
import { MoonIcon } from "@/components/icons/lucide-moon"
import { useTheme } from "@/components/theme-provider"

export function Header() {
  const { theme, setTheme } = useTheme()

  const resolvedDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  const toggleTheme = () => {
    setTheme(resolvedDark ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-neutral-950 shadow-sm border-b border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto flex h-[80px] items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black dark:bg-white text-white dark:text-black font-bold text-xl relative overflow-hidden">
            <span className="relative z-10">C</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-black dark:text-white leading-none">CareFirst</span>
            <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 tracking-widest mt-0.5">FOUNDATION</span>
          </div>
        </div>
        
        {/* Nav Links */}
        <nav className="hidden lg:flex gap-8 text-[13px] font-bold tracking-wider uppercase text-neutral-600 dark:text-neutral-400">
          <a href="#" className="text-black dark:text-white transition-colors">Home</a>
          <a href="#organization" className="hover:text-black dark:hover:text-white transition-colors">Organization</a>
          <a href="#programmes" className="hover:text-black dark:hover:text-white transition-colors">Programmes</a>
          <a href="#events" className="hover:text-black dark:hover:text-white transition-colors">Events</a>
          <a href="#blogs" className="hover:text-black dark:hover:text-white transition-colors">Blogs</a>
          <a href="#contact" className="hover:text-black dark:hover:text-white transition-colors">Contact</a>
        </nav>
        
        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button className="hidden md:inline-flex bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black font-bold uppercase tracking-wide text-xs px-6 py-5 rounded-none transition-all duration-300 transform hover:scale-105 shadow-md">
            Donate
          </Button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="inline-flex items-center justify-center w-10 h-10 rounded-none border border-neutral-200 dark:border-neutral-700 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-all duration-200 cursor-pointer"
          >
            {resolvedDark ? (
              <SunIcon size={18} className="transition-transform duration-300" />
            ) : (
              <MoonIcon size={18} className="transition-transform duration-300" />
            )}
          </button>

          <Button variant="ghost" size="icon" className="lg:hidden text-neutral-700 dark:text-neutral-300">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  )
}
