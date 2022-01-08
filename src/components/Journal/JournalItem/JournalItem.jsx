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
        <Card sx={{ border: "solid black 1px" }} onClick={() => handleCardClick(journalEntry)}>
            <img
                src={`${journalEntry.image_url}?w=248&fit=crop&auto=format`}
                srcSet={`${journalEntry.image_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={journalEntry.title}
                loading="lazy"
            />
        </Card>
    </>)
}

export default JournalItem;