import { useState } from 'react'

const albumUrl =
  'https://www.icloud.com/sharedalbum/id-id/#D2Gv3lNDLK6f_rNxs9ODewL7SmQCAEQARogkrnSeWCyWOQ27b1dcFg8QeYRg00T9E0rPkPf4pEdS_Q'

const mediaList = [
  {
    url: '/photos/icloud/icloud1.jpeg',
    type: 'photo',
    title: 'Focus & Engineering',
    category: 'Clinical Systems',
  },
  {
    url: '/photos/icloud/icloud2.jpeg',
    type: 'photo',
    title: 'Architecture & Craft',
    category: 'Backend Design',
  },
  {
    url: '/photos/icloud/icloud3.jpeg',
    type: 'photo',
    title: 'Exploration & Growth',
    category: 'Tech Showcase',
  },
  {
    url: '/photos/icloud/icloud4.jpeg',
    type: 'photo',
    title: 'Collaborative Building',
    category: 'Team Milestones',
  },
  {
    url: '/photos/icloud/icloud5.jpeg',
    type: 'photo',
    title: 'Daily Milestones',
    category: 'Workflows & UI',
  },
  {
    url: '/photos/icloud/icloud6.jpeg',
    type: 'photo',
    title: 'Moments Beyond Code',
    category: 'Travel & Nature',
  },
  {
    url: '/photos/icloud/icloud7.jpeg',
    type: 'photo',
    title: 'Future Horizons',
    category: 'Reflections',
  },
]

function ApplePhotosIcon({ className = 'w-10 h-10' }) {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 48 48">
      <rect width="48" height="48" rx="12" fill="white" />
      {[
        '#ffb737',
        '#ffdf44',
        '#8dc74c',
        '#3aba8d',
        '#51bce4',
        '#5b8bd9',
        '#ba7bb5',
        '#f07c91',
      ].map((color, index) => (
        <ellipse
          key={color}
          cx="24"
          cy="15"
          rx="6"
          ry="10"
          fill={color}
          fillOpacity=".88"
          transform={`rotate(${index * 45} 24 24)`}
        />
      ))}
    </svg>
  )
}

export default function JourneyPhotoStack({ onReadMore }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  if (!mediaList || mediaList.length === 0) return null

  const handleNextCard = (e) => {
    e.stopPropagation()
    if (isAnimating) return
    setActiveIndex((prev) => (prev + 1) % mediaList.length)
  }

  const handleLinkClick = (e) => {
    e.stopPropagation()
    setIsAnimating(true)
    setTimeout(() => {
      window.open(albumUrl, '_blank')
      setTimeout(() => setIsAnimating(false), 500)
    }, 1000)
  }

  return (
    <section className="w-full select-none pb-6 pt-1" aria-label="Photos from my journey">
      {/* Square ApplePhotosCard Stack Structure - Sized so rotation never overlaps adjacent tiles or bottom card */}
      <div className="relative w-full max-w-[250px] sm:max-w-[260px] aspect-square mx-auto cursor-pointer group perspective-1000 flex items-center justify-center">
        {mediaList.map((media, idx) => {
          const len = mediaList.length
          const relIdx = (idx - activeIndex + len) % len

          // Only show top 3 cards
          if (relIdx > 2) return null

          const isActive = relIdx === 0

          let transformClass = ''
          let zIndex = ''
          let opacity = 'opacity-100'

          if (isActive) {
            transformClass = 'rotate-0 translate-x-0 translate-y-0 scale-100 shadow-xl'
            zIndex = 'z-30'
          } else if (relIdx === 1) {
            transformClass =
              'rotate-[3.5deg] translate-x-3 translate-y-2 scale-[0.96] shadow-md brightness-90'
            zIndex = 'z-20'
          } else if (relIdx === 2) {
            transformClass =
              'rotate-[7deg] translate-x-6 translate-y-4 scale-[0.92] shadow-sm brightness-75'
            zIndex = 'z-10'
          }

          return (
            <div
              key={idx}
              className={`absolute inset-0 rounded-[2rem] overflow-hidden border-2 border-white/50 bg-white/20 backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${transformClass} ${zIndex} ${opacity} ${
                isActive && isAnimating ? 'bg-white scale-95' : 'hover:-translate-y-1.5'
              }`}
              onClick={handleNextCard}
            >
              {/* Media rendering (Video or Image) */}
              {media.type === 'video' ? (
                <video
                  src={media.url}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay={isActive}
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={media.url}
                  alt={media.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  decoding="async"
                />
              )}

              {/* Gradient overlay on all cards to make text/logos pop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none transition-opacity duration-300" />

              {/* Apple Photos Logo on active card */}
              {isActive && (
                <>
                  <div className="absolute top-3.5 left-3.5 p-2 rounded-2xl flex items-center justify-center z-20 bg-white/20 backdrop-blur-md border border-white/30 shadow-sm">
                    <ApplePhotosIcon className="w-8 h-8 object-contain drop-shadow-md rounded-xl" />
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 z-20 pointer-events-none flex justify-between items-end">
                    <div>
                      <h3 className="font-bold text-white text-base leading-tight mb-0.5">
                        {media.title}
                      </h3>
                      <p className="text-gray-300 text-[11px] font-medium uppercase tracking-wider">
                        {media.category}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleLinkClick}
                      className="bg-white/20 backdrop-blur-md hover:bg-white/40 border border-white/50 text-white p-2 rounded-full pointer-events-auto transition-colors shadow-lg cursor-pointer"
                      aria-label="Open iCloud Album"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                      </svg>
                    </button>
                  </div>

                  {/* Full-screen Animation Layer */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center bg-[#ffffff] transition-all duration-2000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isAnimating ? 'z-30 opacity-100' : '-z-10 opacity-0 pointer-events-none'
                    }`}
                    style={{
                      clipPath: isAnimating
                        ? 'circle(150% at 0% 0%)'
                        : 'circle(0% at 0% 0%)',
                    }}
                  >
                    <div
                      className={`transform transition-all duration-800 delay-300 ${
                        isAnimating
                          ? 'scale-100 opacity-100 rotate-0'
                          : 'scale-50 opacity-0 -rotate-45'
                      }`}
                    >
                      <ApplePhotosIcon className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-2xl rounded-3xl" />
                    </div>
                  </div>
                </>
              )}

              {/* Dim background cards slightly more via an overlay */}
              {!isActive && (
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}







