import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { HomePage } from "@/pages/HomePage"
import { AboutPage } from "@/pages/AboutPage"
import { BlogPostPage } from "@/pages/BlogPostPage"
import { BlogsPage } from "@/pages/BlogsPage"

export function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col font-sans text-neutral-900 selection:bg-neutral-200 selection:text-black dark:text-neutral-100 dark:selection:bg-neutral-700 dark:selection:text-white">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
