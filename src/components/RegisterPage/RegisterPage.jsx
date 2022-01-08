import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import { Box, Button, Typography } from '@mui/material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';


function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <Box sx={{ padding: "1em" }}>
        <Button startIcon={<ArrowBackOutlinedIcon />}variant="contained" onClick={() => history.push(`/login`)}>Back to Login</Button>
      </Box>
      <Box sx={{margin: "auto", padding: "0 1em", textAlign: "center"}}>


      <Typography variant="h3">Fishing For One</Typography>

        <Box sx={{ margin: "auto" }} maxWidth="50vw">
          <img src="/images/fishing.svg" alt="fish_logo" width="100%" height="200vh" />
        </Box>

      <RegisterForm />
      </Box>
    </div>
  );
}

export default RegisterPage;
