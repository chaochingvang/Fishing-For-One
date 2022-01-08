import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useHistory } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function AboutPage() {
  const history = useHistory();
  return (<>
    <Box sx={{ padding: "1em" }}>
      {/* goes back to '/' when btn clicked */}
      <Button
        startIcon={<ArrowBackIcon />}
        variant="contained"
        onClick={() => history.push('/')}
      >
        Back
      </Button>
    </Box>
    <Box sx={{ padding: "1em", margin: "auto", width: "80%", textAlign: "center", borderBottom: "solid black 1px" }}>
      <Typography variant="h4">About FishingForOne</Typography>
    </Box>

    <Box sx={{ margin: "auto", width: "80%", padding: "1em" }}>
      <Typography variant="body1">
        FishingForOne is an app designed to provide fishers quick accessible information on the go. This app provides basic information for the common types of fishes that resides in MN waters as well as basic information about the common types of lures used to catch those fishes. Users of the app are able to see the app's catch info from other users for each type of fish and lure. <br /><br />
        Along with the informational capabilities of the app, this app will also function as a catch journal for users. Users are able to log each of their catches onto the app and see a list of their own catch entries.
      </Typography>
    </Box>
    <br />
    <Box sx={{ padding: "1em", margin: "auto", width: "80%", textAlign: "center", borderBottom: "solid black 1px" }}>
      <Typography variant="h4">Acknowledgements</Typography>
    </Box>

    <Box sx={{ margin: "auto", width: "80%", padding: "1em" }}>
      <Typography variant="body1">
        I want to acknowledge and thank my friends and families who supported me on this journey of becoming a software developer. Special thanks to the Solinas Cohort along with its instructor Dane Smith and Liz Kerber, as well as the greater Prime Digital Academy community!
      </Typography>
    </Box>
    <br /> 


    <Box sx={{ padding: "1em", margin: "auto", width: "80%", textAlign: "center", borderBottom: "solid black 1px" }}>
      <Typography variant="h4">Technologies and Libraries Used</Typography>
    </Box>

    <Box sx={{ margin: "auto", width: "80%", padding: "1em" }}>
      <ul style={{ columnCount: "2"}}>
        <Typography variant="body1">
          <li>Javascript</li>
          <li>React</li>
          <li>Node.js</li>
          <li>Redux</li>
          <li>Redux Saga</li>
          <li>PostgreSQL</li>
          <li>HTML5</li>
          <li>CSS3</li>
          <li>Express.js</li>
          <li>Passport.js</li>
          <li>Filestack API</li>
        </Typography>
      </ul>
    </Box>

    <br />
    <Box sx={{ padding: "1em", margin: "auto", width: "80%", textAlign: "center", borderBottom: "solid black 1px" }}>
      <Typography variant="h4">Future Implementation Goals</Typography>
    </Box>
    <Box sx={{ margin: "auto", width: "80%", padding: "1em" }}>
      <ul >
        <Typography variant="body1">
          <li>Include location using maps with marker to mark caught location</li>
          <li>Include Solunar API to display best feeding times based off location</li>
          <li>Make app mobile friendly with styling</li>
        </Typography>
      </ul>
    </Box>
    
  </>);
}

export default AboutPage;
