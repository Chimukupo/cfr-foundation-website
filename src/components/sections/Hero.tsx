import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const images = [
  "/images/cfr1.jpg",
  "/images/cfr2.jpg",
  "/images/cfr3.jpg",
  "/images/cfr4.jpg",
  "/images/cfr5.jpg",
]

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <section 
      className="relative w-full h-[80vh] min-h-[600px] flex items-center bg-neutral-900 bg-cover bg-center overflow-hidden transition-all duration-1000" 
      style={{ backgroundImage: `url('${images[currentIndex]}')` }}
    >
      <div className="absolute inset-0 bg-black/65 bg-gradient-to-t from-black/85 via-black/50 to-black/65"></div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white max-w-4xl leading-[1.1] text-center drop-shadow-lg">
          CareFirst Recovery <br className="hidden md:block" /> <span className="text-neutral-400">Foundation</span>
        </h1>
        
        <p className="text-neutral-300 md:text-lg max-w-2xl mt-6 mb-4 text-center font-medium drop-shadow-md">
          CareFirst Recovery Foundation is dedicated to the relief and environmental well-being of marginalized and vulnerable children and youths.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Button size="lg" className="bg-white hover:bg-neutral-200 text-black font-bold uppercase tracking-wide px-8 py-6 rounded-none transition-all duration-300 transform hover:scale-105 shadow-lg">
            View More
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black font-bold uppercase tracking-wide px-8 py-6 rounded-none transition-all duration-300">
            Donate Now
          </Button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/30 text-white hover:bg-white hover:text-black cursor-pointer backdrop-blur-sm transition-all hover:scale-110 z-20"
      >
        &larr;
      </div>
      <div 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/30 text-white hover:bg-white hover:text-black cursor-pointer backdrop-blur-sm transition-all hover:scale-110 z-20"
      >
        &rarr;
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white w-8" : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
