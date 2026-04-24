import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { SunIcon } from "@/components/icons/lucide-sun"
import { MoonIcon } from "@/components/icons/lucide-moon"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const linkClass =
  "text-[13px] font-bold tracking-wider uppercase text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
const linkClassActive = "text-black dark:text-white"

export function Header() {
  const { theme, setTheme } = useTheme()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const resolvedDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  const toggleTheme = () => {
    setTheme(resolvedDark ? "light" : "dark")
  }

  const closeMobile = () => setMobileOpen(false)

  useEffect(() => {
    const id = window.setTimeout(() => {
      setMobileOpen(false)
    }, 0)
    return () => clearTimeout(id)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [mobileOpen])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-background shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <div className="container mx-auto flex h-[80px] items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/images/cfr_icon.png"
            alt="CareFirst Recovery Foundation"
            className="h-10 w-10 object-contain"
          />
          <div className="flex flex-col">
            <span className="text-xl leading-none font-extrabold tracking-tight">
              <span style={{ color: "#dc9e9f" }}>CareFirst</span>
            </span>
            <span className="mt-0.5 text-[10px] font-bold tracking-widest text-neutral-500 dark:text-neutral-400">
              FOUNDATION
            </span>
          </div>
        </div>

        {/* Nav Links — desktop */}
        <nav
          className="hidden gap-8 text-[13px] font-bold tracking-wider text-neutral-600 uppercase lg:flex dark:text-neutral-400"
          aria-label="Main"
        >
          <Link
            to="/"
            className={location.pathname === "/" ? linkClassActive : ""}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={
              location.pathname === "/about"
                ? linkClassActive
                : "transition-colors hover:text-black dark:hover:text-white"
            }
          >
            About Us
          </Link>
          <Link
            to="/blogs"
            className={
              location.pathname.startsWith("/blog") ||
              location.pathname === "/blogs"
                ? linkClassActive
                : "transition-colors hover:text-black dark:hover:text-white"
            }
          >
            Blogs
          </Link>
          <a
            href="/#events"
            className="transition-colors hover:text-black dark:hover:text-white"
          >
            Events
          </a>
          <a
            href="/#contact"
            className="transition-colors hover:text-black dark:hover:text-white"
          >
            Contact
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            className="hidden transform cursor-pointer rounded-none bg-black px-6 py-5 text-xs font-bold tracking-wide text-white uppercase shadow-md transition-all duration-300 hover:scale-105 hover:bg-neutral-800 md:inline-flex dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            asChild
          >
            <a href="/#contact">Donate</a>
          </Button>

          {/* Theme Toggle — no border; keep focus ring for keyboard users */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent text-neutral-700 transition-colors duration-200 hover:bg-neutral-100/80 focus-visible:ring-2 focus-visible:ring-neutral-400/60 focus-visible:outline-none dark:text-neutral-300 dark:hover:bg-neutral-800/80 dark:focus-visible:ring-neutral-500/50"
          >
            {resolvedDark ? (
              <SunIcon
                size={18}
                className="transition-transform duration-300"
              />
            ) : (
              <MoonIcon
                size={18}
                className="transition-transform duration-300"
              />
            )}
          </button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-neutral-700 lg:hidden dark:text-neutral-300"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-navigation"
        className={cn(
          "border-t border-neutral-200 bg-background dark:border-neutral-800 dark:bg-neutral-950",
          "lg:hidden",
          !mobileOpen && "hidden"
        )}
      >
        <nav
          className="container mx-auto flex max-h-[min(70vh,calc(100dvh-5rem))] flex-col overflow-y-auto px-4 py-2 pb-6"
          aria-label="Mobile"
        >
          <Link
            to="/"
            onClick={closeMobile}
            className={cn(
              "border-b border-neutral-100 py-4 dark:border-neutral-800",
              linkClass,
              location.pathname === "/" && linkClassActive
            )}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={closeMobile}
            className={cn(
              "border-b border-neutral-100 py-4 dark:border-neutral-800",
              linkClass,
              location.pathname === "/about" && linkClassActive
            )}
          >
            About Us
          </Link>
          <a
            href="/#events"
            onClick={closeMobile}
            className={cn(
              "border-b border-neutral-100 py-4 dark:border-neutral-800",
              linkClass
            )}
          >
            Events
          </a>
          <Link
            to="/blogs"
            onClick={closeMobile}
            className={cn(
              "border-b border-neutral-100 py-4 dark:border-neutral-800",
              linkClass,
              (location.pathname.startsWith("/blog") ||
                location.pathname === "/blogs") &&
                linkClassActive
            )}
          >
            Blogs
          </Link>
          <a
            href="/#contact"
            onClick={closeMobile}
            className={cn("py-4", linkClass)}
          >
            Contact
          </a>
          <Button
            className="mt-4 w-full transform cursor-pointer rounded-none bg-black py-6 text-xs font-bold tracking-wide text-white uppercase shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            asChild
          >
            <a href="/#contact" onClick={closeMobile}>
              Donate
            </a>
          </Button>
        </nav>
      </div>
    </header>
  )
}
