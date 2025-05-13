import React from 'react'
import { Box, Typography, Link } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const Footer = () => {
  const theme = useTheme()

  return (
    <footer
      style={{
        marginTop: 'auto',
        padding: '24px 0',
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.primary,
      }}
    >
      <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Footer Text */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'center' }}
          >
            &copy; {new Date().getFullYear()} Loan Calculator App
          </Typography>

          {/* ExchangeRate-API */}
          <Box sx={{ marginTop: { xs: '16px', md: '0' } }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: 'center' }}
            >
              Exchange rates provided by{' '}
              <Link
                href="https://www.exchangerate-api.com"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                underline="hover"
              >
                ExchangeRate-API
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </footer>
  )
}

export default Footer
