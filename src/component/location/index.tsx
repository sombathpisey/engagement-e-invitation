import { Map } from "./map"
import { LazyDiv } from "../lazyDiv"
import location from "../../image/location.webp"

export const Location = () => {
  // Google Maps Link
  const googleMapsUrl = "https://maps.app.goo.gl/oBg3LpBHkQmJzJJq7?g_st=ifm"

  const openGoogleMaps = () => {
    // Opens in a new browser tab
    window.open(googleMapsUrl, "_blank")
  }

  return (
    <>
      <LazyDiv className="card location">
        <h2 className="english">ទីតាំង</h2>
        <div className="addr">
          ស្ថិតនៅ បុរី PPS ផ្ទះលេខA០៣ ផ្លូវបេតុង ភូមិត្រពាំងសាលា សង្កាត់ពងទឹក
          ខណ្ឌដង្កោ រាជធានីភ្នំពេញ
        </div>
        <Map />
        {/* Add a button to open Google Maps */}
        <button onClick={openGoogleMaps} className="open-map-button">
          បើកមើលទីតាំងក្នុង Google Maps
        </button>
      </LazyDiv>

      <LazyDiv className="card location">
        <img src={location} alt="" />
      </LazyDiv>
    </>
  )
}
