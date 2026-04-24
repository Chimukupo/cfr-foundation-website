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

  return (
    <section
      className="relative flex h-[80vh] min-h-[600px] w-full items-center overflow-hidden bg-neutral-900 bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url('${images[currentIndex]}')` }}
    >
      <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>

      <div className="relative z-10 container mx-auto flex animate-in flex-col items-center space-y-4 px-4 duration-1000 fade-in slide-in-from-bottom-8 md:px-6">
        <h1 className="max-w-4xl text-center text-4xl leading-[1.1] font-extrabold drop-shadow-lg sm:text-5xl md:text-7xl">
          <span style={{ color: "#dc9e9f" }}>CareFirst</span>{" "}
          <span style={{ color: "#f2f3f4" }}>Recovery</span>
          <br />
          <span className="text-neutral-300">Foundation</span>
        </h1>

        <p className="mt-6 mb-4 max-w-2xl text-center font-medium text-neutral-300 drop-shadow-md md:text-lg">
          CareFirst Recovery Foundation is dedicated to the relief and
          environmental well-being of marginalized and vulnerable children and
          youths.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            className="transform cursor-pointer rounded-none bg-white px-8 py-6 font-bold tracking-wide text-black uppercase shadow-lg transition-all duration-300 hover:scale-105 hover:bg-neutral-200"
          >
            View More
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="cursor-pointer rounded-none border-white bg-transparent px-8 py-6 font-bold tracking-wide text-white uppercase transition-all duration-300 hover:bg-white hover:text-[#dc9e9f]"
          >
            Donate Now
          </Button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 cursor-pointer rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-white"
                : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
