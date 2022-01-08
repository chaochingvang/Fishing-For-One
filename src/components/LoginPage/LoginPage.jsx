import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Stack, Button } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <Box sx={{ margin: "auto", width: "90%", padding: "1em", textAlign: "center", justifyContent:"center"}}>

        <Typography variant="h3">Fishing For One</Typography>

        <Box sx={{margin: "auto"}} maxWidth="50vw">
          <img src="/images/fishing.svg" alt="fish_logo" width="100%" height="200vh"/>
        </Box>

        <LoginForm />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between">
          <Box>
            <Typography
              variant="caption">New user? <br />Create an account!</Typography><br />
            <Button
              endIcon={<PersonAddOutlinedIcon />}
              variant="contained"
              type="button"
              className="btn btn_asLink"
              onClick={() => {
                history.push('/registration');
              }}
            >
              Register
            </Button>
          </Box>
          <Box>
            <Typography
              variant="caption">Questions about app? <br />Click for more info!</Typography><br />
            <Button
              variant="contained"
              endIcon={<InfoOutlinedIcon />}
              onClick={() => history.push(`/about`)}
            >
              App Info
            </Button>

          </Box>
        </Stack>
      </Box>
    </div>
  );
}

export default LoginPage;
