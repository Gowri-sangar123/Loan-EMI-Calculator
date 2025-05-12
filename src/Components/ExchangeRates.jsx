import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  CircularProgress,
  Alert,
} from '@mui/material'
import { useCurrency } from '@/Context/CurrencyContext'
import { useEmiCalculator } from '@/Hooks/useEmiCalculator'

const ITEMS_PER_PAGE = 10

const ExchangeRates = () => {
  const { baseCurrency, exchangeRates, isLoading, error } = useCurrency()
  const { emi, isValid } = useEmiCalculator()

  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCurrencies = Object.keys(exchangeRates).filter((currency) =>
    currency.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredCurrencies.length / ITEMS_PER_PAGE)
  const currentItems = filteredCurrencies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handlePageChange = (_, page) => setCurrentPage(page)

  const formatCurrency = (amount, currency) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(amount)

  const getConvertedEmi = (currency) => {
    const rate = exchangeRates[currency] || 0
    return emi * rate
  }

  return (
    <Card elevation={3}>
      <CardHeader
        title={
          <Typography variant="h5" align="center" color="primary">
            Exchange Rates (Base: {baseCurrency})
          </Typography>
        }
      />
      <CardContent>
        {error ? (
          <Alert severity="warning">{error}</Alert>
        ) : (
          <>
            <TextField
              label="Search currency"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              fullWidth
              margin="normal"
            />

            {isLoading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <CircularProgress />
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Loading exchange rates...
                </Typography>
              </div>
            ) : (
              <>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <strong>Currency</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Exchange Rate</strong>
                        </TableCell>
                        {isValid && emi > 0 && (
                          <TableCell>
                            <strong>Monthly EMI</strong>
                          </TableCell>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentItems.map((currency) => (
                        <TableRow key={currency}>
                          <TableCell>{currency}</TableCell>
                          <TableCell>{exchangeRates[currency]}</TableCell>
                          {isValid && emi > 0 && (
                            <TableCell>
                              {formatCurrency(
                                getConvertedEmi(currency),
                                currency
                              )}
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {totalPages > 1 && (
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
                  />
                )}
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default ExchangeRates
