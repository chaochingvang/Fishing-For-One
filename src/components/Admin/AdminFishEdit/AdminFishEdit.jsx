import {
    useState,
    useEffect
} from 'react';
import { Redirect } from 'react-router-dom';
import {
    useSelector,
    useDispatch
} from 'react-redux';
import { useHistory } from 'react-router';

//mui imports
import {
    TextField,
    FormControl,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Box,
    Typography
} from '@mui/material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';


function AdminFishEdit() {
    const history = useHistory();
    const dispatch = useDispatch();
    //fish is assigned the values from store reducer
    const fish = useSelector(store => store.fish.selectedFish);

    //success alert states
    const isSuccessful = useSelector(store => store.success.isSuccessful);
    const [dialogText, setDialogText] = useState(``);
    const [open, setOpen] = useState(false);

    //setting default state of fish with data from reducer
    const defaultState = {
        id: fish.id,
        name: fish.name,
        habitat: fish.habitat,
        feeding_preferences: fish.feeding_preferences,
        image_url: fish.image_url,
    }

    const [fishInput, setFishInput] = useState(defaultState);

    //send edit dispatch when form is submitted
    const handleSubmit = () => {
        console.log(`clicked`);
        dispatch({ type: `EDIT_FISH`, payload: fishInput });
    }


    //success alert code block
    // run on load and when isSuccessful changes
    useEffect(() => {
        status();
    }, [isSuccessful]);

    //changes DialogText and opens Dialog
    const status = () => {
        if (isSuccessful) {
            setDialogText(`${fishInput.name} successfully edited!`)
            handleOpen();
        }
    }

    //opens dialog
    const handleOpen = () => {
        setOpen(true);
    }

    //close dialog
    const handleClose = () => {
        setOpen(false);

        //if isSuccessful is true, push user to '/admin/fish' and dispatch reset successful
        if (isSuccessful) {
            history.push(`/admin/fish`);
            dispatch({ type: `RESET_IS_SUCCESSFUL` });
        }
    }
    //end success alert code block

    return (<>
        {/* If no fish was selected, redirect user back to list of fish */}
        {(fish.status === 'empty')
            ? <>
                <Redirect to="/admin/fish" />
            </>
            :
            <>
                {/* If a fish was selected, show below */}
                <Box sx={{ padding: "1em" }}>
                    <Button
                        startIcon={<ArrowBackOutlinedIcon />}
                        variant="contained"
                        onClick={() => history.push('/admin/fish')}
                    >
                        Back to Fish List
                    </Button>
                </Box>
                <Box sx={{ margin: "auto", textAlign: "center", paddingBottom: "1em" }}>
                    <Typography variant="h4">Edit Fish</Typography>
                </Box>
                <div className="formContainer">
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth={true}>
                            <TextField
                                required
                                helperText="Name"
                                type="text"
                                value={fishInput.name}
                                onChange={(e) => setFishInput({ ...fishInput, name: e.target.value })}
                            />
                            <TextField
                                required
                                multiline
                                maxRows={3}
                                minRows={3}
                                helperText="Habitat"
                                type="text"
                                value={fishInput.habitat}
                                onChange={(e) => setFishInput({ ...fishInput, habitat: e.target.value })}
                            />
                            <TextField
                                required
                                multiline
                                maxRows={3}
                                minRows={3}
                                helperText="Feeding Preferences"
                                type="text"
                                value={fishInput.feeding_preferences}
                                onChange={(e) => setFishInput({ ...fishInput, feeding_preferences: e.target.value })}
                            />
                            <TextField
                                required
                                helperText="Image URL"
                                type="text"
                                value={fishInput.image_url}
                                onChange={(e) => setFishInput({ ...fishInput, image_url: e.target.value })}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                onClick={handleSubmit}
                            >
                                Submit Changes
                            </Button>
                        </FormControl>
                    </form>
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>
                        {/* ifSuccessful is true, show SUCCESS else ERROR */}
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
            </>
        }


    </>)
}
export default AdminFishEdit;