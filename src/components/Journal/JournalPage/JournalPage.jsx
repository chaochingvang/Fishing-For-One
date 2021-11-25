import JournalList from "../JournalList/JournalList";
import { useHistory } from "react-router";
import { useEffect } from 'react';

import { Button, Box, Card, CardActionArea, SvgIcon } from '@mui/material';
import { ReactComponent as FishIcon } from '../../../icons/fish.svg';

import { useDispatch } from "react-redux";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function JournalPage() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: `FETCH_JOURNAL` });
    }, [dispatch]);

    return (<>
        <Box
            width='60%'
            sx={{ margin: '1em auto', textAlign: 'center'}}>
            <Card
                variant='outlined'
                onClick={() => history.push('/journal/form')}
            >
                <CardActionArea>
                    
                    <h3>Caught a fish? <br /> Click here to add it to your journal entry!</h3>
                    <SvgIcon><FishIcon /></SvgIcon>
            </CardActionArea>
            </Card>
        </Box>

        <JournalList />

        
    </>)
}
export default JournalPage;