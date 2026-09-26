import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useReducedMotion } from 'framer-motion'
import './SpotifyCard.css'

const PLAYLIST_URL = 'https://open.spotify.com/playlist/1KdCXPeN2qTVOjTCWRfZVr'
const EMBED_URL = 'https://open.spotify.com/embed/playlist/1KdCXPeN2qTVOjTCWRfZVr?utm_source=generator&theme=0&si=8019cc2042a34afa'

function SpotifyIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><circle cx="12" cy="12" r="12" /><g fill="none" stroke="white" strokeLinecap="round"><path d="M5 9c4-2 10-1.5 14 1" strokeWidth="1.8" /><path d="M6 12.5c3.5-1.5 8-1 11 1" strokeWidth="1.6" /><path d="M7 16c3-1 6-.5 9 1" strokeWidth="1.4" /></g></svg>
}

export default function SpotifyCard() {
  const dialogRef = useRef(null)
  const triggerRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  function showPlayer() {
    setLoaded(true)
    setOpen(true)
    dialogRef.current.showModal()
  }

  return (
    <>
      <section aria-label="Spotify playlist" className="spotify-tile">
        <div className="spotify-tile-label"><SpotifyIcon /><span>Spotify</span><span className="spotify-tile-note">On repeat</span></div>
        <div className="spotify-tile-main">
          <div className="spotify-record" aria-hidden="true"><span /></div>
          <div><h2>My daily rotation.</h2><p>A soundtrack for your stay.</p></div>
        </div>
        <div className="spotify-tile-bottom">
          <span>Picked by Izzul</span>
          <motion.button ref={triggerRef} type="button" onClick={showPlayer} aria-haspopup="dialog" aria-expanded={open} aria-controls="spotify-player-dialog" whileHover={reduceMotion ? undefined : { scale: 1.04 }} whileTap={reduceMotion ? undefined : { scale: 0.96 }} className="spotify-listen">
            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M3 1.5 10 6l-7 4.5z" /></svg> Listen
          </motion.button>
        </div>
      </section>
      {createPortal(
        <dialog ref={dialogRef} id="spotify-player-dialog" aria-labelledby="spotify-player-heading" className="spotify-dialog" onClose={() => { setOpen(false); triggerRef.current?.focus() }} onClick={(event) => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close() } }}>
          <div className="spotify-dialog-heading"><div><p>Listen along</p><h2 id="spotify-player-heading">Izzul's playlist</h2></div><button type="button" onClick={() => dialogRef.current.close()} aria-label="Close Spotify player" className="spotify-close">&#215;</button></div>
          {loaded && <iframe title="Izzul's Spotify playlist player" src={EMBED_URL} width="100%" height="352" allowFullScreen style={{ border: 0, borderRadius: 12, display: 'block' }} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" />}
          <div className="spotify-dialog-footer"><span>Press Play in Spotify to listen.</span><a href={PLAYLIST_URL} target="_blank" rel="noopener noreferrer">Open Spotify <span aria-hidden="true">&#8599;</span><span className="sr-only"> (opens in a new tab)</span></a></div>
        </dialog>, document.body,
      )}
    </>
  )
}
