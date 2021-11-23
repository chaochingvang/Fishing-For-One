import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
//mui
import { TextField, FormControl, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useState, useEffect } from 'react';


function AdminFishEdit() {
    const history = useHistory();
    const dispatch = useDispatch();
    const fish = useSelector(store => store.fish.selectedFish);

    //success alert states
    const isSuccessful = useSelector(store => store.success.isSuccessful);
    const [dialogText, setDialogText] = useState(``);
    const [open, setOpen] = useState(false);

    const defaultState = {
        id:  fish.id,
        name: fish.name,
        habitat: fish.habitat,
        feeding_preferences: fish.feeding_preferences,
        image_url: fish.image_url,
    }

    const [fishInput, setFishInput] = useState(defaultState);


    const handleSubmit = () => {
        console.log(`clicked`);
        dispatch({ type: `EDIT_FISH`, payload: fishInput });
    }


    //success alert code block
    useEffect(() => {
        status();
    }, [isSuccessful]);

    const status = () => {
        if (isSuccessful) {
            setDialogText(`${fishInput.name} successfully edited!`)
            handleOpen();
        }
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);

        if (isSuccessful) {
            history.push(`/admin/fish`);
            dispatch({ type: `RESET_IS_SUCCESSFUL` });
        }
    }
    //end success alert code block

    return (<>
        <h1>FISH EDIT</h1>
        {(fish.status === 'empty')
            ? <>
                <Button
                    variant="contained"
                    onClick={() => history.push('/admin/fish')}
                >
                    Back to Fish List
                </Button>
                <h1>NO FISH SELECTED</h1>
            </>
            :
            <>
                <Button
                    variant="contained"
                    onClick={() => history.push('/admin/fish')}
                >
                    Back to Fish List
                </Button>
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