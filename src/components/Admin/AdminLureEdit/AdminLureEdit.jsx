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
//mui
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

function AdminLureEdit() {
    const history = useHistory();
    const dispatch = useDispatch();
    const lure = useSelector(store => store.lure.selectedLure);

    //success alert states
    const isSuccessful = useSelector(store => store.success.isSuccessful);
    const [dialogText, setDialogText] = useState(``);
    const [open, setOpen] = useState(false);

    //set initial state for lure input
    const defaultState = {
        id: lure.id,
        name: lure.name,
        description: lure.description,
        technique: lure.technique,
        target_fish: lure.target_fish,
        image_url: lure.image_url,
    }

    const [lureInput, setLureInput] = useState(defaultState);


    const handleSubmit = () => {
        console.log(`clicked`);
        dispatch({ type: `EDIT_LURE`, payload: lureInput })
    }

    //success alert code block
    useEffect(() => {
        status();
    }, [isSuccessful]);

    // if isSuccessful is true, change dialogText and open dialog
    const status = () => {
        if (isSuccessful) {
            setDialogText(`${lureInput.name} successfully edited!`)
            handleOpen();
        }
    }

    //open dialog
    const handleOpen = () => {
        setOpen(true);
    }

    //close dialog
    const handleClose = () => {
        setOpen(false);

        //if isSuccessful is true, push user to url route and dispatch reset
        if (isSuccessful) {
            history.push(`/admin/lure`);
            dispatch({ type: `RESET_IS_SUCCESSFUL` });
        }
    }
    //end success alert code block
    console.log(lure);

    return (<>
        {(lure.status === 'empty')
            ? <>
                {/* if no lure was selected, redirect user back to url route */}
                <Redirect to="/admin/lure" />
            </>
            :
            <>
                {/* otherwise, show all below */}
                <Box sx={{ padding: "1em" }}>
                    <Button
                        startIcon={<ArrowBackOutlinedIcon />}
                        variant="contained"
                        onClick={() => history.push('/admin/lure')}
                    >
                        Back to Lure List
                    </Button>
                </Box>
                <Box sx={{ margin: "auto", textAlign: "center", paddingBottom: "1em" }}>
                    <Typography variant="h4">Edit Lure</Typography>
                </Box>
                <div className="formContainer">
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth={true}>
                            <TextField
                                required
                                helperText="Name"
                                type="text"
                                value={lureInput.name}
                                onChange={(e) => setLureInput({ ...lureInput, name: e.target.value })}
                            />
                            <TextField
                                required
                                multiline
                                maxRows={3}
                                minRows={3}
                                helperText="Description"
                                type="text"
                                value={lureInput.description}
                                onChange={(e) => setLureInput({ ...lureInput, description: e.target.value })}
                            />
                            <TextField
                                required
                                multiline
                                maxRows={3}
                                minRows={3}
                                helperText="Description"
                                type="text"
                                value={lureInput.technique}
                                onChange={(e) => setLureInput({ ...lureInput, technique: e.target.value })}
                            />
                            <TextField
                                required
                                multiline
                                maxRows={3}
                                minRows={3}
                                helperText="Description"
                                type="text"
                                value={lureInput.target_fish}
                                onChange={(e) => setLureInput({ ...lureInput, target_fish: e.target.value })}
                            />
                            <TextField
                                required
                                helperText="Image URL"
                                type="text"
                                value={lureInput.image_url}
                                onChange={(e) => setLureInput({ ...lureInput, image_url: e.target.value })}
                            />
                            <Button
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
export default AdminLureEdit;