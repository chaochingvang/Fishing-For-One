import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Paper} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useHistory } from 'react-router';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LogoutIcon from '@mui/icons-material/Logout';
import { ReactComponent as FishIcon } from '../../icons/fish.svg';
import { ReactComponent as LureIcon } from '../../icons/lure.svg';

import { SvgIcon } from '@mui/material';





function BottomNav(props) {
    const history = useHistory();
    const user = useSelector((store) => store.user);
    const [navValue, setNavValue] = useState(``);

    const handleChange = (event, newValue) => {
        console.log(`this is newValue`, newValue);
        setNavValue(newValue);
        if (newValue === `logout`) {
            console.log(`log out pop up `);
        }
        else if (newValue === `settings`) {
            console.log(`settings popup`);
        }
        else {
            history.push(newValue);
        }
        
    }

    console.log(`this is accesslevel`, user.access_level);

    return (<>
        {(user.access_level !== 0) ? 
        <div>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    value={navValue}
                    showLabels
                    onChange={(event, newValue) => handleChange(event, newValue)
                    }
                >
                    <BottomNavigationAction value="/journal" label="Journal" icon={<MenuBookIcon />} />
                    <BottomNavigationAction value="/fish" label="Fish Info" icon={<SvgIcon><FishIcon /></SvgIcon>} />
                    <BottomNavigationAction value="/lure" label="Lure Info" icon={<SvgIcon><LureIcon /></SvgIcon>} />
                    
                    <BottomNavigationAction value="settings" label="Settings" icon={<SettingsIcon />} />
                </BottomNavigation>
            </Paper>
            </div>
            :
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
            </div>
            }
    </>);
}

export default BottomNav;