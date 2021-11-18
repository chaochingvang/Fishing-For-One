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
import { ReactComponent as FishIcon } from '../../icons/fish.svg';
import { ReactComponent as LureIcon } from '../../icons/lure.svg';

import { SvgIcon } from '@mui/material';





function BottomNav(props) {
    const history = useHistory();
    const user = useSelector((store) => store.user);
    const [navValue, setNavValue] = useState(``);

    const handleChange = (event, newValue) => {
        console.log(`this is event`, event.target);
        console.log(`this is newValue`, newValue);
        setNavValue(newValue);
        
    }

    return (
        <div>
            <p>Bottom Nav</p>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    value={navValue}
                    showLabels
                    onChange={(event, newValue) => handleChange(event, newValue)
                    }
                >
                    <BottomNavigationAction label="Journal" icon={<MenuBookIcon />} />
                    <BottomNavigationAction label="Fish Info" icon={<SvgIcon><FishIcon /></SvgIcon>} />
                    <BottomNavigationAction label="Lure Info" icon={<SvgIcon><LureIcon /></SvgIcon>} />
                    
                    <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
                </BottomNavigation>
            </Paper>
        </div>
    );
}

export default BottomNav;
