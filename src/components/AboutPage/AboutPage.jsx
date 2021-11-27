import React from 'react';
import { Button, Box } from '@mui/material';
import { useHistory } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  const history = useHistory();
  return (<>
    <Box sx={{padding: "1em"}}>
      <Button
        startIcon={<ArrowBackIcon />}
        variant="contained"
        onClick={() => history.push('/')}
      >
        Back
      </Button>
    </Box>
    <div className="container">
      <div>
        <p>This about page is for anyone to read!</p>
      </div>
    </div>
  </>);
}

export default AboutPage;
