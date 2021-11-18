import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Paper, Button, Stack } from '@mui/material';
import { useHistory } from 'react-router';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LogoutIcon from '@mui/icons-material/Logout';
import { ReactComponent as FishIcon } from '../../icons/fish.svg';
import { ReactComponent as LureIcon } from '../../icons/lure.svg';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { SvgIcon } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import './BottomNav.css';
import { useDispatch } from 'react-redux';





function BottomNav(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((store) => store.user);
    const [navValue, setNavValue] = useState(``);
    const [open, setOpen] = useState(false);

    const handleChange = (event, newValue) => {
        console.log(`this is newValue`, newValue);
        setNavValue(newValue);
        if (newValue === `logout`) {
            console.log(`log out pop up `);
            setOpen(true);
        }
        else if (newValue === `settings`) {
            console.log(`settings popup`);
            setOpen(true);
        }
        else {
            history.push(newValue);
        }
    }

    const handleViewUser = () => {
        setOpen(false);
        history.push(`/user`);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (<>

        <div className="bottomNavSpacer"></div>

        {(user.access_level !== 0) ?

            //// USERS NAVIGATION BAR ////
            <div>
                <Paper
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0
                    }}
                    elevation={3}>
                    <BottomNavigation
                        value={navValue}
                        showLabels
                        onChange={(event, newValue) => handleChange(event, newValue)
                        }
                    >
                        <BottomNavigationAction
                            value="/journal"
                            label="Journal"
                            icon={<MenuBookIcon />} />
                        <BottomNavigationAction
                            value="/fish"
                            label="Fish Info"
                            icon={<SvgIcon><FishIcon /></SvgIcon>} />
                        <BottomNavigationAction
                            value="/lure"
                            label="Lure Info"
                            icon={<SvgIcon><LureIcon /></SvgIcon>} />
                        <BottomNavigationAction
                            value="settings"
                            label="Settings"
                            icon={<SettingsIcon />} />
                    </BottomNavigation>
                </Paper>

                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle sx={{ textAlign: 'center' }}>
                        Settings
                    </DialogTitle>
                    <DialogActions>
                        <Stack direction="column" spacing={2} sx={{ margin: 'auto' }}>
                            <Button
                                onClick={handleViewUser}
                                variant="contained"
                            >
                                View User Info
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<LogoutIcon />}
                                onClick={() => dispatch({type: `LOGOUT`})}
                            >
                                Logout
                            </Button>
                        </Stack>
                    </DialogActions>
                </Dialog>
            </div>


            :

            //// ADMIN NAVIGATION BAR ////
            <div>
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation
                        value={navValue}
                        showLabels
                        onChange={(event, newValue) => handleChange(event, newValue)
                        }
                    >
                        <BottomNavigationAction value="/admin/fish" label="Fish Database" icon={<SvgIcon><FishIcon /></SvgIcon>} />
                        <BottomNavigationAction value="/admin/lure" label="Lure Database" icon={<SvgIcon><LureIcon /></SvgIcon>} />

                        <BottomNavigationAction value="logout" label="Logout" icon={<LogoutIcon />} />
                    </BottomNavigation>
                </Paper>

                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle sx={{ textAlign: 'center' }}>
                        Are you sure you want to logout?
                    </DialogTitle>
                    <DialogActions>
                        <Stack direction="column" spacing={2} sx={{ margin: 'auto' }}>
                            <Button
                                variant="contained"
                                color="success"
                                startIcon={<CheckIcon />}
                                onClick={() => dispatch({ type: `LOGOUT` })}
                            >
                                Yes
                            </Button>
                            <Button
                                onClick={handleClose}
                                variant="contained"
                                color="error"
                                startIcon={<CloseIcon />}
                            >
                                No
                            </Button>
                        </Stack>
                    </DialogActions>
                </Dialog>``
            </div>
        }
    </>);
}

export default BottomNav;
