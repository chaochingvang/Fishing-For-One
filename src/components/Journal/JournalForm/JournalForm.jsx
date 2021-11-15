import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useState } from 'react';

//mui imports
import { TextField, FormControl, Select, MenuItem, Button, Stack } from '@mui/material';
import { InputLabel } from '@mui/material';

function JournalForm() {

    const history = useHistory();
    const dispatch = useDispatch();

    const fishList = useSelector(store => store.fish.setFish);
    const lureList = useSelector(store => store.lure.setLure);

    const initialState = {
        fish_id: ``,
        lure_id: ``,
        date: ``,
        weight: ``,
        length: ``,
        image_url: ``,
        comments: ``,
    }
    const [journalInput, setJournalInput] = useState(initialState);

    const handleSubmit = () => {
        console.log(`clicked!`);
    }

    console.log(fishList, lureList);

    return (<>
        <h1>Journal FORM!</h1>

        <button onClick={() => history.push('/journal')}>Cancel</button>
        <div><br /></div>

        <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth={true}>
                    <InputLabel id="fish">Fish Type</InputLabel>
                    <Select
                        required
                        labelId="fish"
                        id="fish-select"
                        value={journalInput.fish_id}
                        label="Fish Type"
                        onChange={(e) => setJournalInput({ ...journalInput, fish_id: e.target.value })}
                    >
                        <MenuItem
                            value={0}
                            disabled
                        >
                            Select A Fish
                        </MenuItem>
                        {fishList.map((fish) => (
                            <MenuItem
                                key={fish.id}
                                value={fish.id}
                            >
                                {fish.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <br />
                </FormControl>
                <br />
                <FormControl fullWidth={true}>
                    <InputLabel id="lure">Lure Type</InputLabel>
                    <Select
                        required
                        labelId="lure"
                        id="lure-select"
                        value={journalInput.lure_id}
                        label="Lure Type"
                        onChange={(e) => setJournalInput({ ...journalInput, lure_id: e.target.value })}
                    >
                        <MenuItem
                            value={0}
                            disabled
                        >
                            Select A Lure
                        </MenuItem>
                        {lureList.map((lure) => (
                            <MenuItem
                                key={lure.id}
                                value={lure.id}
                            >
                                {lure.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <br />
                    <TextField
                        required
                        label="Date Caught"
                        value={journalInput.date}
                        onChange={(e) => setJournalInput({ ...journalInput, date: e.target.value })}
                    />
                    <br />
                    <Stack
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        spacing={0}
                    >
                    <TextField
                        required
                        label="Length"
                        value={journalInput.length}
                        onChange={(e) => setJournalInput({ ...journalInput, length: e.target.value })}
                    />
                    <br />
                    <TextField
                        required
                        label="Weight"
                        value={journalInput.weight}
                        onChange={(e) => setJournalInput({ ...journalInput, weight: e.target.value })}
                    />
                    </Stack>
                    <br />
                    <TextField
                        required
                        label="Image URL"
                        value={journalInput.image_url}
                        onChange={(e) => setJournalInput({ ...journalInput, image_url: e.target.value })}
                    />
                    <br />
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </FormControl>
            </form>
        </div>
    </>)
}

export default JournalForm;