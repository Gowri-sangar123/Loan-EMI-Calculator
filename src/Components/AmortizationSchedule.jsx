import React, { useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Typography,
} from '@mui/material'

const AmortizationSchedule = ({
  amortizationSchedule = [],
  isValid = false,
  baseCurrency = 'USD',
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12
  const totalPages = Math.ceil(amortizationSchedule.length / itemsPerPage)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = amortizationSchedule.slice(
    indexOfFirstItem,
    indexOfLastItem
  )

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: baseCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)

  if (!isValid) {
    return (
      <Typography align="center" mt={2}>
        Enter valid loan details to view amortization schedule
      </Typography>
    )
  }

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Amortization Schedule
      </Typography>

      {amortizationSchedule.length === 0 ? (
        <Typography align="center">No data available</Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell>EMI</TableCell>
                  <TableCell>Principal</TableCell>
                  <TableCell>Interest</TableCell>
                  <TableCell>Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow key={item.month}>
                    <TableCell>{item.month}</TableCell>
                    <TableCell>{formatCurrency(item.emi)}</TableCell>
                    <TableCell>{formatCurrency(item.principal)}</TableCell>
                    <TableCell>{formatCurrency(item.interest)}</TableCell>
                    <TableCell>{formatCurrency(item.balance)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
              color="primary"
              sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
            />
          )}
        </>
      )}
    </Paper>
  )
}

export default AmortizationSchedule
