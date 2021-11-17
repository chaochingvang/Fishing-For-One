import LogOutButton from '../../LogOutButton/LogOutButton';
import { useHistory } from 'react-router';

//mui imports
import { Box, Card, Button } from '@mui/material'

import './AdminPage.css';




function AdminPage() {
    const history = useHistory();


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
        <LogOutButton />
    </>)
}
export default AdminPage;