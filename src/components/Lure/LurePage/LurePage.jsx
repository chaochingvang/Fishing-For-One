import { useState } from "react";
import { useSelector } from "react-redux";

import { Button, Card, TextField, Autocomplete, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


import './LurePage.css';


function LurePage() {
    const lureList = useSelector(store => store.lure.lureList);
    const [selectedIndex, setSelectedIndex] = useState(0);

    //adding labels into each fish in fishList to allow for autocomplete search
    const searchLureList = lureList.map(lure => ({ ...lure, label: lure.name }))

    const [searchItem, setSearchItem] = useState(searchLureList[selectedIndex]);



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


    return (<>
        <div className="lurePage">
            <h1>Lure Page</h1>

            <Autocomplete
                disablePortal
                value={searchItem}
                id="combo-box-demo"
                isOptionEqualToValue={(option, value) => option.id === value.id}
                options={searchLureList}
                sx={{
                    width: '80%',
                    margin: 'auto',
                }}

                renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps, startAdornment: (<><InputAdornment position="start"><SearchIcon /></InputAdornment> {params.InputProps.startAdornment}</>) }} label="Lure" />}
                // newValue is the value of the option selected
                onChange={(event, newValue) => handleChange(newValue)}
            />

            <table style={{
                textAlign: "center"
            }}>
                <tbody>
                    <tr>
                        <td>
                            <Button
                                variant="contained"
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                        </td>
                        <td style={{
                            width: '100%'
                        }}>
                            <Card variant="outlined"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    margin: 'auto',
                                    backgroundColor: '#b2dfdb'
                                }}>
                                <img src={lureList[selectedIndex]?.image_url} />
                                <h3>{lureList[selectedIndex]?.id}</h3>
                                <h3>{lureList[selectedIndex]?.name}</h3>
                                <h5>{lureList[selectedIndex]?.description}</h5>
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
export default LurePage;