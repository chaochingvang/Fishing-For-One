import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { TextField, Box, Button, FormControl, Typography } from '@mui/material'


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const loginInfo = { username, password }
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          loginInfo, history
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (<>
    <Box sx={{padding: "1em"}}>
    <form onSubmit={login}>
      <Typography variant="body1">Already have an account? Login.</Typography>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
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
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>

          <TextField
            type="password"
            helperText="password"
            label="password"
            name="password"
            placeholder="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <Button
          sx={{ width: "50%", margin: "auto" }}
          variant="contained"
          type="submit">Log in</Button>
      </FormControl>
      </form>
    </Box>
  </>);
}

export default LoginForm;
