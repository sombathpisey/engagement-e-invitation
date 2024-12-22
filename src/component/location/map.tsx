import React from "react"

const WEDDING_HALL_POSITION: [number, number] = [104.8379652, 11.4980323]
const GOOGLE_MAPS_URL =
  "https://www.google.com/maps?q=FRWR+XG+VannaraHour,+Phnom+Penh&output=embed"

const EmbeddedMap: React.FC = () => {
  return (
    <div className="map-wrapper" style={{ width: "100%", height: "400px" }}>
      <iframe
        src={GOOGLE_MAPS_URL}
        style={{ width: "100%", height: "100%", border: "0" }}
        allowFullScreen
        loading="lazy"
        title="Wedding Hall Location"
      ></iframe>
    </div>
  )
}

const NavigationButtons: React.FC = () => {
  const handleGoogleMaps = () => {
    window.open(
      "https://www.google.com/maps?q=FRWR+XG+VannaraHour,+Phnom+Penh",
      "_blank",
    )
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
        aria-label="Open location in Google Maps"
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
  return (
    <>
      <EmbeddedMap />
      <NavigationButtons />
    </>
  )
}
