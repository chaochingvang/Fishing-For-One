import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';



//mui imports
import { Box, Card } from '@mui/material'




function JournalItem({ journalEntry }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleCardClick =(journalEntry) => {
        console.log(`this is selected entry`, journalEntry);

        dispatch({ type: `SET_SELECTED_ENTRY`, payload: journalEntry });
        history.push('/journal/details');
    }

    return (<>
        <Box sx={{
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
                <h3>{journalEntry.name}</h3>
                <img
                    src={journalEntry.image_url}
                    alt={journalEntry.name}
                    
                />
            </Card>
        </Box>

    </>)
}

export default JournalItem;