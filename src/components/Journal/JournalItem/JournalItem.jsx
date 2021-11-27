import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';



//mui imports
import { Box, Card, ImageListItem } from '@mui/material'




function JournalItem({ journalEntry }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleCardClick =(journalEntry) => {
        console.log(`this is selected entry`, journalEntry);

        dispatch({ type: `SET_SELECTED_ENTRY`, payload: journalEntry });
        history.push('/journal/details');
    }

    return (<>
        <ImageListItem sx={{margin: '.5em'}}>
            <Card
                onClick={() => handleCardClick(journalEntry)}
                sx={{ border: 'solid black 1px' }}>
            <img
                // src={`${journalEntry.image_url}?w=164&h=164&fit=crop&auto=format`}
                src={`${journalEntry.image_url}`}
                srcSet={`${journalEntry.image_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={journalEntry.image_url}
                loading="lazy"
            />
            </Card>
        </ImageListItem>

    </>)
}

export default JournalItem;