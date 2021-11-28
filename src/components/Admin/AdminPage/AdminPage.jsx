import LogOutButton from '../../LogOutButton/LogOutButton';
import { useHistory } from 'react-router';
import { useEffect } from 'react';

//mui imports
import { Box, Card, Button } from '@mui/material'

import './AdminPage.css';
import { useDispatch } from 'react-redux';




function AdminPage() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_FISH' });
        dispatch({ type: `FETCH_LURE` });
    }, [dispatch]);

    return (<>
        <h1>ADMIN PAGE</h1>
        <div className="admin">
            <Box sx={{
                width: '50%',
                margin: 'auto',
                padding: '1em'
            }}>
                <Card
                    onClick={() => history.push('/admin/fish')}
                    variant="outlined"
                    sx={{
                        width: '100%',
                        height: '100%',
                        margin: 'auto',
                        backgroundColor: '#b2dfdb'
                    }}>
                    <img alt="fish list" src="/images/fish.svg" />

                    <h2>Fish Database</h2>
                </Card>
            </Box>

            <Box sx={{
                width: '50%',
                margin: 'auto',
                padding: '1em'
            }}>
                <Card
                    onClick={() => history.push('/admin/lure')}
                    variant="outlined"
                    sx={{
                        width: '100%',
                        height: '100%',
                        margin: 'auto',
                        backgroundColor: '#b2dfdb'
                    }}>

                    <img alt="lure list" src="/images/lure.svg" />
                    <h2>Lure Database</h2>
                </Card>
            </Box>
        </div>
    </>)
}
export default AdminPage;