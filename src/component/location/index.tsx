import { Map } from "./map"
import { ReactComponent as CarIcon } from "../../image/car-icon.svg"
import { ReactComponent as BusIcon } from "../../image/bus-icon.svg"
import { LazyDiv } from "../lazyDiv"

export const Location = () => {
  return (
    <>
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>
        <div className="addr">
          Seoul National University Research Park Wedding Hall
          <div className="detail">
            1 Gwanak-ro, Gwanak-gu, Seoul, Research Park Main Building, 1st
            Floor
          </div>
        </div>
        <Map />
      </LazyDiv>
      <LazyDiv className="card location">
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">Public Transportation</div>
          <div />
          <div className="content">
            * By Subway
            <br />
            Take Subway Line 2 and exit at <b>Nakseongdae Station Exit 4</b>.
            <br />
            → Turn left at the first alley.
            <br />→ Take the village bus <b>Gwanak 02</b>.
            <br />→ Get off at{" "}
            <b>Seoul National University Back Gate·Research Park Stop</b>.
            <br />
            → Cross the street and walk 100 meters while referring to the signs.
            <br />
            Look for the black pyramid-shaped glass building.
          </div>
          <div />
          <div className="content">
            * By Bus
            <br />
            - Main Line (Blue): 461, 641
            <br />
            - Branch Line (Green): 5413, 5524, 5528
            <br />
            Get off at <b>Nakseongdae Entrance</b>.
            <br />→ Take the village bus <b>Gwanak 02</b>.
            <br />
            Follow the same directions as above.
          </div>
        </div>
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <CarIcon className="transportation-icon" />
          </div>
          <div className="heading">By Car</div>
          <div />
          <div className="content">
            Use Naver Maps, Kakao Navi, Tmap, etc.
            <br />
            Search for{" "}
            <b>Seoul National University Research Park Wedding Hall</b>.
            <br />
            - Parking is free.
            <br />
            (The parking lot is directly connected to the wedding hall.)
          </div>
          <div />
          <div className="content">
            <b>
              ※ Please note that a toll fee is incurred when passing through the
              main or back gates of Seoul National University. Use the
              Nakseongdae direction instead.
            </b>
          </div>
        </div>
      </LazyDiv>
    </>
  )
}
