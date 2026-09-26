import { useState } from 'react'
import './JourneyPhotoStack.css'

const albumUrl = 'https://www.icloud.com/sharedalbum/id-id/#D2Gv3lNDLK6f_rNxs9ODewL7SmQCAEQARogkrnSeWCyWOQ27b1dcFg8QeYRg00T9E0rPkPf4pEdS_Q'
// Add individual titles and locations here when captions are available.
const photos = Array.from({ length: 7 }, (_, index) => ({
  src: `/photos/icloud/icloud${index + 1}.jpeg`,
  title: 'Moments from my journey',
  caption: `Photo ${index + 1} of 7`,
}))

export default function JourneyPhotoStack({ onReadMore }) {
  const [activePhoto, setActivePhoto] = useState(0)
  return (
    <section className="journey-photos" aria-label="Photos from my journey">
      <div className="journey-stack">
        {photos.map((photo, index) => {
          const position = (index - activePhoto + photos.length) % photos.length
          return <div key={photo.src} className="journey-photo" data-position={position} aria-hidden="true" style={{ visibility: position > 2 ? 'hidden' : 'visible', zIndex: position > 2 ? 0 : 30 - position * 10 }}>
            <img src={photo.src} alt="" decoding="async" />
            {position === 0 && <div className="journey-photo-caption"><h3>{photo.title}</h3><p>{photo.caption}</p></div>}
          </div>
        })}
        <button type="button" className="journey-next" aria-label="Show next photo" onClick={() => setActivePhoto((value) => (value + 1) % photos.length)} />
        <a className="journey-album" href={albumUrl} target="_blank" rel="noopener noreferrer" aria-label="Open shared iCloud photo album (opens in a new tab)">
          <svg aria-hidden="true" viewBox="0 0 48 48" width="40" height="40"><rect width="48" height="48" rx="10" fill="white" />{['#ffb737', '#ffdf44', '#8dc74c', '#3aba8d', '#51bce4', '#5b8bd9', '#ba7bb5', '#f07c91'].map((color, index) => <ellipse key={color} cx="24" cy="15" rx="6" ry="10" fill={color} fillOpacity=".85" transform={`rotate(${index * 45} 24 24)`} />)}</svg>
        </a>
      </div>
      <div className="journey-photo-controls"><p aria-live="polite">{activePhoto + 1} / {photos.length} <span>· Click photo to explore</span></p><button type="button" onClick={onReadMore}>About me &#8599;</button></div>
    </section>
  )
}
