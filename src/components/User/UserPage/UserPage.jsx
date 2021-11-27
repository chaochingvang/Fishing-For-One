import React from 'react';
import { useSelector } from 'react-redux';
import { IconButton, Button, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';


import './UserPage.css';
import { useHistory } from 'react-router';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();

  return (<>
    <Box sx={{ padding: "1em" }}>
      <Button
        startIcon={<ArrowBackOutlinedIcon />}
        variant="contained"
        onClick={() => history.push(`/journal`)}
      >
        Back
      </Button>
    </Box>
    <Box sx={{padding: "1em", margin: "auto", textAlign: "center"}}>
      <Typography variant="h2">User Info</Typography>
    </Box>
    <div className="userPageContainer">
      <br /><br/>
      <p>Username</p>
      <h3>{user.username}</h3>
      <br /><br />
      
      <p>Current Email Address</p>

      <table className="emailContainer">
        <tbody>
          <tr>
            <td>
              <h3>{user.email}</h3>
            </td>
            <td className="emailEditBtn">
              <IconButton
                aria-label="edit"
                sx={{
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onClick={() => history.push(`/user/email`)}
              >
                <EditIcon />
                <p className="subtext">Edit</p>
              </IconButton>
            </td>
          </tr>
        </tbody>
      </table>
      
      <br /><br />
      <Button
        endIcon={<LockOutlinedIcon />}
        variant="contained"
        onClick={() => history.push(`/user/password`)}
      >
        Change Password
      </Button>
    </div>
  </>);
}

// this allows us to use <App /> in index.js
export default UserPage;
