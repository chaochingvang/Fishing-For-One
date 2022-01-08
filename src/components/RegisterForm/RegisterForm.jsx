import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { Box, Typography, TextField, Button, FormControl } from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';


function RegisterForm() {
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  //initial state of registration info
  const initialState = {
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  }

  const [newUser, setNewUser] = useState(initialState);




  const registerUser = (event) => {
    event.preventDefault();

    //checks if user has enter the same password twice
    //dispatch registration if pw is correct
    if (newUser.password === newUser.confirmPassword) {
      console.log(`dispatched register`)
      dispatch({
        type: 'REGISTER',
        payload: {
          info: {
            username: newUser.username,
            password: newUser.password,
            email: newUser.email
          },
          history: history,
        },
      });
      console.log(`after dispatch`);
      //if not, reset pw input and prompt user to re-enter both pw
    } else {
      alert(`Passwords don't match! Please re-enter matching passwords.`);
      setNewUser({ ...newUser, password: '', confirmPassword: '' })
    }
  }; // end registerUser

  console.log(newUser);

  return (<>
    <Box sx={{ padding: "1em", margin: "auto", textAlign: "center"}}>


      <Box>
      <form onSubmit={registerUser}>
          <Typography variant="body1">New user? Create a new account</Typography>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
          )}
          <FormControl>
        <div>
            <TextField
              type="text"
                name="username"
                helperText="Username"
                placeholder="Username"
                label="username"
              value={newUser.username}
              required
              onChange={(event) => setNewUser({ ...newUser, username: event.target.value })}
            />

        </div>
        <div>

            <TextField
              type="password"
              name="password"
              helperText="password"
              placeholder="password"
              label="password"
              value={newUser.password}
              required
              onChange={(event) => setNewUser({ ...newUser, password: event.target.value })}
            />

        </div>
        <div>

            <TextField
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
              label="confirm password"
              helperText="confirm password"
              value={newUser.confirmPassword}
              required
              onChange={(event) => setNewUser({ ...newUser, confirmPassword: event.target.value })}
            />
        </div>
        <div>
            <TextField
              type="text"
              name="email"
              placeholder="email"
              label="email"
              helperText="email"
              value={newUser.email}
              required
              onChange={(event) => setNewUser({ ...newUser, email: event.target.value })}
            />
        </div>
            <Button
              sx={{ width: "80%", margin: "auto" }}
              variant="contained"
              endIcon={<PersonAddOutlinedIcon />}
              type="submit">Register</Button>
        </FormControl>
        </form>
      </Box>
    </Box>
  </>);
}

export default RegisterForm;
