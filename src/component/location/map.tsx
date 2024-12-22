import { useEffect, useRef } from "react"
import { useKakao } from "../../component/store"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import nmapIcon from "../../image/nmap-icon.png"
import knaviIcon from "../../image/knavi-icon.png"
import tmapIcon from "../../image/tmap-icon.png"

const WEDDING_HALL_POSITION: [number, number] = [104.8379652, 11.4980323]
const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/oBg3LpBHkQmJzJJq7?g_st=ifm"

// Set Mapbox token
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || ""

const MapboxMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  // Initialize the map
  useEffect(() => {
    if (!mapContainer.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: WEDDING_HALL_POSITION,
      zoom: 17,
    })

    // Add marker
    new mapboxgl.Marker().setLngLat(WEDDING_HALL_POSITION).addTo(map.current)

    return () => {
      map.current?.remove()
    }
  }, []) // Empty dependency array ensures this runs once

  return (
    <div className="map-wrapper" style={{ width: "100%", height: "400px" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
    </div>
  )
}

const NavigationButtons: React.FC = () => {
  const checkDevice = (): "ios" | "android" | "other" => {
    const userAgent = window.navigator.userAgent
    if (/iPhone|iPod|iPad/i.test(userAgent)) {
      return "ios"
    } else if (/Android/i.test(userAgent)) {
      return "android"
    } else {
      return "other"
    }
  }

  const handleGoogleMaps = () => {
    window.open(GOOGLE_MAPS_URL, "_blank")
  }

  return (
    <div
      className="navigation"
      style={{
        display: "flex",
        gap: "10px",
        marginTop: "10px",
      }}
    >
      <button
        onClick={handleGoogleMaps}
        style={buttonStyle}
        aria-label="បើកមើលទីតាំងក្នុង Google Maps"
      >
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij48cGF0aCBmaWxsPSIjMUE3M0U4IiBkPSJNNDQuNSAyMC4yNWMwLTEuMzEtLjExLTIuNTctLjMyLTMuNzlIMjR2Ny4xNWgxMS41M2MtLjUyIDIuNzUtMi4xIDUuMTEtNC40NyA2LjY3djUuNTJoNy4yYzQuMjMtMy44OCA2LjY3LTkuNiA2LjY3LTE2LjA4eiIvPjxwYXRoIGZpbGw9IiMzNEE4NTMiIGQ9Ik0yNCA0NGM2LjAyIDAgMTEuMDctMS45NyAxNC43NS01LjI3bC03LjItNS41OGMtMi4wMiAxLjM0LTQuNTggMi4xMy03LjU1IDIuMTMtNS44MSAwLTEwLjcyLTMuOTItMTIuNDgtOS4ySDQuNTF2NS43N0M4LjEyIDM5LjMgMTUuNTMgNDQgMjQgNDR6Ii8+PHBhdGggZmlsbD0iI0ZCQkMwNSIgZD0iTTExLjUyIDI2LjI4Yy0uNDQtMS4zNi0uNjktMi44MS0uNjktNC4yOHMuMjUtMi45Mi42OS00LjI4VjExLjk1SDQuNTFDMi45MSAxNS43NyAyIDE5Ljc5IDIgMjRzLjkxIDguMjMgMi41MSAxMi4wNWw5LjAxLTUuNzd6Ii8+PHBhdGggZmlsbD0iI0VBNDMzNSIgZD0iTTI0IDEwLjcxYzMuMjggMCA2LjIyIDEuMTMgOC41MyAzLjMzbDYuNCAtNi40QzM0Ljk0IDMuNyAyOS45MyAyIDI0IDIgMTUuNTMgMiA4LjEyIDYuNyA0LjUxIDExLjk1bDkuMDEgNS43N2MxLjc2LTUuMjggNi42Ny05LjIgMTIuNDgtOS4yeiIvPjwvc3ZnPg=="
          alt="Google Maps Icon"
          style={{ width: "24px", height: "24px", marginRight: "8px" }}
        />
        Google Maps
      </button>
    </div>
  )
}

// Define a common button style to avoid repetition
const buttonStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px 12px",
  backgroundColor: "#f0f0f0",
  border: "1px solid #c2a11d",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  color: "#c2a11d",
  fontWeight: "bold",
  transition: "background-color 0.3s ease",
}

export const Map: React.FC = () => {
  if (!mapboxgl.accessToken) {
    return <div>Map is not available - Mapbox token is required</div>
  }

  return (
    <>
      <MapboxMap />
      <NavigationButtons />
    </>
  )
}
