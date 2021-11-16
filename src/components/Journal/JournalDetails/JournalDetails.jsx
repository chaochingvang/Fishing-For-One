import { useSelector } from "react-redux";
import { format } from 'date-fns';
import { useHistory } from "react-router";

import { Button, Box, Card } from '@mui/material';

import './JournalDetails.css';

function JournalDetails() {

    const history = useHistory();
    const journalEntry = useSelector(store => store.journal.selectedEntry)


    return (<>
        <h1>JOURNAL DETAILS</h1>

        {(journalEntry.name === 'empty')
            ?
            <>
                <p>NO SELECTED ENTRY</p>
            </>
            :
            <>
                <Button variant="contained" onClick={() => history.push('/journal')}>Back to Journal</Button>

                <Box sx={{
                    width: '90%',
                    // height: 300,
                    margin: 'auto',
                    padding: '1em',
                    border: '1px solid'
                }}>
                    <div className="details">
                        <Card
                            variant="outlined"
                            sx={{
                                width: '100%',
                                height: '100%',
                                margin: 'auto',
                                backgroundColor: '#b2dfdb'
                            }}>

                            <img src={journalEntry.image_url} />
                            <h2>{journalEntry.fishName}</h2>
                            <h2>Caught with: {journalEntry.lureName}</h2>
                            <h2>Caught on: {format(new Date(journalEntry.date), 'MM-dd-yyyy')}</h2>
                            <h2>Length: {journalEntry.length}</h2>
                            <h2>Weight: {journalEntry.weight} </h2>
                            <p>Additional Comments: {journalEntry.comments} </p>
                        </Card>
                    </div>

                </Box>
            </>
        }
    </>)
}

export default JournalDetails;