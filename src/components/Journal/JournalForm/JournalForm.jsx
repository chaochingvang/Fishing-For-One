import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useState } from 'react';
import { format } from 'date-fns';


//mui imports
import { TextField, FormControl, Select, MenuItem, Button, Stack, InputAdornment } from '@mui/material';
import { InputLabel } from '@mui/material';

function JournalForm() {

    const history = useHistory();
    const dispatch = useDispatch();

    //grabbing reducers from store
    const fishList = useSelector(store => store.fish.fishList);
    const lureList = useSelector(store => store.lure.lureList);

    //setting initial state with empty fields and today's date as initial date value
    const initialState = {
        fish_id: ``,
        lure_id: ``,
        date: format(new Date(), 'yyyy-MM-dd'),
        weight: ``,
        length: ``,
        image_url: ``,
        comments: ``,
    }
    const [journalInput, setJournalInput] = useState(initialState);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`clicked!`);

        if ((journalInput.fish_id === ``) ||
            (journalInput.lure_id === ``)) {
            alert(`Please enter all the required information!`)
        }

    }

    return (<>
        
        <Button
            variant="contained"
            onClick={() => history.push('/journal')}
        >
            Cancel
        </Button>
        
        <h1>Journal FORM!</h1>


        <div><br /></div>

        <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth={true}>
                    <InputLabel id="fish">Fish Type (required *)</InputLabel>
                    <Select
                        required
                        labelId="fish"
                        id="fish-select"
                        value={journalInput.fish_id}
                        label="Fish Type (required *)"
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
                    <InputLabel id="lure">Lure Type (required *)</InputLabel>
                    <Select
                        required
                        labelId="lure"
                        id="lure-select"
                        value={journalInput.lure_id}
                        label="Lure Type (required *)"
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
                        helperText="Date Caught (required *)"
                        type="date"
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
                            label="Length"
                            type="number"
                            helperText="in inches (in) (optional)"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">in</InputAdornment>
                            }}
                            value={journalInput.length}
                            onChange={(e) => setJournalInput({ ...journalInput, length: e.target.value })}
                        />
                        <br />
                        <TextField
                            label="Weight"
                            type="number"
                            helperText="in pounds (lbs) (optional)"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">lbs</InputAdornment>
                            }}
                            value={journalInput.weight}
                            onChange={(e) => setJournalInput({ ...journalInput, weight: e.target.value })}
                        />
                    </Stack>
                    <br />
                    <TextField
                        label="Image URL"
                        helperText="image URL (optional)"
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