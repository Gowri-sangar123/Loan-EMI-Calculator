import React from 'react'
import {
  Alert,
  AlertTitle,
  Button,
  Container,
  Paper,
  Typography,
} from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const ErrorMessage = ({ error, resetErrorBoundary }) => (
  <Container
    maxWidth="sm"
    style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
  >
    <Paper elevation={3} style={{ padding: 24, width: '100%' }}>
      <Alert
        severity="error"
        icon={<ErrorOutlineIcon fontSize="inherit" />}
        style={{ marginBottom: 16 }}
      >
        <AlertTitle>Something went wrong</AlertTitle>
        <Typography variant="body2" style={{ fontFamily: 'monospace' }}>
          {error.message}
        </Typography>
      </Alert>
      <Button variant="contained" color="primary" onClick={resetErrorBoundary}>
        Try Again
      </Button>
    </Paper>
  </Container>
)

export default ErrorMessage
