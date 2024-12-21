import { useEffect, useMemo, useState } from "react"
import { HOLIDAYS, WEDDING_DATE } from "../../const"
import { LazyDiv } from "../lazyDiv"

const firstDayOfWeek = WEDDING_DATE.startOf("month").day()
const daysInMonth = WEDDING_DATE.daysInMonth()

export const Calendar = () => {
  const [tsDiff, setTsDiff] = useState(WEDDING_DATE.diff())

  const dayDiff = useMemo(() => {
    const dayOffset = WEDDING_DATE.diff(WEDDING_DATE.startOf("day"))
    return Math.ceil((tsDiff - dayOffset) / 1000 / 60 / 60 / 24)
  }, [tsDiff])

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = WEDDING_DATE.diff()

      setTsDiff(diff)
    }, 1000)

    return () => clearInterval(interval)
  })

  const diffs = useMemo(() => {
    const tsDiff_ = Math.abs(tsDiff)
    const seconds = Math.floor((tsDiff_ % 60000) / 1000)
    const minutes = Math.floor((tsDiff_ % 3600000) / 60000)
    const hours = Math.floor((tsDiff_ % 86400000) / 3600000)
    const days = Math.floor(tsDiff_ / 86400000)
    const isAfter = tsDiff < 0

    return { days, hours, minutes, seconds, isAfter }
  }, [tsDiff])

  return (
    <LazyDiv className="card calendar">
      <h2 className="english">ថ្ងៃសិរីសួស្តីភ្ជាប់ពាក្យ</h2>
      <div className="break" />
      {WEDDING_DATE.format("YYYY MMMM D, dddd A h:mm")}
      <div className="calendar-wrapper">
        <div className="head holiday">
          <span>Su</span>
        </div>
        <div className="head">
          <span>Mo</span>
        </div>
        <div className="head">
          <span>Tu</span>
        </div>
        <div className="head">
          <span>We</span>
        </div>
        <div className="head">
          <span>Th</span>
        </div>
        <div className="head">
          <span>Fr</span>
        </div>
        <div className="head">
          <span>Sa</span>
        </div>
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={i} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const date = i + 1

          const classes = []

          const isSunday = (i + firstDayOfWeek) % 7 === 0

          if (isSunday || HOLIDAYS.includes(date)) {
            classes.push("holiday")
          }

          const isWeddingDate = date === WEDDING_DATE.date()

          if (isWeddingDate) {
            classes.push("wedding-date")
          }

          return (
            <div
              key={i}
              className={classes.length ? classes.join(" ") : undefined}
            >
              <span>{date}</span>
              {isWeddingDate && <div className="heart" />}
            </div>
          )
        })}
      </div>
      <div className="countdown-wrapper">
        <div className="countdown">
          <div className="unit">DAY</div>
          <div />
          <div className="unit">HOUR</div>
          <div />
          <div className="unit">MIN</div>
          <div />
          <div className="unit">SEC</div>
          <div className="count">{diffs.days}</div>
          <span>:</span>
          <div className="count">{diffs.hours}</div>
          <span>:</span>
          <div className="count">{diffs.minutes}</div>
          <span>:</span>
          <div className="count">{diffs.seconds}</div>
        </div>
        <div className="message">
          ពិធីភ្ជាប់ពាក្យរបស់ គង់ វរៈសម្បត្តិ និង ស៊ឹម ពិសី នឹងប្រព្រឹត្តិទៅនៅ{" "}
          {dayDiff > 0 ? (
            <>
              <span
                style={{ color: "#c2a11d", fontWeight: "bold" }}
                className="d-day"
              >
                {dayDiff}
              </span>{" "}
              ថ្ងៃទៀត.
            </>
          ) : dayDiff === 0 ? (
            <>today!</>
          ) : (
            <>
              <span className="d-day">{-dayDiff}</span> days ago.
            </>
          )}
        </div>
      </div>
    </LazyDiv>
  )
}
