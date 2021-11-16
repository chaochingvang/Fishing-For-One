import { useState } from "react";
import { useSelector } from "react-redux";

import { Button, Box, Card, TextField, Autocomplete } from '@mui/material';

function FishPage() {
    const fishList = useSelector(store => store.fish.fishList);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [searchItem, setSearchItem] = useState('');

    //adding labels into each fish in fishList to allow for autocomplete search
    const searchFishList = fishList.map(fish => ({...fish, label: fish.name}))

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

    //find index of fish with fish.id = 3
    console.log(`findIndex`, fishList.findIndex(fish => fish.id === 3));
    console.log(searchFishList);

    return (<>
        <h1>Fish Page</h1>

        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={searchFishList}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Fish" />}
            // onChange returns the index of the selection
            onChange={(event) => console.log(event.target.__reactProps$zwb4i86qv["data-option-index"])}
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

        {JSON.stringify(fishList)}
    </>)
}
export default FishPage;