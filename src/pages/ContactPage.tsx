import { useEffect, useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { MapPin, Mail, Phone } from "lucide-react"
import { Whatsapp } from "@/components/icons/whatsapp"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const INQUIRY_EMAIL = "carefirstfoundation@hotmail.com"
const PHONE = "+260 98 1484409"
const WHATSAPP = "+260 95 4756031"
/** International number only, no + (matches wa.me / WhatsApp link format) */
const WHATSAPP_NUMBER_DIGITS = "260954756031"
const ADDRESS = "Ngwezi Rd, Roma, Lusaka, Zambia"

/**
 * wa.me URL length is limited; keep pre-encoded text under a safe size so
 * the link works in all browsers.
 */
const WHATSAPP_MAX_MESSAGE_CHARS = 3600

const contactPreferenceOptions = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone call" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "any", label: "No preference" },
] as const

type Preference = (typeof contactPreferenceOptions)[number]["value"]

const inputClass =
  "w-full border border-neutral-300 bg-white px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-[border-color,box-shadow] focus:border-black focus:ring-1 focus:ring-black/20 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-white dark:focus:ring-white/20"
const labelClass =
  "mb-1.5 block text-xs font-bold tracking-wider text-neutral-500 uppercase dark:text-neutral-400"

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}

type ContactMessageResult =
  | { ok: true; text: string }
  | { ok: false; error: string }

function buildContactText(
  name: string,
  em: string,
  mob: string,
  organization: string,
  city: string,
  message: string,
  prefLabel: string
): ContactMessageResult {
  if (!name || !em || !mob || !message.trim()) {
    return {
      ok: false,
      error: "Please fill in your name, email, mobile number, and message.",
    }
  }
  if (!isValidEmail(em)) {
    return { ok: false, error: "Please enter a valid email address." }
  }
  if (mob.length < 6) {
    return { ok: false, error: "Please enter a valid mobile number." }
  }

  const text = [
    "Hello CareFirst,",
    "",
    "*Website contact form*",
    "",
    `Name: ${name}`,
    `Email: ${em}`,
    `Mobile: ${mob}`,
    organization.trim() && `Organization: ${organization.trim()}`,
    city.trim() && `City / area: ${city.trim()}`,
    `Preferred reply: ${prefLabel}`,
    "",
    "Message:",
    message.trim(),
  ]
    .filter(Boolean)
    .join("\n")

  if (text.length > WHATSAPP_MAX_MESSAGE_CHARS) {
    return {
      ok: true,
      text:
        text.slice(0, WHATSAPP_MAX_MESSAGE_CHARS - 80) +
        "\n\n…[Message was shortened. Please send the rest in a follow-up or email.]",
    }
  }

  return { ok: true, text }
}

function openWhatsAppWithText(message: string) {
  const url = `https://wa.me/${WHATSAPP_NUMBER_DIGITS}?text=${encodeURIComponent(message)}`
  const opened = window.open(url, "_blank", "noopener,noreferrer")
  if (!opened) {
    window.location.assign(url)
  }
}

export function ContactPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [organization, setOrganization] = useState("")
  const [city, setCity] = useState("")
  const [message, setMessage] = useState("")
  const [preferredContact, setPreferredContact] = useState<Preference>("email")
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  function handleSubmitWhatsApp(e: FormEvent) {
    e.preventDefault()
    setError(null)

    const prefLabel =
      contactPreferenceOptions.find((o) => o.value === preferredContact)
        ?.label ?? preferredContact

    const result = buildContactText(
      fullName.trim(),
      email.trim(),
      phone.trim(),
      organization,
      city,
      message,
      prefLabel
    )
    if (!result.ok) {
      setError(result.error)
      return
    }
    openWhatsAppWithText(result.text)
    setSubmitted(true)
  }

  function handleSendEmail() {
    setError(null)
    const prefLabel =
      contactPreferenceOptions.find((o) => o.value === preferredContact)
        ?.label ?? preferredContact

    const result = buildContactText(
      fullName.trim(),
      email.trim(),
      phone.trim(),
      organization,
      city,
      message,
      prefLabel
    )
    if (!result.ok) {
      setError(result.error)
      return
    }
    const subject = encodeURIComponent(
      "Website contact — CareFirst Recovery Foundation"
    )
    const bodyEncoded = encodeURIComponent(result.text)
    try {
      window.location.href = `mailto:${INQUIRY_EMAIL}?subject=${subject}&body=${bodyEncoded}`
    } catch {
      // ignore
    }
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-6 pb-16 md:pb-24 dark:bg-neutral-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center md:mb-16">
          <h3 className="mt-0 text-sm font-bold tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
            Get in touch
          </h3>
          <h1 className="text-4xl leading-tight font-extrabold text-black md:text-4xl dark:text-white">
            Contact us
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-neutral-500 dark:text-neutral-400">
            Have a question, partnership idea, or want to support our work? Send
            us a message and we’ll respond as soon as we can.
          </p>
          <div className="mx-auto mt-6 h-1.5 w-20 bg-[#DC9E9F]"></div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="space-y-8 border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900">
              <h2 className="text-sm font-bold tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
                Our details
              </h2>
              <ul className="space-y-6 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                <li className="flex gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-neutral-500" />
                  <span>{ADDRESS}</span>
                </li>
                <li className="flex items-center gap-4">
                  <Mail className="h-5 w-5 shrink-0 text-neutral-500" />
                  <a
                    href={`mailto:${INQUIRY_EMAIL}`}
                    className="text-[#dc9e9f] underline-offset-2 transition-colors hover:underline"
                  >
                    {INQUIRY_EMAIL}
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="h-5 w-5 shrink-0 text-neutral-500" />
                  <a
                    href={`tel:${PHONE.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-black dark:hover:text-white"
                  >
                    {PHONE}
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <Whatsapp className="h-5 w-5 shrink-0 text-neutral-500" />
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER_DIGITS}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#dc9e9f] underline-offset-2 transition-colors hover:underline"
                  >
                    {WHATSAPP}
                  </a>
                </li>
              </ul>
            </div>
            <p className="px-1 text-sm leading-relaxed text-neutral-500 dark:text-neutral-500">
              Prefer not to use the form? You can also reach us by email or
              phone using the details above.
            </p>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div
                className="border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900"
                role="status"
              >
                <h2 className="text-2xl font-extrabold text-black dark:text-white">
                  Thank you
                </h2>
                <p className="mt-4 text-neutral-600 dark:text-neutral-400">
                  A WhatsApp chat to our team should have opened with your
                  message ready to send—tap <strong>Send</strong> in WhatsApp.
                  If it didn’t open, message us on{" "}
                  <a
                    className="font-bold text-[#dc9e9f] underline"
                    href={`https://wa.me/${WHATSAPP_NUMBER_DIGITS}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>{" "}
                  or email{" "}
                  <a
                    className="font-bold text-[#dc9e9f] underline"
                    href={`mailto:${INQUIRY_EMAIL}`}
                  >
                    {INQUIRY_EMAIL}
                  </a>
                  .
                </p>
                <Button
                  type="button"
                  className="mt-8 rounded-none"
                  onClick={() => {
                    setSubmitted(false)
                    setMessage("")
                    setError(null)
                  }}
                >
                  Send another message
                </Button>
                <p className="mt-6 text-sm text-neutral-500">
                  <Link
                    to="/"
                    className="font-bold text-[#dc9e9f] transition-colors hover:text-black dark:hover:text-white"
                  >
                    Back to home
                  </Link>
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmitWhatsApp}
                className="border border-neutral-200 bg-white p-6 sm:p-8 dark:border-neutral-800 dark:bg-neutral-900"
                noValidate
              >
                {error && (
                  <p
                    className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
                    role="alert"
                  >
                    {error}
                  </p>
                )}

                <div className="space-y-6">
                  <div>
                    <label className={labelClass} htmlFor="fullName">
                      Full name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={inputClass}
                      required
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className={labelClass} htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClass}
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="phone">
                        Mobile number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={inputClass}
                        placeholder="+260 …"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className={labelClass} htmlFor="organization">
                        Organization{" "}
                        <span className="font-normal text-neutral-400 normal-case">
                          (optional)
                        </span>
                      </label>
                      <input
                        id="organization"
                        name="organization"
                        type="text"
                        autoComplete="organization"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="city">
                        City / area{" "}
                        <span className="font-normal text-neutral-400 normal-case">
                          (optional)
                        </span>
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        autoComplete="address-level2"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="message">
                      How can we help? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={cn(inputClass, "min-h-[120px] resize-y")}
                      required
                    />
                  </div>

                  <fieldset>
                    <legend className={cn(labelClass, "mb-3")}>
                      How would you like us to reply?{" "}
                      <span className="text-red-500">*</span>
                    </legend>
                    <div className="space-y-3">
                      {contactPreferenceOptions.map((opt) => (
                        <label
                          key={opt.value}
                          className="flex cursor-pointer items-center gap-3"
                        >
                          <input
                            type="radio"
                            name="preferredContact"
                            value={opt.value}
                            checked={preferredContact === opt.value}
                            onChange={() => setPreferredContact(opt.value)}
                            className="h-4 w-4 border-neutral-400 text-black focus:ring-black dark:focus:ring-white"
                          />
                          <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                            {opt.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <Button
                      type="submit"
                      className="h-auto w-full rounded-none bg-[#25D366] px-8 py-5 text-sm font-bold tracking-wide text-white uppercase shadow-md transition-transform hover:scale-[1.01] hover:bg-[#1ebd59] sm:w-auto"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Whatsapp
                          className="h-5 w-5 [&_path]:fill-white"
                          aria-hidden
                        />
                        Send via WhatsApp
                      </span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSendEmail}
                      className="h-auto w-full rounded-none border-neutral-300 px-8 py-5 text-sm font-bold tracking-wide uppercase sm:w-auto dark:border-neutral-600"
                    >
                      Use email instead
                    </Button>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500">
                    <span className="text-red-500">*</span> Required fields.{" "}
                    <strong>Send via WhatsApp</strong> opens chat with your
                    details filled in (you still press Send in WhatsApp). Use{" "}
                    <strong>Use email instead</strong> to open your mail app.
                    Nothing is stored on this website.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
