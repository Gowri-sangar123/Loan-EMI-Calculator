import React from 'react'
import { ThemeProvider } from '@/Context/ThemeContext'
import { CurrencyProvider } from '@/Context/CurrencyContext'
import { ErrorBoundary } from 'react-error-boundary'
import { Box, Container } from '@mui/material'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ExchangeRates from '@/components/ExchangeRates'
import ErrorMessage from '../Components/ErrorMessage'

const ExchangeRatesPage = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorMessage}>
      <ThemeProvider>
        <CurrencyProvider>
          <Box display="flex" flexDirection="column" minHeight="100vh">
            <Header />
            <Box component="main" flexGrow={1} py={8}>
              <Container maxWidth="lg">
                <ExchangeRates />
              </Container>
            </Box>
            <Footer />
          </Box>
        </CurrencyProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default ExchangeRatesPage
