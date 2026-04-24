import { useEffect, useState, type FormEvent } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  getUpcomingEvents,
  type FoundationEvent,
} from "@/lib/firebase"
import { FirebaseImage } from "@/components/ui/FirebaseImage"
import { EventCountdown } from "@/components/events/EventCountdown"
import { Whatsapp } from "@/components/icons/whatsapp"

const INQUIRY_EMAIL = "carefirstfoundation@hotmail.com"
const WHATSAPP_NUMBER_DIGITS = "260954756031"

const inputClass =
  "w-full border border-neutral-300 bg-white px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-[border-color,box-shadow] focus:border-black focus:ring-1 focus:ring-black/20 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-white dark:focus:ring-white/20"
const labelClass =
  "mb-1.5 block text-xs font-bold tracking-wider text-neutral-500 uppercase dark:text-neutral-400"

function eventDateToDate(ev: FoundationEvent): Date | null {
  const d = ev.eventDate
  if (!d) return null
  if (typeof d === "object" && d !== null && "toDate" in d) {
    return d.toDate()
  }
  return null
}

export function EventsPage() {
  const [events, setEvents] = useState<FoundationEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [notifyEmail, setNotifyEmail] = useState("")
  const [notifyWhatsapp, setNotifyWhatsapp] = useState("")
  const [notifyError, setNotifyError] = useState<string | null>(null)
  const [notifyThanks, setNotifyThanks] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const load = async () => {
      try {
        const data = await getUpcomingEvents()
        setEvents(data)
      } catch (e) {
        console.error("Failed to load events:", e)
        setEvents([])
      } finally {
        setLoading(false)
      }
    }
    void load()
  }, [])

  function handleNotifySubmit(e: FormEvent) {
    e.preventDefault()
    setNotifyError(null)
    const em = notifyEmail.trim()
    const wa = notifyWhatsapp.trim()
    if (!em && !wa) {
      setNotifyError("Please enter an email, a WhatsApp number, or both.")
      return
    }
    if (em && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      setNotifyError("Please enter a valid email address, or clear the field.")
      return
    }

    const body = [
      "Please let me know when you announce new upcoming events.",
      "",
      em && `My email: ${em}`,
      wa && `My WhatsApp: ${wa}`,
    ]
      .filter(Boolean)
      .join("\n")
    const subject = encodeURIComponent(
      "Event updates — please notify me (CareFirst website)",
    )
    const mail = `mailto:${INQUIRY_EMAIL}?subject=${subject}&body=${encodeURIComponent(body)}`
    try {
      window.location.href = mail
    } catch {
      // ignore
    }
    setNotifyThanks(true)
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-6 pb-5 dark:bg-neutral-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <h3 className="mt-0 text-sm font-bold tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
            What&apos;s on
          </h3>
          <h1 className="text-4xl leading-tight font-extrabold text-black md:text-4xl dark:text-white">
            Upcoming events
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-neutral-500 dark:text-neutral-400">
            Save the date and join the CareFirst Recovery Foundation at
            community gatherings, drives, and special programmes.
          </p>
          <div className="mx-auto mt-6 h-1.5 w-20 bg-[#DC9E9F]"></div>
        </div>

        {loading ? (
          <div className="animate-pulse py-24 text-center font-bold text-neutral-500">
            Loading events…
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((ev) => {
              const at = eventDateToDate(ev)
              const dateLabel = at
                ? at.toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })
                : "Date to be announced"

              return (
                <Card
                  key={ev.id}
                  className="overflow-hidden rounded-none border-0 bg-white shadow-lg dark:bg-neutral-900"
                >
                  <div className="relative h-48 overflow-hidden sm:h-56">
                    {ev.imageUrl ? (
                      <FirebaseImage
                        src={ev.imageUrl}
                        alt={ev.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-neutral-200 dark:bg-neutral-800">
                        <span className="text-sm font-bold text-neutral-400 uppercase">
                          Event
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-[#dc9e9f] px-3 py-1 text-xs font-bold tracking-wider text-black uppercase">
                      Upcoming
                    </div>
                  </div>
                  <CardHeader className="px-6 pt-5 pb-2">
                    <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                      {dateLabel}
                    </p>
                    {ev.location && (
                      <p className="mt-1 text-xs font-bold text-neutral-600 dark:text-neutral-500">
                        {ev.location}
                      </p>
                    )}
                    <h2 className="text-xl font-bold text-black leading-snug dark:text-white">
                      {ev.title}
                    </h2>
                  </CardHeader>
                  <CardContent className="space-y-4 px-6 pt-0 pb-6 text-sm text-neutral-600 dark:text-neutral-400">
                    {at && <EventCountdown target={at} className="pt-1" />}
                    {ev.excerpt && (
                      <p className="line-clamp-4 leading-relaxed">{ev.excerpt}</p>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl space-y-10">
            <div className="border border-neutral-200 bg-white p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
              <h2 className="text-2xl font-extrabold text-black dark:text-white">
                No upcoming events
              </h2>
              <p className="mt-3 text-lg font-medium text-neutral-500 dark:text-neutral-400">
                There are no published upcoming events at the moment. Check
                again soon!
              </p>
            </div>

            {notifyThanks ? (
              <div
                className="border border-neutral-200 bg-white p-6 text-center dark:border-neutral-800 dark:bg-neutral-900"
                role="status"
              >
                <p className="font-medium text-neutral-700 dark:text-neutral-300">
                  If your email app opened, please send the message. You can
                  also reach us on{" "}
                  <a
                    className="font-bold text-[#dc9e9f] underline"
                    href={`https://wa.me/${WHATSAPP_NUMBER_DIGITS}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>{" "}
                  anytime.
                </p>
                <Button
                  type="button"
                  className="mt-6 rounded-none"
                  onClick={() => {
                    setNotifyThanks(false)
                    setNotifyEmail("")
                    setNotifyWhatsapp("")
                    setNotifyError(null)
                  }}
                >
                  Update my details
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleNotifySubmit}
                className="border border-neutral-200 bg-white p-6 sm:p-8 dark:border-neutral-800 dark:bg-neutral-900"
                noValidate
              >
                <h3 className="text-sm font-bold tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
                  Get notified
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  Leave your email, WhatsApp number, or both and we can reach
                  you when the next event is published.
                </p>
                {notifyError && (
                  <p
                    className="mt-4 border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-200"
                    role="alert"
                  >
                    {notifyError}
                  </p>
                )}
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="notifyEmail">
                      Email
                    </label>
                    <input
                      id="notifyEmail"
                      name="notifyEmail"
                      type="email"
                      autoComplete="email"
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      className={inputClass}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="notifyWhatsapp">
                      WhatsApp number
                    </label>
                    <input
                      id="notifyWhatsapp"
                      name="notifyWhatsapp"
                      type="tel"
                      inputMode="tel"
                      value={notifyWhatsapp}
                      onChange={(e) => setNotifyWhatsapp(e.target.value)}
                      className={inputClass}
                      placeholder="+260 …"
                    />
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    type="submit"
                    className="rounded-none font-bold uppercase tracking-wide"
                  >
                    Request notification
                  </Button>
                  <p className="text-xs text-neutral-500">
                    This opens your email with a pre-filled request—nothing is
                    stored on this page.
                  </p>
                </div>
              </form>
            )}

            <p className="text-center text-sm text-neutral-500">
              You can also{" "}
              <a
                className="font-bold text-[#dc9e9f] underline"
                href={`https://wa.me/${WHATSAPP_NUMBER_DIGITS}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="inline-flex items-center gap-1">
                  <Whatsapp className="h-4 w-4 [&_path]:fill-[#dc9e9f]" />
                  message us on WhatsApp
                </span>
              </a>{" "}
              or visit our{" "}
              <a className="font-bold text-[#dc9e9f] underline" href="/contact">
                contact form
              </a>
              .
            </p>
          </div>
        )}

        {!loading && events.length > 0 && (
          <div className="mx-auto mt-16 max-w-2xl border-t border-neutral-200 pt-12 text-center dark:border-neutral-800">
            <h3 className="text-sm font-bold tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
              Stay in the loop
            </h3>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              Want a heads-up for the next event? See our{" "}
              <a
                className="font-bold text-[#dc9e9f] underline"
                href="/contact"
              >
                contact page
              </a>{" "}
              to connect with the team.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
