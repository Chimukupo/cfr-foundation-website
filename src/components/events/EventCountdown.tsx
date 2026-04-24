import { useEffect, useState } from "react"

type Countdown = {
  days: number
  hours: number
  minutes: number
  seconds: number
  totalMs: number
}

function getCountdown(target: Date, now: number): Countdown {
  const diff = target.getTime() - now
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: diff }
  }
  const days = Math.floor(diff / 86_400_000)
  const hours = Math.floor((diff % 86_400_000) / 3_600_000)
  const minutes = Math.floor((diff % 3_600_000) / 60_000)
  const seconds = Math.floor((diff % 60_000) / 1000)
  return { days, hours, minutes, seconds, totalMs: diff }
}

const pad = (n: number) => String(n).padStart(2, "0")

const boxClass =
  "min-w-[3.25rem] sm:min-w-14 border border-neutral-200 bg-white px-2 py-2.5 text-center tabular-nums dark:border-neutral-600 dark:bg-neutral-800/80"

type EventCountdownProps = {
  target: Date
  className?: string
}

/**
 * Re-renders every second until the event time, then shows a short status line.
 */
export function EventCountdown({ target, className }: EventCountdownProps) {
  const [nowState, setNowState] = useState(() => Date.now())

  useEffect(() => {
    const t = setInterval(() => {
      setNowState(Date.now())
    }, 1000)
    return () => clearInterval(t)
  }, [target.getTime()])

  const c = getCountdown(target, nowState)

  if (c.totalMs <= 0) {
    return (
      <p className="text-sm font-bold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
        This event is starting or has started
      </p>
    )
  }

  return (
    <div
      className={className}
      role="timer"
      aria-label={`Time until event: ${c.days} days, ${c.hours} hours, ${c.minutes} minutes, ${c.seconds} seconds`}
    >
      <p className="mb-2 text-xs font-bold tracking-wider text-neutral-500 uppercase dark:text-neutral-500">
        Starts in
      </p>
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 sm:justify-start">
        {c.days > 0 && (
          <div className={boxClass}>
            <div className="text-lg font-extrabold text-black sm:text-2xl dark:text-white">
              {c.days}
            </div>
            <div className="text-[9px] font-bold tracking-wider text-neutral-500 uppercase">
              day{c.days === 1 ? "" : "s"}
            </div>
          </div>
        )}
        <div className={boxClass}>
          <div className="text-lg font-extrabold text-black sm:text-2xl dark:text-white">
            {pad(c.hours)}
          </div>
          <div className="text-[9px] font-bold tracking-wider text-neutral-500 uppercase">
            hours
          </div>
        </div>
        <div className={boxClass}>
          <div className="text-lg font-extrabold text-black sm:text-2xl dark:text-white">
            {pad(c.minutes)}
          </div>
          <div className="text-[9px] font-bold tracking-wider text-neutral-500 uppercase">
            min
          </div>
        </div>
        <div className={boxClass}>
          <div className="text-lg font-extrabold text-black sm:text-2xl dark:text-white">
            {pad(c.seconds)}
          </div>
          <div className="text-[9px] font-bold tracking-wider text-neutral-500 uppercase">
            sec
          </div>
        </div>
      </div>
    </div>
  )
}
