import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LoanCalculator from '@/components/LoanCalculator'
import AmortizationSchedule from '@/components/AmortizationSchedule'
import { ThemeProvider } from '../Context/ThemeContext'
import { CurrencyProvider } from '../Context/CurrencyContext'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorMessage from '../Components/ErrorMessage'

import { Container, Grid, Box } from '@mui/material'

const Index = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorMessage}>
      <ThemeProvider>
        <CurrencyProvider>
          <Box display="flex" flexDirection="column" minHeight="100vh">
            <Header />
            <Box component="main" flexGrow={1} py={4}>
              <Container>
                <Grid container spacing={4}>
                  <Grid item xs={12} lg={6}>
                    <LoanCalculator />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <AmortizationSchedule />
                  </Grid>
                </Grid>
              </Container>
            </Box>
            <Footer />
          </Box>
        </CurrencyProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default Index
