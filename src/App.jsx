import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import PageTransition from './components/PageTransition'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const AboutBento = lazy(() => import('./pages/AboutBento'))
const Stories = lazy(() => import('./pages/Stories'))
const Work = lazy(() => import('./pages/Work'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const StoryDetail = lazy(() => import('./pages/StoryDetail'))

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes location={location}>
        <Route path="/work/:slug" element={<PageTransition key={location.pathname}><ProjectDetail key={location.pathname} /></PageTransition>} />
        <Route path="/work" element={<PageTransition key="work"><Work /></PageTransition>} />
        <Route
          path="/"
          element={
            <PageTransition key="home">
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition key="about">
              <AboutBento />
            </PageTransition>
          }
        />
        <Route path="/about-bento" element={<Navigate to={`/about${location.search}${location.hash}`} replace />} />
        <Route path="/about-v2" element={<Navigate to={`/about${location.search}${location.hash}`} replace />} />
        <Route
          path="/about-scroll"
          element={
            <PageTransition key="about-scroll">
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/stories"
          element={
            <PageTransition key="stories">
              <Stories />
            </PageTransition>
          }
        />
        <Route
          path="/story/:slug"
          element={
            <PageTransition key={location.pathname}>
              <StoryDetail />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div role="status" className="flex min-h-screen items-center justify-center bg-paper text-sm text-muted">Loading page...</div>}>
      <AnimatedRoutes />
      </Suspense>
    </BrowserRouter>
  )
}

export default App
