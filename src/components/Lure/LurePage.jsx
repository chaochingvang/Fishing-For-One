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


import './LurePage.css';


function LurePage() {
    const dispatch = useDispatch();
    const lureList = useSelector(store => store.lure.lureList);
    const lureCount = useSelector(store => store.lure.lureCount);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [tabsValue, setTabsValue] = useState('1');


    useEffect(() => {
        dispatch({ type: `FETCH_LURE_COUNT`, payload: lureList[selectedIndex]?.id })
    }, [selectedIndex]);

    //adding labels into each fish in fishList to allow for autocomplete search
    const searchLureList = lureList.map(lure => ({ ...lure, label: lure.name }))


    const handlers = useSwipeable({
        onSwipedLeft: () => handleNext(),
        onSwipedRight: () => handleBack(),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    const handleBack = () => {
        console.log(`clicked back`);
        if (selectedIndex === 0) {
            setSelectedIndex(lureList.length - 1)
        }
        else {
            setSelectedIndex(selectedIndex - 1);
        }
    }

    const handleNext = () => {
        console.log(`clicked next`);
        if (selectedIndex === lureList.length - 1) {
            setSelectedIndex(0);
        }
        else {
            setSelectedIndex(selectedIndex + 1);
        }
    }

    //handle search option change
    const handleChange = (newValue) => {
        if (newValue !== null) {
            const index = searchLureList.findIndex(lure => lure.id === newValue.id);
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
        <div className="lurePage">
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                isOptionEqualToValue={(option, value) => option.id === value.id}
                options={searchLureList}
                sx={{
                    width: '80%',
                    margin: '2em auto 1em',
                }}

                renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps, startAdornment: (<><InputAdornment position="start"><SearchIcon /></InputAdornment> {params.InputProps.startAdornment}</>) }} label="Lure Search" />}
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
                                <h2>{lureList[selectedIndex]?.name}</h2>
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
                <img height='150em' src={lureList[selectedIndex]?.image_url} />
            </Card>
            <Box sx={{ width: '90%', typography: 'body1', margin: '1em auto' }}>
                <TabContext value={tabsValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleTabs} aria-label="lab API tabs example" centered variant="fullWidth">
                            <Tab label="Description" value="1" />
                            <Tab label="Technique" value="2" />
                            <Tab label="Catch History" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1"><p>{lureList[selectedIndex]?.description}</p></TabPanel>
                    <TabPanel value="2"><p>{lureList[selectedIndex]?.technique}</p><br/>
                    <p><strong>Target:</strong> {lureList[selectedIndex]?.target_fish}</p></TabPanel>
                    <TabPanel value="3">
                        <strong>Amount of times users used {lureList[selectedIndex]?.name} to catch fish:</strong>
                        {lureCount?.map((fish, i) => (
                            <p key={i}>{fish.total} {fish.name} caught</p>
                        ))}
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    </>)
}
export default LurePage;