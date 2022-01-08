import { useSelector } from "react-redux";
import { format } from 'date-fns';
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";

import { Button, Box, Card, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function JournalDetails() {

    const history = useHistory();
    const journalEntry = useSelector(store => store.journal.selectedEntry)


    return (<>
        {(journalEntry.name === 'empty')
            ?
            <>
                <Redirect to="/404" />
            </>
            :
            <>
                <Box sx={{padding: "1em"}}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        variant="contained"
                        onClick={() => history.push('/journal')}>
                        Back to Journal
                    </Button>
                </Box>
                    
                <Box sx={{
                    width: "90%",
                    // height: 300,
                    margin: "auto",
                    padding: "1em"
                }}>
                    <Card variant="outlined" sx={{textAlign: "center"}}>
                        <img src={journalEntry.image_url} height="250vh"/>
                    </Card>
                    <div className="details">
                        <Box
                            sx={{
                                width: "80%",
                                margin: "auto",
                                textAlign: "left",
                                padding: "1em",
                            }}>
                            <Typography variant="body1">
                                Fish Type: {journalEntry.fishName} <br />
                                Lure Used: {journalEntry.lureName} <br />
                                Date Caught: {format(new Date(journalEntry.date), 'MM-dd-yyyy')} <br />
                                Length: {journalEntry.length ? `${journalEntry.length} in` : `Not measured`}<br />
                                Weight: {journalEntry.weight ? `${journalEntry.weight} lbs` : `Not measured`}<br />
                                {journalEntry.comments ? `Additional Comments: ${journalEntry.comments}` : ``}
                            </Typography>
                        </Box>
                    </div>

                </Box>
            </>
        }
    </>)
}

export default JournalDetails;