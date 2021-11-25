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
        {/* <Box sx={{
            width: '50%',
            // height: 300,
            margin: 'auto',
            padding: '1em'
        }}>
            <Card
                onClick={() => handleCardClick(journalEntry)}
                variant="outlined"
                sx={{
                    width: '100%',
                    height: '100%',
                    margin: 'auto',
                    backgroundColor: '#b2dfdb'
                }}>
                <img
                    src={journalEntry.image_url}
                    alt={journalEntry.image_url}
                />
            </Card>
        </Box> */}
        <ImageListItem sx={{margin: '.5em'}}>
            <Card
                onClick={() => handleCardClick(journalEntry)}
                sx={{ border: 'solid black 1px' }}>
            <img
                src={`${journalEntry.image_url}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${journalEntry.image_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={journalEntry.image_url}
                loading="lazy"
            />
            </Card>
        </ImageListItem>

    </>)
}

export default JournalItem;