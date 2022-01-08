import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import JournalItem from '../JournalItem/JournalItem';
import ImageList from '@mui/material/ImageList';
import { Typography, Box, Card, ImageListItem, Container, Paper, Grid } from "@mui/material";

import './JournalList.css';

function JournalList() {

    const journalList = useSelector(store => store.journal.journalList);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleCardClick = (journalEntry) => {
        console.log(`this is selected entry`, journalEntry);

        dispatch({ type: `SET_SELECTED_ENTRY`, payload: journalEntry });
        history.push('/journal/details');
    }

    console.log(`this is journalList`, journalList);

    return (<>
        <Box sx={{
            textAlign: 'center'}}>
            <Typography variant="h3">Journal Entries</Typography>
            <Typography variant="caption">Click on images to see details</Typography>
        </Box>

        <Box sx={{ width: "80%", margin: "auto" }}>
            <ImageList variant="masonry" cols={3} gap={8}>
                {journalList.map((journalEntry) => (
                    <ImageListItem key={journalEntry.id}>
                        <JournalItem journalEntry={journalEntry}/>
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>

            {(journalList.length === 0)
                ? <Box sx={{ margin: "auto", padding: "1em", textAlign: "center" }}><Typography variant="h6">No entries yet! Click 'ADD' to add a new entry to your journal!</Typography></Box>
                : ''}
    </>)
}

export default JournalList;