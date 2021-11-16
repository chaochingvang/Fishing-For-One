import { useState } from "react";
import { useSelector } from "react-redux";

import { Button, Box, Card, TextField, Autocomplete, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Search from "@mui/icons-material/Search";

import './FishPage.css';
import { textAlign } from "@mui/system";

function FishPage() {
    const fishList = useSelector(store => store.fish.fishList);
    const [selectedIndex, setSelectedIndex] = useState(0);

    //adding labels into each fish in fishList to allow for autocomplete search
    const searchFishList = fishList.map(fish => ({ ...fish, label: fish.name }))

    const [searchItem, setSearchItem] = useState(searchFishList[selectedIndex]);



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
            <h1>Fish Page</h1>

            <Autocomplete
                disablePortal
                value={searchItem}
                id="combo-box-demo"
                isOptionEqualToValue={(option, value) => option.id === value.id}
                options={searchFishList}
                sx={{
                    width: '80%',
                    margin: 'auto',
                }}

                renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps, startAdornment: (<><InputAdornment position="start"><SearchIcon /></InputAdornment> {params.InputProps.startAdornment}</>) }} label="Fish" />}
                // newValue is the value of the option selected
                onChange={(event, newValue) => handleChange(newValue)}
            />

            <table style={{
                textAlign: "center"
            }}>
                <tbody style={{ border: "1px solid black" }}>
                    <tr style={{ border: "1px solid black" }}>
                        <td>
                            <Button
                                variant="contained"
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                        </td>
                        <td style={{
                            border: "1px solid black",
                            width: '100%'
                        }}>
                            <Card variant="outlined"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    margin: 'auto',
                                    backgroundColor: '#b2dfdb'
                                }}>
                                <img src={fishList[selectedIndex]?.image_url} />
                                <h3>{fishList[selectedIndex]?.id}</h3>
                                <h3>{fishList[selectedIndex]?.name}</h3>
                                <h5>{fishList[selectedIndex]?.description}</h5>
                            </Card>
                        </td>
                        <td>
                            <Button
                                variant="contained"
                                onClick={handleNext}
                            >
                                Next
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>)
}
export default FishPage;