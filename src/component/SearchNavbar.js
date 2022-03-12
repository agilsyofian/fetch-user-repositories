import React, {useState} from 'react';

import { useAppContext, setQuery, setStatus } from "../context";

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => (
  {
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '300px',
  },
}));

function SearchNavbar() {

  const [controller, dispatch] = useAppContext();
  const {query} = controller

  const [val, setVal] = useState(query.value)

  const handleOnChange = (e) => {
    setVal(e.target.value)
  }

  const handleOnSubmit = async (e) => {
		e.preventDefault()
    if (val !== '') {
      setStatus(dispatch, 'fetching')
      setQuery(dispatch, {value:val})
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar component="form" role="form" onSubmit={handleOnSubmit}>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Search Repository Github
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search User or Organization…"
              inputProps={{ 'aria-label': 'search' }}
              value={val}
              onChange={handleOnChange}
            />
          </Search>
          <Box ml={2}>
            <Button type="submit" variant="contained" sx={{border:'1px solid #ECECEC'}}>Search</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default SearchNavbar