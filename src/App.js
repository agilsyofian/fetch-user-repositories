import React, {useState, useEffect} from 'react'

import { useAppContext, setStatus } from "./context";

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';

import SearchNavbar from './component/SearchNavbar'
import fetchData from './fetchData'
import ListUserRepositories from './component/ListUserRepositories';

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

  return (
    <Box
        sx={{
          width: '100vw',
          height: '100vh',
        }}
      >
      <SearchNavbar />
      <Box display="flex" justifyContent="center" pt={3}>
        {status === null && (
          <Box
            display="grid"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="70vh"
          >
            Welcome, silahkan cari repositori dari user atau organization di Github dengan menuliskan di kolom search... !
          </Box>
        )}
        {status === 'fetching' && (<Box
							display="grid"
							justifyContent="center"
							alignItems="center"
							width="100%"
							height="70vh"
						>
						<CircularProgress />
					</Box>
        )}
        {(status === 'success' && list && list.total_count === 0) && (
          <Box
							display="grid"
							justifyContent="center"
							alignItems="center"
							width="100%"
							height="70vh"
						>
						Sorry.. Data tidak ditemukan !
					</Box>
        )}
        {(status === 'error') && (
          <Box
							display="grid"
							justifyContent="center"
							alignItems="center"
							width="100%"
							height="70vh"
						>
						Sorry.. Error while fetching data on Github !
					</Box>
        )}
        {(status === 'success' && list && list.total_count > 0) && (
          <Grid item lg={6} md={12} xs={12}>
            <List>
              {list.items.map((item) =>
                <ListUserRepositories data={item} key={item.id}/>
              )}
            </List>
          </Grid>
        )}
      </Box>
    </Box>
  )
}

export default App;
