import { useState, useMemo } from 'react'

export const useEmiCalculator = () => {
  // Default loan values
  const [loan, setLoan] = useState({
    principal: 100000, // Total loan amount
    interestRate: 5.0, // Annual interest rate in %
    durationMonths: 60, // Duration in months
  })

  // Input validation
  const isValid = useMemo(() => {
    return (
      loan.principal > 0 && loan.interestRate > 0 && loan.durationMonths > 0
    )
  }, [loan])

  // Error message (if any)
  const errorMessage = useMemo(() => {
    if (loan.principal <= 0)
      return 'Principal amount must be greater than zero.'
    if (loan.interestRate <= 0)
      return 'Interest rate must be greater than zero.'
    if (loan.durationMonths <= 0) return 'Duration must be greater than zero.'
    return null
  }, [loan])

  // EMI Calculation
  const emi = useMemo(() => {
    if (!isValid) return 0

    const P = loan.principal
    const r = loan.interestRate / 12 / 100 // Monthly interest rate
    const n = loan.durationMonths

    if (r === 0) return P / n

    // EMI formula: [P × r × (1 + r)^n] / [(1 + r)^n – 1]
    const emiValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    return emiValue
  }, [loan, isValid])

  // Total amount paid over time
  const totalPayment = useMemo(
    () => emi * loan.durationMonths,
    [emi, loan.durationMonths]
  )

  // Total interest paid
  const totalInterest = useMemo(
    () => totalPayment - loan.principal,
    [totalPayment, loan.principal]
  )

  // Amortization schedule (monthly breakdown)
  const amortizationSchedule = useMemo(() => {
    if (!isValid || emi === 0) return []

    const schedule = []
    let balance = loan.principal
    const monthlyRate = loan.interestRate / 12 / 100

    for (let month = 1; month <= loan.durationMonths; month++) {
      const interest = balance * monthlyRate
      const principalPart = emi - interest
      balance -= principalPart

      schedule.push({
        month,
        emi: parseFloat(emi.toFixed(2)),
        principal: parseFloat(principalPart.toFixed(2)),
        interest: parseFloat(interest.toFixed(2)),
        balance: parseFloat(Math.max(0, balance).toFixed(2)),
      })
    }

    return schedule
  }, [loan, emi, isValid])

  return {
    loanDetails: loan,
    setLoanDetails: setLoan,
    emi: parseFloat(emi.toFixed(2)),
    totalPayment: parseFloat(totalPayment.toFixed(2)),
    totalInterest: parseFloat(totalInterest.toFixed(2)),
    amortizationSchedule,
    isValid,
    errorMessage,
  }
}
