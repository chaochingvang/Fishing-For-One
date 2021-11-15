import { useDispatch } from 'react-redux';

import JournalDetails from '../JournalDetails/JournalDetails';


//mui imports
import { Box } from '@mui/material'
import Card from '@mui/material/Card';


function JournalItem({ journal }) {
    const dispatch = useDispatch();


    const handleImgClick =(journal) => {
        console.log(journal);
    }

    return (<>
        <Box sx={{
            width: 300,
            height: 300,
            margin: 'auto',
            padding: '1em'
        }}>
            <Card
                variant="outlined"
                sx={{
                    width: '100%',
                    height: '100%',
                    margin: 'auto',
                    backgroundColor: '#b2dfdb'
                }}>
                <h3>{journal.name}</h3>
                <img
                    src={journal.fish_image_url}
                    alt={journal.name}
                    onClick={() => handleImgClick(journal)}
                />
            </Card>
        </Box>

    </>)
}

export default JournalItem;