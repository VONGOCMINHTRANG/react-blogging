import { useEffect } from 'react'
import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

function ThemeProvider(props) {
  const [darkTheme, setDarkTheme] = useState(false)
  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme)
    localStorage.setItem('theme', !darkTheme ? 'dark' : 'light')
  }

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setDarkTheme(true)
    } else {
      setDarkTheme(false)
    }
  }, [])

  const value = { darkTheme, setDarkTheme, toggleDarkTheme }
  return <ThemeContext.Provider value={value} {...props}></ThemeContext.Provider>
}

function useDarkTheme() {
  const context = useContext(ThemeContext)
  if (typeof context === 'undefined') {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export { ThemeProvider, useDarkTheme }
