import JournalList from "../JournalList/JournalList";
import { useHistory } from "react-router";

import { Button } from '@mui/material';

function JournalPage() {
    const history = useHistory();

    return (<>


        <Button variant="contained" onClick={() => history.push('/journal/form') }>Add A New Entry</Button>

        <JournalList />

        
    </>)
}
export default JournalPage;