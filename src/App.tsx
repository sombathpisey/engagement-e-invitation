import React, { useState } from "react"
import "./App.scss"
import { BGEffect } from "./component/bgEffect"
import weddingCover from "./image/wedding_cover.png"
import weddingCoverTwo from "./image/wedding_cover_two.jpeg"
import { Cover } from "./component/cover"
import { Invitation } from "./component/invitation"
import { Calendar } from "./component/calendar"
import { Gallery } from "./component/gallery"
import { Location } from "./component/location"
import { LazyDiv } from "./component/lazyDiv"

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [showSecondImage, setShowSecondImage] = useState(false)

  const handleOpenClick = () => {
    setIsOpening(true)

    // Start the envelope opening animation
    setTimeout(() => {
      // Switch to second image
      setShowSecondImage(true)
      // Load main content after showing second image
      setTimeout(() => {
        setIsLoaded(true)
      }, 2000) // Show second image for 2 seconds
    }, 2000) // Wait for envelope animation
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
                src={showSecondImage ? weddingCoverTwo : weddingCover}
                alt="Wedding Invitation"
                className={`invitation-image ${showSecondImage ? "second-image" : ""}`}
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
