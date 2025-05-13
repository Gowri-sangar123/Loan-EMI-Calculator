import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import Index from './Pages/Index'
import ExchangeRatesPage from './Pages/ExchangeRatesPage'
import NotFound from './Pages/NotFound'
import ErrorMessage from './Components/ErrorMessage'
import { ErrorBoundary } from 'react-error-boundary'

// ✅ Your custom ThemeContext
import { useThemeContext } from '@/Context/ThemeContext'

const queryClient = new QueryClient()

const App = () => {
  const { mode } = useThemeContext()

  // ✅ Apply the mode to MUI's theme
  const muiTheme = createTheme({
    palette: {
      mode, // This will enable light or dark mode globally
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorMessage}>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline /> {/* ✅ Applies the background color */}
          <Box display="flex" flexDirection="column" minHeight="100vh">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/exchange-rates" element={<ExchangeRatesPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </Box>
        </ThemeProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  )
}

export default App
