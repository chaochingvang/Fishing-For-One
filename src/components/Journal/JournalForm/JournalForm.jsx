import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { PickerDropPane, PickerInline, PickerOverlay, client } from 'filestack-react';

//mui imports
import { TextField, FormControl, Select, MenuItem, Button, Stack, InputAdornment, Box, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { InputLabel } from '@mui/material';

import './JournalForm.css';

function JournalForm() {

    const history = useHistory();
    const dispatch = useDispatch();

    //success alert states
    const isSuccessful = useSelector(store => store.success.isSuccessful);
    const [dialogText, setDialogText] = useState(``);
    const [open, setOpen] = useState(false);
    const [openUploader, setOpenUploader] = useState(false);

    //grabbing reducers from store
    const fishList = useSelector(store => store.fish.fishList);
    const lureList = useSelector(store => store.lure.lureList);

    //setting initial state with empty fields and today's date as initial date value
    const initialState = {
        fish_id: '',
        lure_id: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        weight: '',
        length: '',
        image_url: '',
        comments: '',
    }
    const [journalInput, setJournalInput] = useState(initialState);

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log(`clicked!`);

    //     if ((journalInput.fish_id === ``) ||
    //         (journalInput.lure_id === ``)) {
    //         alert(`Please enter all the required information!`)
    //     }
    //     else {
    //         console.log(journalInput.image_url);

    //         dispatch({ type: `ADD_NEW_ENTRY`, payload: { journalInput, history } });
    //     }
    // }

    useEffect(() => {
        status();
    }, [isSuccessful]);

    const status = () => {
        if (isSuccessful) {
            setDialogText(`New journal entry successfully added!`)
            handleOpen();
        }
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);

        if (isSuccessful) {
            history.push(`/journal`);
            dispatch({ type: `RESET_IS_SUCCESSFUL` });
        }
    }

    const handleSubmit = () => {
        console.log(`clicked`);

        if (journalInput.fish_id === ``) {
            console.log(`no!`);
            setDialogText(`Fish type cannot be blank! Please select a fish type.`)
            handleOpen();
        }
        else if (journalInput.lure_id === ``) {
            console.log(`no!`);
            setDialogText(`Lure type cannot be blank! Please select a lure type!`)
            handleOpen();
        }
        else {
            dispatch({ type: `ADD_NEW_ENTRY`, payload: journalInput });
        }
    }

    const handleUploadDone = (result) => {
        setJournalInput({ ...journalInput, image_url: (result.filesUploaded[0].url) })
        // setOpenUploader(false);
    }

    console.log(journalInput);

    return (<>
        <Box sx={{ padding: "1em" }}>
            <Button
                startIcon={<ArrowBackIcon />}
                variant="contained"
                onClick={() => history.push('/journal')}
            >
                Cancel
            </Button>
        </Box>

        <div className="header">
            <Typography variant="h4">Add New Journal Entry</Typography>
        </div>

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
                    <Stack direction="row">
                        <TextField
                            sx={{width: "100%"}}
                            label="Image URL"
                            helperText="image URL (optional)"
                            value={journalInput.image_url}
                            onChange={(e) => setJournalInput({ ...journalInput, image_url: e.target.value })}
                        />
                        <IconButton
                            aria-label="upload"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                            onClick={() => setOpenUploader(true)}
                        >
                            <AddPhotoAlternateOutlinedIcon />
                            <p className="subtext">Upload Image</p>
                        </IconButton>
                    </Stack>
                    <br />
                    <TextField
                        multiline
                        maxRows={3}
                        label="Additional Notes"
                        helperText="Additional Notes (optional)"
                        value={journalInput.comments}
                        onChange={(e) => setJournalInput({ ...journalInput, comments: e.target.value })}
                    />
                    <br />
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        Submit
                    </Button>
                </FormControl>
            </form>
        </div>

        <Dialog
            open={openUploader}
            onClose={() => setOpenUploader(false)}
        >
            <DialogTitle sx={{textAlign: "center"}}>Upload Image</DialogTitle>
            <Box>
                <PickerDropPane
                    apikey={process.env.REACT_APP_FILESTACK_API_KEY}
                    onUploadDone={(result) => handleUploadDone(result)}
                />
            </Box>
        </Dialog>

        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>
                {isSuccessful ? <>SUCCESS!</> : <>ERROR!</>}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {dialogText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Back</Button>
            </DialogActions>
        </Dialog>
    </>)
}

export default JournalForm;