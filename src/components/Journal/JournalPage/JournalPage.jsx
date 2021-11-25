import JournalList from "../JournalList/JournalList";
import { useHistory } from "react-router";
import { useEffect } from 'react';

import { Button, Box } from '@mui/material';
import { useDispatch } from "react-redux";

function JournalPage() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: `FETCH_JOURNAL` });
    }, [dispatch]);

    return (<>
        <Box sx={{ margin: 'auto', textAlign: 'center'}} >
            <Button variant="contained" onClick={() => history.push('/journal/form') }>Add A New Entry</Button>
        </Box>

        <JournalList />

        
    </>)
}
export default JournalPage;