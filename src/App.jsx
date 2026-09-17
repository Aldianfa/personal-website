import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import About from './pages/About'
import AboutBento from './pages/AboutBento'
import StoryDetail from './pages/StoryDetail'
import PageTransition from './components/PageTransition'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes location={location}>
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
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/about-bento"
          element={
            <PageTransition key="about-bento">
              <AboutBento />
            </PageTransition>
          }
        />
        <Route
          path="/about-v2"
          element={
            <PageTransition key="about-v2">
              <AboutBento />
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
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App
