import React from 'react'
import { IconButton } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useThemeContext } from '@/Context/ThemeContext'

const ThemeToggleButton = () => {
  const { mode, toggleMode } = useThemeContext()

  return (
    <IconButton onClick={toggleMode} color="inherit">
      {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  )
}

export default ThemeToggleButton
