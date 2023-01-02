// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import DonationForm from './DonationForm'
import {
  AppBar,
  Box,
  Container,
  Link,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://ballardelks.org/">
        Ballard Elks
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

function App() {
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">Elks Membership and Donations</Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container>
          <Box my={4}>
            <Paper style={{ padding: 25 }}>
              <DonationForm />
            </Paper>
          </Box>
        </Container>
      </main>
      <footer>
        <Typography
          variant="body2"
          align="center"
          color="textSecondary"
          component="p"
        >
          Form programming by lodge member{' '}
          <Link href="https://www.ivanstorck.com">Ivan Storck</Link>
          <Copyright />
        </Typography>
      </footer>
    </React.Fragment>
  )
}

export default App
