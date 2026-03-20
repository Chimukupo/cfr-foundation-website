import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-950 shadow-sm border-b dark:border-slate-800">
      <div className="container mx-auto flex h-[80px] items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-white font-bold text-xl geometric-pattern relative overflow-hidden">
            <div className="absolute inset-x-0 h-1/2 bg-slate-900 bottom-0 rotate-12 scale-150"></div>
            <span className="relative z-10">C</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">CareFirst</span>
            <span className="text-[10px] font-bold text-amber-600 tracking-widest mt-0.5">FOUNDATION</span>
          </div>
        </div>
        
        {/* Nav Links */}
        <nav className="hidden lg:flex gap-8 text-[13px] font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
          <a href="#" className="text-amber-500 transition-colors">Home</a>
          <a href="#organization" className="hover:text-amber-500 transition-colors">Organization</a>
          <a href="#programmes" className="hover:text-amber-500 transition-colors">Programmes</a>
          <a href="#events" className="hover:text-amber-500 transition-colors">Events</a>
          <a href="#blogs" className="hover:text-amber-500 transition-colors">Blogs</a>
          <a href="#contact" className="hover:text-amber-500 transition-colors">Contact</a>
        </nav>
        
        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button className="hidden md:inline-flex bg-amber-500 hover:bg-amber-600 text-white font-bold uppercase tracking-wide text-xs px-6 py-5 rounded-none transition-all duration-300 transform hover:scale-105 shadow-md">
            Donate
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden text-slate-700 dark:text-slate-300">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  )
}
