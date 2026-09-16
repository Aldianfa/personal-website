import { Link, useLocation } from 'react-router-dom'

function NavBar() {
  const location = useLocation()
  const linkBase = 'rounded-full px-3 py-2 font-semibold transition duration-300 ease-out md:px-4'
  const mutedLink = `${linkBase} text-ink/45 hover:bg-white/45 hover:text-ink`
  const activeLink = `${linkBase} flex items-center gap-2 bg-white/55 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_8px_24px_rgba(29,29,31,0.08)]`
  const activeItem = location.pathname === '/about'
    ? 'about'
    : location.pathname.startsWith('/story')
      ? 'work'
      : location.hash === '#work'
        ? 'work'
        : 'home'
  const workLink = `${linkBase} flex items-center gap-2 ${
    activeItem === 'work'
      ? 'bg-white/55 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_8px_24px_rgba(29,29,31,0.08)]'
      : 'text-ink/45 hover:bg-white/45 hover:text-ink'
  }`

  return (
    <header className="sticky top-3 z-20 flex justify-center px-3 md:top-4">
      <nav className="relative flex w-fit items-center gap-1 overflow-hidden rounded-full border border-white/55 bg-white/35 p-1 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_18px_50px_rgba(29,29,31,0.14)] backdrop-blur-2xl">
        <span className="pointer-events-none absolute inset-x-3 top-0 h-px bg-white/80" />
        <Link
          to="/"
          className={activeItem === 'home' ? activeLink : mutedLink}
        >
          Home
        </Link>

        <a
          href="/about"
          className={activeItem === 'about' ? activeLink : mutedLink}
        >
          About
        </a>
        <a
          href="/#work"
          className={workLink}
        >
          <span className="block h-2 w-2 rounded-full bg-red-500" />
          Work
        </a>
        <a
          href="mailto:hi@example.com"
          className={mutedLink}
        >
          Contact
        </a>
      </nav>
    </header>
  )
}

export default NavBar
