import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Slider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Box,
} from '@mui/material'
import { useEmiCalculator } from '@/Hooks/useEmiCalculator'
import { useCurrency } from '@/Context/CurrencyContext'
import { useTheme } from '@mui/material/styles'

const LoanCalculator = () => {
  const theme = useTheme()

  const {
    loanDetails,
    setLoanDetails,
    emi,
    totalPayment,
    totalInterest,
    isValid,
    errorMessage,
  } = useEmiCalculator()

  const {
    baseCurrency,
    setBaseCurrency,
    availableCurrencies,
    convertAmount,
    isLoading,
  } = useCurrency()

  const handleInputChange = (e, field) => {
    const value = parseFloat(e.target.value)
    setLoanDetails({ ...loanDetails, [field]: isNaN(value) ? 0 : value })
  }

  const handleSliderChange = (value, field) => {
    setLoanDetails({ ...loanDetails, [field]: value })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: baseCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: 'auto',
        boxShadow: 3,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <CardHeader
        title="Loan EMI Calculator"
        sx={{ textAlign: 'center', color: theme.palette.text.primary }}
      />
      <CardContent>
        {/* Currency Selection */}
        <Box mb={3}>
          <FormControl fullWidth>
            <InputLabel>Currency</InputLabel>
            <Select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
              label="Currency"
              sx={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
              }}
            >
              {availableCurrencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select your currency</FormHelperText>
          </FormControl>
        </Box>

        {/* Loan Amount Input */}
        <Box mb={3}>
          <Typography variant="body2" gutterBottom>
            Loan Amount
          </Typography>
          <TextField
            type="number"
            fullWidth
            label="Principal"
            value={loanDetails.principal}
            onChange={(e) => handleInputChange(e, 'principal')}
            InputProps={{
              endAdornment: (
                <Typography variant="body2">
                  {formatCurrency(loanDetails.principal)}
                </Typography>
              ),
            }}
            sx={{ marginBottom: 2 }}
          />
          <Slider
            value={loanDetails.principal}
            min={1000}
            max={10000000}
            step={1000}
            onChange={(e, value) => handleSliderChange(value, 'principal')}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => formatCurrency(value)}
          />
        </Box>

        {/* Interest Rate Input */}
        <Box mb={3}>
          <Typography variant="body2" gutterBottom>
            Interest Rate (%)
          </Typography>
          <TextField
            type="number"
            fullWidth
            label="Interest Rate"
            value={loanDetails.interestRate}
            onChange={(e) => handleInputChange(e, 'interestRate')}
            InputProps={{
              endAdornment: (
                <Typography variant="body2">
                  {loanDetails.interestRate.toFixed(2)}%
                </Typography>
              ),
            }}
            sx={{ marginBottom: 2 }}
          />
          <Slider
            value={loanDetails.interestRate}
            min={0.1}
            max={30}
            step={0.1}
            onChange={(e, value) => handleSliderChange(value, 'interestRate')}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value.toFixed(2)}%`}
          />
        </Box>

        {/* Loan Duration Input */}
        <Box mb={3}>
          <Typography variant="body2" gutterBottom>
            Loan Duration (months)
          </Typography>
          <TextField
            type="number"
            fullWidth
            label="Duration (Months)"
            value={loanDetails.durationMonths}
            onChange={(e) => handleInputChange(e, 'durationMonths')}
            InputProps={{
              endAdornment: (
                <Typography variant="body2">
                  {Math.floor(loanDetails.durationMonths / 12)} years{' '}
                  {loanDetails.durationMonths % 12} months
                </Typography>
              ),
            }}
            sx={{ marginBottom: 2 }}
          />
          <Slider
            value={loanDetails.durationMonths}
            min={1}
            max={360}
            step={1}
            onChange={(e, value) => handleSliderChange(value, 'durationMonths')}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value} months`}
          />
        </Box>

        {/* Error Message */}
        {errorMessage && (
          <Box
            mb={3}
            sx={{
              backgroundColor: theme.palette.error.light,
              padding: 2,
              borderRadius: 1,
            }}
          >
            <Typography color="error">{errorMessage}</Typography>
          </Box>
        )}

        {/* Results Section */}
        <Box
          mt={4}
          sx={{
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            padding: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Loan Summary
          </Typography>

          {isLoading ? (
            <Typography align="center">Loading currency data...</Typography>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 2,
              }}
            >
              {[
                {
                  label: 'Monthly Payment (EMI)',
                  value: isValid ? formatCurrency(emi) : 'N/A',
                },
                {
                  label: 'Total Payment',
                  value: isValid ? formatCurrency(totalPayment) : 'N/A',
                },
                {
                  label: 'Total Interest',
                  value: isValid ? formatCurrency(totalInterest) : 'N/A',
                },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    padding: 2,
                    borderRadius: 1,
                    boxShadow: 1,
                  }}
                >
                  <Typography variant="body2">{item.label}</Typography>
                  <Typography variant="h6">{item.value}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default LoanCalculator
