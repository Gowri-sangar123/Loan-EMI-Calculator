import React from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Typography, Box, Paper } from '@mui/material'
import { Link } from 'react-router-dom'
import { ThemeProvider } from '@/Context/ThemeContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const NotFound = () => {
  const location = useLocation()

  React.useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname
    )
  }, [location.pathname])

  return (
    <ThemeProvider>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        <Box
          component="main"
          display="flex"
          justifyContent="center"
          alignItems="center"
          py={4}
        >
          <Box maxWidth="md" width="100%" textAlign="center">
            <Typography variant="h1" fontWeight="bold" color="primary" mb={4}>
              404
            </Typography>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: 'background.paper',
                p: 4,
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" mb={2}>
                Oops! Page not found
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={4}>
                The page you are looking for might have been removed or is
                temporarily unavailable.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/"
              >
                Return to Home
              </Button>
            </Paper>
          </Box>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default NotFound
