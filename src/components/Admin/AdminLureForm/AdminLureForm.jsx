import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
//mui
import { TextField, FormControl, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useState, useEffect } from 'react';

function AdminLureForm() {
    const history = useHistory();
    const dispatch = useDispatch();
    //success alert states
    const isSuccessful = useSelector(store => store.success.isSuccessful);
    const [dialogText, setDialogText] = useState(``);
    const [open, setOpen] = useState(false);

    const defaultState = {
        name: ``,
        description: ``,
        image_url: ``,
    }

    const [lureInput, setLureInput] = useState(defaultState);

    useEffect(() => {
        status();
    }, [isSuccessful]);

    const status = () => {
        if (isSuccessful) {
            setDialogText(`${lureInput.name} successfully added!`)
            handleOpen();
        }
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);

        if (isSuccessful) {
            history.push(`/admin/lure`);
            dispatch({ type: `RESET_IS_SUCCESSFUL` });
        }
    }

    const handleSubmit = () => {
        console.log(`clicked`);

        if (lureInput.name === ``) {
            console.log(`no!`);
            setDialogText(`Lure Name field cannot be blank! Please enter a name for the lure.`)
            handleOpen();
        }
        else if (lureInput.description === ``) {
            console.log(`no!`);
            setDialogText(`Lure description field cannot be blank! Please enter a description for the lure!`)
            handleOpen();
        }
        else if (lureInput.image_url === ``) {
            console.log(`no!`);
            setDialogText(`Image of lure is required! Please enter an image URL for the lure.`)
            handleOpen();
        }
        else {
            dispatch({ type: `ADD_LURE`, payload: lureInput });
        }
    }

    console.log(lureInput);

    return (<>
        <h1>Admin Lure FOrm</h1>

        <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth={true}>
                    <TextField
                        required
                        helperText="Name (* required)"
                        placeholder="Name"
                        type="text"
                        value={lureInput.name}
                        onChange={(e) => setLureInput({ ...lureInput, name: e.target.value })}
                    />
                    <TextField
                        required
                        multiline
                        maxRows={3}
                        minRows={3}
                        helperText="Description (* required)"
                        placeholder="Description"
                        type="text"
                        value={lureInput.description}
                        onChange={(e) => setLureInput({ ...lureInput, description: e.target.value })}
                    />
                    <TextField
                        required
                        helperText="Image URL (* required)"
                        placeholder="Image URL"
                        type="text"
                        value={lureInput.image_url}
                        onChange={(e) => setLureInput({ ...lureInput, image_url: e.target.value })}
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

export default AdminLureForm