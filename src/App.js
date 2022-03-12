import React from 'react'

import { useAppContext } from "./context";

import Box from '@mui/material/Box';

import SearchNavbar from './component/SearchNavbar'

function App() {

  const [controller] = useAppContext();
  const { query, status } = controller;

  console.log(query)
  console.log(status)

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
