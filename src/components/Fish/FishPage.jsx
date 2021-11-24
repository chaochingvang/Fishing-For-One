import { useState } from "react";
import { useSelector } from "react-redux";
import { useSwipeable } from 'react-swipeable';
import { Button, IconButton, Box, Card, TextField, Autocomplete, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import './FishPage.css';


function FishPage() {
    const fishList = useSelector(store => store.fish.fishList);
    const [selectedIndex, setSelectedIndex] = useState(0);

    //adding labels into each fish in fishList to allow for autocomplete search
    const searchFishList = fishList.map(fish => ({ ...fish, label: fish.name }))

    const [searchItem, setSearchItem] = useState(searchFishList[selectedIndex]);

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


    return (<>
        <div className="fishPage">
            <Autocomplete
                disablePortal
                // value={searchItem}
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
            <h1>Fish Info</h1>
            <table style={{
                textAlign: "center"
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
                            <Card
                                variant="outlined"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    margin: 'auto',
                                    backgroundColor: '#b2dfdb'
                                }}>
                                <h2>{fishList[selectedIndex]?.name}</h2>
                            </Card>
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
                    <tr>
                        <td
                            colSpan={3}
                            style={{
                            width: '100%',
                        }}>
                            <Card
                                {...handlers}
                                variant="outlined"
                                sx={{
                                    width: '75%',
                                    margin: 'auto',
                                }}>
                                <img height='150em' src={fishList[selectedIndex]?.image_url} />
                            </Card>
                            <Card variant="outlined"
                                sx={{
                                    width: '75%',
                                    height: '100%',
                                    margin: 'auto',
                                    backgroundColor: '#b2dfdb'
                                }}>
                                <p><strong>Habitat:</strong> {fishList[selectedIndex]?.habitat}</p>
                                <br />
                                <p><strong>Feeding Preferences:</strong> {fishList[selectedIndex]?.feeding_preferences}</p>
                            </Card>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>)
}
export default FishPage;