import JournalList from "../JournalList/JournalList";
import { useHistory } from "react-router";

import { Button, Box } from '@mui/material';

function JournalPage() {
    const history = useHistory();

    return (<>
        <Box sx={{ margin: 'auto', textAlign: 'center'}} >
            <Button variant="contained" onClick={() => history.push('/journal/form') }>Add A New Entry</Button>
        </Box>

        <JournalList />

        
    </>)
}
export default JournalPage;