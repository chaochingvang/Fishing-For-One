import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  console.log(user);

  return (
    <div className="container">
      <h2>User Info</h2>
      <p>Username</p>
      <p>{user.username}</p>

      <p>Current Email Address</p>
      <p>{user.email}</p>

      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
