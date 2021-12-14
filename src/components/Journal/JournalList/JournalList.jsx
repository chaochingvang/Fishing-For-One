import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import JournalItem from '../JournalItem/JournalItem';
import ImageList from '@mui/material/ImageList';
import { Typography, Box, Card, ImageListItem } from "@mui/material";

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
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3">Journal Entries</Typography>
            <Typography variant="caption">Click on images to see details</Typography>
        </Box>

        <div className="journals">
            {/* <Box sx={{ width: "95%", border: "solid black 1px", columnCount: 2}}>
                <Card sx={{ width: "100%", }}>
                    {journalList?.map(journalEntry => (
                        <JournalItem
                            key={journalEntry.id}
                            journalEntry={journalEntry}
                        />
                    ))}
                </Card>
            </Box> */}
            <ImageList sx={{ width: '90%' }} cols={2}>
                {journalList?.map((journalEntry) => (
                    <Card sx={{border: "1px solid black"}}>
                        <ImageListItem key={journalEntry.image_url}>
                            <img
                                style={{ height: "30vh" }}
                                onClick={() => handleCardClick(journalEntry)}
                                src={`${journalEntry.image_url}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${journalEntry.image_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                loading="lazy"
                            />
                        </ImageListItem>
                    </Card>
                ))}
            </ImageList>

            {(journalList.length === 0)
                ? <Box sx={{ margin: "auto", padding: "1em", textAlign: "center" }}><Typography variant="h6">No entries yet! Click 'ADD' to add a new entry to your journal!</Typography></Box>
                : ''}

        </div>
    </>)
}

export default JournalList;