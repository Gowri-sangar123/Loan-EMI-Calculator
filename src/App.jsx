import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Index from './Pages/Index'
import ExchangeRatesPage from './Pages/ExchangeRatesPage'
import NotFound from './Pages/NotFound'
import ErrorMessage from './Components/ErrorMessage'
import { ErrorBoundary } from 'react-error-boundary'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorMessage}>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/exchange-rates" element={<ExchangeRatesPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </ErrorBoundary>
    </QueryClientProvider>
  )
}

export default App
