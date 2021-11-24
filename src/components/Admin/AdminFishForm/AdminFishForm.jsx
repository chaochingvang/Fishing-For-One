import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
//mui
import { TextField, FormControl, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useState, useEffect } from 'react';

function AdminFishForm() {
    const history = useHistory();
    const dispatch = useDispatch();

    //success alert states
    const isSuccessful = useSelector(store => store.success.isSuccessful);
    const [dialogText, setDialogText] = useState(``);
    const [open, setOpen] = useState(false);

    const defaultState = {
        name: ``,
        habitat: ``,
        feeding_preferences: ``,
        image_url: ``,
    }

    const [fishInput, setFishInput] = useState(defaultState);

    useEffect(() => {
        status();
    }, [isSuccessful]);

    const status = () => {
        if (isSuccessful) {
            setDialogText(`${fishInput.name} successfully added!`)
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

    const handleSubmit = () => {
        console.log(`clicked`);

        if (fishInput.name === ``) {
            console.log(`no!`);
            setDialogText(`Fish Name field cannot be blank! Please enter a name for the fish.`)
            handleOpen();
        }
        else if (fishInput.habitat === ``) {
            console.log(`no!`);
            setDialogText(`Fish habitat description field cannot be blank! Please enter a habitat description for the fish!`)
            handleOpen();
        }
        else if (fishInput.feeding_preferences === ``) {
            console.log(`no!`);
            setDialogText(`Fish feeding preference field cannot be blank! Please enter a feeding preference for the fish!`)
            handleOpen();
        }
        else if (fishInput.image_url === ``) {
            console.log(`no!`);
            setDialogText(`Image of fish is required! Please enter an image URL for the fish.`)
            handleOpen();
        }
        else {
            dispatch({ type: `ADD_FISH`, payload: fishInput});
        }
    }

    return (<>
        <Button
            variant="contained"
            onClick={() => history.push(`/admin/fish`)}
        >
            Back to list
        </Button>
        <h1>Admin Fish Form</h1>
       

        <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth={true}>
                    <TextField
                        required
                        helperText="Name (* required)"
                        placeholder="Name"
                        type="text"
                        value={fishInput.name}
                        onChange={(e) => setFishInput({ ...fishInput, name: e.target.value })}
                    />
                    <TextField
                        required
                        multiline
                        maxRows={3}
                        minRows={3}
                        helperText="Habitat (* required)"
                        placeholder="Habitat"
                        type="text"
                        value={fishInput.habitat}
                        onChange={(e) => setFishInput({ ...fishInput, habitat: e.target.value })}
                    />
                    <TextField
                        required
                        multiline
                        maxRows={3}
                        minRows={3}
                        helperText="Feeding Preferences (* required)"
                        placeholder="Feeding Preferences"
                        type="text"
                        value={fishInput.feeding_preferences}
                        onChange={(e) => setFishInput({ ...fishInput, feeding_preferences: e.target.value })}
                    />
                    <TextField
                        required
                        helperText="Image URL (* required)"
                        placeholder="Image URL"
                        type="text"
                        value={fishInput.image_url}
                        onChange={(e) => setFishInput({ ...fishInput, image_url: e.target.value })}
                    />
                    <Button
                        variant="contained"
                        type="submit"
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
    </>)
}

export default AdminFishForm