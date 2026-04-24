import { useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"

type TabId = "mission" | "vision" | "goal"

const tabContent: Record<TabId, { smallHeading: string; body: ReactNode }> = {
  mission: {
    smallHeading: "Our Mission",
    body: (
      <>
        <p>
          To empower marginalized children and youths by providing essential
          relief, fostering environmental stewardship, and creating sustainable
          development opportunities for communities worldwide.
        </p>
        <p>
          We believe that by investing in our youth today, we can cultivate
          resilient, environmentally conscious leaders for tomorrow. Our
          programs are uniquely designed to uplift communities holistically and
          solve root causes of poverty.
        </p>
      </>
    ),
  },
  vision: {
    smallHeading: "Our Vision",
    body: (
      <>
        <p>
          To transform lives and restore hope in every community we serve - where
          vulnerable children and young people are seen, supported, and given
          the tools to build dignified futures free from the cycles of need and
          environmental harm.
        </p>
        <p>
          We see a world in which no child is left without care, in which local
          leadership and sustainable practices go hand in hand, and in which the
          next generation can grow in safety, opportunity, and belonging.
        </p>
      </>
    ),
  },
  goal: {
    smallHeading: "Our Goal",
    body: (
      <>
        <p>
          Our goal is to expand access to practical relief, education, and green
          initiatives so that the communities we work with can recover, thrive,
          and sustain progress long after our first visit.
        </p>
        <p>
          We measure success by children reached, environments protected, and
          partnerships deepened. We turn short-term support into lasting change 
          by working with one program and one community at a time.
        </p>
      </>
    ),
  },
}

export function Contact() {
  const [active, setActive] = useState<TabId>("mission")
  const tabs: { id: TabId; label: string }[] = [
    { id: "mission", label: "Our Mission" },
    { id: "vision", label: "Our Vision" },
    { id: "goal", label: "Our Goal" },
  ]

  return (
    <section
      className="relative bg-white py-24 dark:bg-neutral-950"
      id="organization"
    >
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="flex flex-col overflow-hidden border border-neutral-200 bg-white shadow-2xl lg:flex-row dark:border-neutral-800 dark:bg-neutral-900">
          {/* Left Side: Call to Action */}
          <div
            className="relative flex flex-col justify-center bg-cover bg-center p-12 text-white lg:w-5/12 lg:p-16"
            style={{ backgroundImage: "url('/images/donation_photo2.jpeg')" }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10">
              <h2 className="mb-6 text-4xl leading-tight font-extrabold drop-shadow-sm md:text-5xl">
                Become A Proud <br className="hidden md:block" />
                Volunteer Now
              </h2>
              <div className="mb-6 h-1.5 w-16 bg-white"></div>
              {/* <p className="text-neutral-400 mb-10 text-lg leading-relaxed font-medium"> */}
              <p className="mb-10 text-lg leading-relaxed font-medium text-white">
                Join hands with us to bring relief and create better
                environmental well-being for vulnerable children and youths.
              </p>
              <Button
                size="lg"
                className="w-fit transform cursor-pointer rounded-none border-0 bg-white px-8 py-6 font-bold tracking-wider text-black uppercase shadow-lg transition-all hover:scale-105 hover:bg-neutral-200"
              >
                Donate Now
              </Button>
            </div>
          </div>

          {/* Right Side: Mission Tabs */}
          <div className="bg-neutral-50 p-12 lg:w-7/12 lg:p-16 dark:bg-neutral-900">
            <h3 className="mb-4 text-sm font-bold tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
              {tabContent[active].smallHeading}
            </h3>
            <h2 className="mb-10 text-3xl leading-tight font-extrabold text-black md:text-5xl dark:text-white">
              We're Building Strong Reputation
            </h2>

            <div
              className="mb-8 flex flex-wrap gap-x-2 gap-y-2 border-b border-neutral-200 md:gap-x-8 dark:border-neutral-700"
              role="tablist"
              aria-label="Mission, vision, and goal"
            >
              {tabs.map(({ id, label }) => {
                const isActive = active === id
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    id={`org-tab-${id}`}
                    aria-selected={isActive}
                    aria-controls={`org-panel-${id}`}
                    onClick={() => setActive(id)}
                    className={`-mb-px cursor-pointer border-b-2 pb-4 text-sm tracking-wide uppercase transition-colors md:text-base ${
                      isActive
                        ? "border-black font-bold text-black dark:border-white dark:text-white"
                        : "border-transparent font-semibold text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
                    }`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>

            <div
              id={`org-panel-${active}`}
              role="tabpanel"
              aria-labelledby={`org-tab-${active}`}
              className="space-y-6 text-lg leading-relaxed font-medium text-neutral-600 dark:text-neutral-400"
            >
              {tabContent[active].body}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
