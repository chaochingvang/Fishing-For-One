import React from 'react';
import LogOutButton from '../../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


import './UserPage.css';
import { useHistory } from 'react-router';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();

  console.log(user);

  return (
    <div className="userPageContainer">
      <h1>User Info</h1>
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


    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
