import React from 'react'
import Box from '@mui/material/Box';

import SearchNavbar from './component/SearchNavbar'

function App() {

  return (
    <Box
        sx={{
          width: '100vw',
          height: '100vh',
        }}
      >
      <SearchNavbar />
      <Box display="flex" justifyContent="center" pt={3}>
        <Box
          display="grid"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="70vh"
        >
          Welcome... !
        </Box>
      </Box>
    </Box>
  )
}

export default App;
