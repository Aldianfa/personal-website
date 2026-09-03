import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
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