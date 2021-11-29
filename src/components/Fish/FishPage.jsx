import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSwipeable } from 'react-swipeable';
import { IconButton, Box, Card, TextField, Autocomplete, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Typography } from "@mui/material";

import './FishPage.css';


function FishPage() {
    const dispatch = useDispatch();
    const fishList = useSelector(store => store.fish.fishList);
    const fishCount = useSelector(store => store.fish.fishCount);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [tabsValue, setTabsValue] = useState('1');

    useEffect(() => {
        dispatch({ type: `FETCH_FISH_COUNT`, payload: fishList[selectedIndex]?.id });
    }, [selectedIndex]);




    //adding labels into each fish in fishList to allow for autocomplete search
    const searchFishList = fishList.map(fish => ({ ...fish, label: fish.name }))

    const handlers = useSwipeable({
        onSwipedLeft: () => handleNext(),
        onSwipedRight: () => handleBack(),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    const handleBack = () => {
        console.log(`clicked back`);
        if (selectedIndex === 0) {
            setSelectedIndex(fishList.length - 1)
        }
        else {
            setSelectedIndex(selectedIndex - 1);
        }
    }

    const handleNext = () => {
        console.log(`clicked next`);
        if (selectedIndex === fishList.length - 1) {
            setSelectedIndex(0);
        }
        else {
            setSelectedIndex(selectedIndex + 1);
        }
    }

    //handle search option change
    const handleChange = (newValue) => {
        if (newValue !== null) {
            const index = searchFishList.findIndex(fish => fish.id === newValue.id);
            setSelectedIndex(index);
        }
        else {
            return;
        }
    }

    const handleTabs = (event, newValue) => {
        setTabsValue(newValue);
    };


    return (<>
        <div className="fishPage">
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                isOptionEqualToValue={(option, value) => option.id === value.id}
                options={searchFishList}
                sx={{
                    width: '80%',
                    margin: '2em auto 1em',
                }}

                renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps, startAdornment: (<><InputAdornment position="start"><SearchIcon /></InputAdornment> {params.InputProps.startAdornment}</>) }} label="Fish Search" />}
                // newValue is the value of the option selected
                onChange={(event, newValue) => handleChange(newValue)}
            />
            <table style={{
                textAlign: "center",
            }}>
                <tbody>
                    <tr>
                        <td>
                            <IconButton
                                aria-label="back"
                                size='large'
                                onClick={handleBack}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <NavigateBeforeIcon fontSize='inherit' />
                                <p className="subtext">Back</p>
                            </IconButton>
                        </td>
                        <td style={{
                            width: '100%'
                        }}>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    margin: 'auto',
                                }}>
                                <Typography variant="h5">{fishList[selectedIndex]?.name}</Typography>
                            </Box>
                        </td>
                        <td>
                            <IconButton
                                aria-label="back"
                                size='large'
                                onClick={handleNext}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <NavigateNextIcon fontSize='inherit' />
                                <p className="subtext">Next</p>
                            </IconButton>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Card
                {...handlers}
                variant="outlined"
                sx={{
                    width: '90%',
                    margin: 'auto',
                }}>
                <img height='150em' src={fishList[selectedIndex]?.image_url} />
            </Card>
            <Box sx={{ width: '90%', typography: 'body1', margin: '1em auto' }}>
                <TabContext value={tabsValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleTabs} aria-label="lab API tabs example" centered variant="fullWidth">
                            <Tab label="Habitat" value="1" />
                            <Tab label="Feeding Preferences" value="2" />
                            <Tab label="Catch Info" value="3" />
                        </TabList>
                    </Box>
                    <Box sx={{width: '90%', margin: 'auto', textAlign: 'left' }}>
                    <TabPanel value="1"><p>{fishList[selectedIndex]?.habitat}</p></TabPanel>
                    <TabPanel value="2"><p>{fishList[selectedIndex]?.feeding_preferences}</p></TabPanel>
                    <TabPanel value="3">
                        <p style={{textAlign: 'center'}}><strong>Amount of {fishList[selectedIndex]?.name} caught by users:</strong></p><br />
                        {fishCount?.map((lure, i) => (
                        <p key={i}>{lure.total} caught using {lure.name}</p>
                        ))}
                    </TabPanel>
                    </Box>
                </TabContext>
            </Box>

        </div>
    </>)
}
export default FishPage;