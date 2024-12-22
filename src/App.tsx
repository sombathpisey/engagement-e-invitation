import React, { useState } from "react"
import "./App.scss"
import { BGEffect } from "./component/bgEffect"
import weddingCover from "./image/wedding_cover.jpeg"
import { Cover } from "./component/cover"
import { Invitation } from "./component/invitation"
import { Calendar } from "./component/calendar"
import { Gallery } from "./component/gallery"
import { Location } from "./component/location"
import { LazyDiv } from "./component/lazyDiv"

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [isFading, setIsFading] = useState(false)

  const handleOpenClick = () => {
    setIsOpening(true)
    // Trigger the fade-in animation
    setTimeout(() => {
      setIsFading(true)
      setTimeout(() => {
        setIsLoaded(true)
      }, 1000) // Match the duration of the fade-in animation
    }, 2000) // Wait for the envelope animation to complete
  }

  return (
    <div className="background">
      <BGEffect />
      {!isLoaded ? (
        <div className="loading-screen">
          <div className={`envelope ${isOpening ? "envelope-open" : ""}`}>
            <div className="envelope-flap" />
            <div className="envelope-content">
              <img
                src={weddingCover}
                alt="Wedding Invitation"
                className={`invitation-image ${isFading ? "fade-in" : ""}`}
              />
            </div>
          </div>
          {!isOpening && (
            <button
              className="load-button"
              onClick={handleOpenClick}
              aria-label="Open Invitation"
            >
              បើកធៀប
            </button>
          )}
        </div>
      ) : (
        <div className="card-view">
          <LazyDiv className="card-group">
            <Cover />
            <Invitation />
          </LazyDiv>

          <LazyDiv className="card-group">
            <Calendar />
            <Gallery />
          </LazyDiv>

          <LazyDiv className="card-group">
            <Location />
          </LazyDiv>
        </div>
      )}
    </div>
  )
}

export default App
