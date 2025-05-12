import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import { Moon, Sun, Menu as MenuIcon, X } from 'lucide-react'
// Fixing the import to match the exported hook name
import { useThemeContext } from '@/Context/ThemeContext'

const Header = () => {
  const { mode, toggleMode } = useThemeContext() // Correct hook usage
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" color="primary">
            Loan Calculator
          </Typography>
        </Link>

        {/* Desktop Navigation */}
        <div
          style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}
        >
          <Link
            to="/"
            style={{
              marginRight: '20px',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Button color="inherit">Calculator</Button>
          </Link>
          <Link
            to="/exchange-rates"
            style={{
              marginRight: '20px',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Button color="inherit">Exchange Rates</Button>
          </Link>
          <Button onClick={toggleMode} color="inherit">
            {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button onClick={toggleMode} color="inherit">
            {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </Button>
          <IconButton onClick={toggleMobileMenu} color="inherit">
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </IconButton>
        </div>
      </Toolbar>

      {/* Mobile Menu */}
      <Menu
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <MenuItem onClick={() => setMobileMenuOpen(false)}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Calculator
          </Link>
        </MenuItem>
        <MenuItem onClick={() => setMobileMenuOpen(false)}>
          <Link
            to="/exchange-rates"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Exchange Rates
          </Link>
        </MenuItem>
      </Menu>
    </AppBar>
  )
}

export default Header
