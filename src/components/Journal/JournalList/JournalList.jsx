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
            <Typography variant="h3">Journal List!</Typography>
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

        </div>
    </>)
}

export default JournalList;