import React from 'react';
import { Button, Box, Typography } from '@mui/material';
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
    <Box sx={{ padding: "1em", margin: "auto", width: "80%", textAlign: "center", borderBottom: "solid black 1px"}}>
      <Typography variant="h4">About</Typography>
    </Box>

    <Box sx={{margin: "auto", width: "80%", padding: "1em"}}>
      <Typography variant="body1">
        FishingForOne is an app designed to provide fishers quick accessible information on the go. This app provides basic information for the common types of fishes that resides in MN waters as well as basic information about the common types of lures used to catch those fishes. Users of the app are able to see the app's catch info from other users for each type of fish and lure. <br /><br />
        Along with the informational capabilities of the app, this app will also function as a catch journal for users. Users are able to log each of their catches onto the app and see a list of their own catch entries.
      </Typography>
    </Box>
    <br /><br />
    <Box sx={{ padding: "1em", margin: "auto", width: "80%", textAlign: "center", borderBottom: "solid black 1px"}}>
      <Typography variant="h4">Acknowledgements</Typography>
    </Box>

    <Box sx={{ margin: "auto", width: "80%", padding: "1em" }}>
      <Typography variant="body1">
        I want to acknowledge and thank my friends and families who supported me on this journey of becoming a software developer. Special thanks to the Solinas Cohort along with its instructor Dane Smith and Liz Kerber, as well as the greater Prime Digital Academy community! 
      </Typography>
    </Box>
    <br /> <br />


    <Box sx={{ padding: "1em", margin: "auto", width: "80%", textAlign: "center", borderBottom: "solid black 1px"}}>
      <Typography variant="h4">Technologies Used</Typography>
    </Box>

    <Box sx={{ margin: "auto", width: "80%", padding: "1em" }}>
      <Typography variant="body1">
        <ul>
          <li>Express.js</li>
          <li>React.js</li>
          <li>Material UI</li>
          <li>Filestack API</li>
          <li>Node.js</li>
          <li>PostgreSQL</li>
          <li>Redux / Saga</li>
        </ul>
      </Typography>
    </Box>

  </>);
}

export default AboutPage;
