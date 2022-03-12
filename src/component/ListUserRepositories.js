import React, {useState, useEffect} from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import GitHub from '@mui/icons-material/GitHub';

import fetchData from '../fetchData'

function ListUserRepositories({data}) {

  const [open, setOpen] = useState(false)
  const [repo, setRepo] = useState(null)
  const [error, setError] = useState(false)

	const handleClick = () => {
		setOpen(!open)
	}

  useEffect(() => {
    fetchData('get', data.repos_url, {}, {})
      .then(res => {
        if (res.status === 200) {
          setError(false)
          setRepo(res.data)
        }else{
          setRepo(null)
          setError(res)
        }
      })
  }, [open])

  const collapseItem = (
		<Collapse in={open} timeout="auto" unmountOnExit>
      {error && (<Box display="block" justifyContent="center" mt={2}>
        <>
          <Box>
          {`${error.msg}`}
          </Box>
          <Box>
            API rate limit exceeded. 
            (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.
          </Box>
          <Link href='https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting' target="_blank">
            https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting
          </Link>
        </>
      </Box>)}
      <Box display="flex" justifyContent="end" mt={2}>
        {repo && `${repo.length > 1 ? `show : ${repo.length} repositories` : `show : ${repo.length} repository`}`}
      </Box>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {repo && repo.map((r, index) => 
          <Box key={index}>
            <ListItem width="100%">
              <ListItemText primary={r.name} secondary={`description : ${r.description ? r.description : `Tidak ada description`}`} style={{paddingLeft:'3.5rem'}} />
              <Link href={r.html_url} target="_blank" underline="none">
                <Button variant="outlined" sx={{fontSize:'12px', width:'max-content', marginLeft:'0.75rem'}} 
                  startIcon={<GitHub style={{ fontSize:'16px'}} />}>
                  Open on Github
                </Button>
              </Link>
            </ListItem>
            <Divider variant="inset" component="li" />
          </Box>
        )}
      </List>
		</Collapse>
	)

  const listItem = (
    <>
     <ListItem>
       <ListItemAvatar>
         <Avatar>
           <Avatar alt={data.login} src={data.avatar_url} />
         </Avatar>
       </ListItemAvatar>
       <ListItemText primary={data.login} secondary={`Type : ${data.type}`} />
       <Button variant="contained" sx={{fontSize:'12px', backgroundColor:'#1976d2'}} 
         endIcon={!open ? (<ExpandLess style={{ color: 'white' }} />) : (<ExpandMore style={{ color: 'white' }} />) } onClick={handleClick}>
         List Reposiroties
       </Button>
     </ListItem>
     <Divider variant="inset" component="li" />
    </>
 )


 return (
    <>
      {listItem}
      {collapseItem}
    </>
  )
  
}

export default ListUserRepositories