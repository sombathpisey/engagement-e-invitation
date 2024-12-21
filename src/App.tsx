import React, { useState, useEffect } from "react"
import "./App.scss"
import { BGEffect } from "./component/bgEffect"
import { Cover } from "./component/cover"
import { Invitation } from "./component/invitation"
import { Calendar } from "./component/calendar"
import { Gallery } from "./component/gallery"
import { Location } from "./component/location"
import { Information } from "./component/information"
import { GuestBook } from "./component/guestbook"
import { LazyDiv } from "./component/lazyDiv"
import { ShareButton } from "./component/shareButton"
import weddingCover from "./image/wedding_cover.jpeg"

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isOpening, setIsOpening] = useState(false)

  const handleOpenClick = () => {
    setIsOpening(true)
    // Wait for the envelope opening animation to complete
    setTimeout(() => {
      setIsLoaded(true)
    }, 2000)
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
                className="invitation-image"
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

          {/* <LazyDiv className="card-group">
            <Location />
          </LazyDiv>

          <LazyDiv className="card-group">
            <Information />
            <GuestBook />
          </LazyDiv> */}

          {/* <ShareButton /> */}
        </div>
      )}
    </div>
  )
}

export default App
