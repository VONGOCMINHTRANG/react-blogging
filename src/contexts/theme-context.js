import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

function ThemeProvider(props) {
  const [darkTheme, setDarkTheme] = useState(false)
  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme)
  }
  const value = { darkTheme, toggleDarkTheme }
  return <ThemeContext.Provider value={value} {...props}></ThemeContext.Provider>
}

function useTheme() {
  const context = useContext(ThemeContext)
  if (typeof context === 'undefined') {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export { ThemeProvider, useTheme }
