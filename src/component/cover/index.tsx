import { BRIDE, GROOM, WEDDING_DATE } from "../../const"
import coverImage from "../../image/cover.webp"
import { LazyDiv } from "../lazyDiv"

const DAY_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

export const Cover = () => {
  return (
    <LazyDiv className="card cover">
      <div className="wedding-date">
        {WEDDING_DATE.format("YYYY")}
        <div className="divider" />
        {WEDDING_DATE.format("MM")}
        <div className="divider" />
        {WEDDING_DATE.format("DD")}
      </div>
      <div className="wedding-day-of-week">
        {DAY_OF_WEEK[WEDDING_DATE.day()]}
      </div>
      <div className="image-wrapper">
        <img src={coverImage} alt="sample" />
      </div>
      <div className="subtitle">Save the date for the engagement of</div>
      <div className="names">
        {GROOM}
        <div className="divider" />
        {BRIDE}
      </div>
      <div className="info">
        {WEDDING_DATE.format("YYYY MMMM D dddd h")}
        {WEDDING_DATE.format("A") === "AM" ? "AM" : ""}
      </div>
    </LazyDiv>
  )
}
