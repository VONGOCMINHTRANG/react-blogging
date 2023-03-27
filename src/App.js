import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import React from 'react'
import MainRoutes from 'routes/main'
import { ThemeProvider } from 'contexts/theme-context'

function App() {
  return (
    <>
      <MainRoutes></MainRoutes>
    </>
  )
}

export default App
