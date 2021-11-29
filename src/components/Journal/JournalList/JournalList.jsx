import { useSelector } from "react-redux";

import JournalItem from '../JournalItem/JournalItem';
import ImageList from '@mui/material/ImageList';
import { Typography, Box } from "@mui/material";

import './JournalList.css';

function JournalList() {

    const journalList = useSelector(store => store.journal.journalList);

    console.log(`this is journalList`, journalList);

    return (<>
        <Box sx={{textAlign: 'center'}}>
            <Typography variant="h3">Journal Entries</Typography>
            <Typography variant="caption">Click on images to see details</Typography>
        </Box>

        <div className="journals">
            <ImageList sx={{ width: '95%' }} cols={2} rowHeight='auto'>
                {journalList?.map(journalEntry => (
                    <JournalItem
                        key={journalEntry.id}
                        journalEntry={journalEntry}
                    />
                ))}
            </ImageList>

            {(journalList.length === 0)
                ? <Box sx={{margin: "auto", padding: "1em", textAlign: "center"}}><Typography variant="h6">No entries yet! Click 'ADD' to add a new entry to your journal!</Typography></Box>
                : ''}

        </div>
    </>)
}

export default JournalList;