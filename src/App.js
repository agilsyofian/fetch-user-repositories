import React, {useState, useEffect} from 'react'

import { useAppContext, setStatus } from "./context";

import Box from '@mui/material/Box';

import SearchNavbar from './component/SearchNavbar'
import fetchData from './fetchData'

function App() {

  const [controller, dispatch] = useAppContext();
  const { query, status } = controller;

  const [list, setList] = useState(null)
 
  useEffect(() => {
    if (status) {
      fetchData('get', `https://api.github.com/search/users?q=${query.value}`, {}, {})
      .then(res => {
        if (res.status === 200) {
          setList(res.data)
          setStatus(dispatch, 'success')
        }else{
          setList(null)
          setStatus(dispatch, 'error')
        }
      })
    }
  }, [query.value]);

  console.log(query)
  console.log(status)
  console.log(list)

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
