import { Button } from "@/components/ui/button"

export function Contact() {
  return (
    <section className="py-24 bg-white dark:bg-neutral-950 relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="bg-white dark:bg-neutral-900 shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-neutral-200 dark:border-neutral-800">
          
          {/* Left Side: Call to Action */}
          <div className="lg:w-5/12 p-12 lg:p-16 text-white flex flex-col justify-center bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}>
            <div className="absolute inset-0 bg-black/85"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight drop-shadow-sm">Become A Proud <br className="hidden md:block"/>Volunteer Now</h2>
              <div className="w-16 h-1.5 bg-white mb-6"></div>
              <p className="text-neutral-400 mb-10 text-lg leading-relaxed font-medium">
                Join hands with us to bring relief and create better environmental well-being for vulnerable children and youths.
              </p>
              <Button size="lg" className="bg-white hover:bg-neutral-200 text-black border-0 w-fit px-8 py-6 rounded-none font-bold uppercase tracking-wider transform hover:scale-105 transition-all shadow-lg">
                Donate Now
              </Button>
            </div>
          </div>

          {/* Right Side: Mission Tabs */}
          <div className="lg:w-7/12 p-12 lg:p-16 bg-neutral-50 dark:bg-neutral-900">
            <h3 className="text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-widest text-sm mb-4">Our Mission</h3>
            <h2 className="text-3xl md:text-5xl font-extrabold text-black dark:text-white mb-10 leading-tight">
              We're Building Strong Reputation
            </h2>
            
            {/* Simple Tabs Simulation */}
            <div className="flex flex-wrap space-x-2 md:space-x-8 border-b border-neutral-200 dark:border-neutral-700 mb-8">
              <button className="pb-4 text-black dark:text-white font-bold border-b-2 border-black dark:border-white uppercase tracking-wide text-sm md:text-base">Our Mission</button>
              <button className="pb-4 text-neutral-400 font-semibold hover:text-neutral-700 dark:hover:text-neutral-300 uppercase tracking-wide text-sm md:text-base transition-colors">Our Vision</button>
              <button className="pb-4 text-neutral-400 font-semibold hover:text-neutral-700 dark:hover:text-neutral-300 uppercase tracking-wide text-sm md:text-base transition-colors">Our Goal</button>
            </div>
            
            <div className="text-neutral-600 dark:text-neutral-400 space-y-6 text-lg font-medium leading-relaxed">
              <p>
                To empower marginalized children and youths by providing essential relief, fostering environmental stewardship, and creating sustainable development opportunities for communities worldwide.
              </p>
              <p>
                We believe that by investing in our youth today, we can cultivate resilient, environmentally conscious leaders for tomorrow. Our programs are uniquely designed to uplift communities holistically and solve root causes of poverty.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
