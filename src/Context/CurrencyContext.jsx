import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

// Create context
const CurrencyContext = createContext()

export const CurrencyProvider = ({
  children,
  apiKey = '48d8ded2aa035192ff096d21',
}) => {
  const [baseCurrency, setBaseCurrency] = useState('USD')
  const [availableCurrencies, setAvailableCurrencies] = useState([])
  const [exchangeRates, setExchangeRates] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch exchange rates when base currency changes
  useEffect(() => {
    const fetchExchangeRates = async () => {
      if (!apiKey) {
        setError('API key is missing')
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`
        )

        if (response.data.result === 'success') {
          setExchangeRates(response.data.conversion_rates)
          setAvailableCurrencies(Object.keys(response.data.conversion_rates))
        } else {
          setError('Failed to fetch exchange rates.')
        }
      } catch (err) {
        setError('Unable to fetch rates. Using demo data.')
        const demoRates = {
          USD: 1,
          EUR: 0.85,
          GBP: 0.75,
          JPY: 110.5,
          CAD: 1.25,
          AUD: 1.35,
          INR: 74.5,
        }
        setExchangeRates(demoRates)
        setAvailableCurrencies(Object.keys(demoRates))
      } finally {
        setIsLoading(false)
      }
    }

    fetchExchangeRates()
  }, [baseCurrency, apiKey])

  // Convert amount from base to selected currency
  const convertAmount = (amount, toCurrency) => {
    if (!exchangeRates[toCurrency]) return 0
    return amount * exchangeRates[toCurrency]
  }

  return (
    <CurrencyContext.Provider
      value={{
        baseCurrency,
        setBaseCurrency,
        availableCurrencies,
        exchangeRates,
        isLoading,
        error,
        convertAmount,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

// Custom hook
export const useCurrency = () => {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}
