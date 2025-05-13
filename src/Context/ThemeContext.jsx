// src/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('theme-mode')
    if (saved === 'light' || saved === 'dark') {
      return saved
    }

    // ✅ Force dark as default
    return 'dark'
  })

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    localStorage.setItem('theme-mode', mode)
  }, [mode])

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext must be used inside ThemeProvider')
  }
  return context
}
