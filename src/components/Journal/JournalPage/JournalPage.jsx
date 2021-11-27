import JournalList from "../JournalList/JournalList";
import { useHistory } from "react-router";
import { useEffect } from 'react';

import { Button, Box, Card, CardActionArea, SvgIcon, Typography } from '@mui/material';
import { ReactComponent as FishIcon } from '../../../icons/fish.svg';
import AddIcon from '@mui/icons-material/Add';

import { useDispatch } from "react-redux";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function JournalPage() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: `FETCH_JOURNAL` });
    }, [dispatch]);

    return (<>
        {/* <Box
            width='60%'
            sx={{ margin: '1em auto', textAlign: 'center'}}>
            <Card
                variant='outlined'
                onClick={() => history.push('/journal/form')}
            >
                <CardActionArea>
                    <Typography variant="button">Caught a fish? <br /> Click here to add it to your journal entry!</Typography>
                    <SvgIcon><FishIcon /></SvgIcon>
            </CardActionArea>
            </Card>
        </Box> */}

        <Box
            width='70%'
            sx={{ margin: '1em auto', textAlign: 'center'}}>
            <Card
                variant='outlined'
                sx={{padding: "1em"}}
            >
                <table style={{width: "100%"}}>
                    <tbody>
                        <tr>
                            <td>Caught a fish? Click 'ADD' to add a new journal entry!</td>
                            <td style={{ textAlign: 'right', paddingLeft: "1em"}}>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={() => history.push('/journal/form')}>ADD</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        </Box>

        <JournalList />

        
    </>)
}
export default JournalPage;