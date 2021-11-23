import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
//mui
import { TextField, FormControl, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useState, useEffect } from 'react';


function AdminLureEdit() {
    const history = useHistory();
    const dispatch = useDispatch();
    const lure = useSelector(store => store.lure.selectedLure);
    //success alert states
    const isSuccessful = useSelector(store => store.success.isSuccessful);
    const [dialogText, setDialogText] = useState(``);
    const [open, setOpen] = useState(false);

    const [render, setRender] = useState(false);

    const defaultState = {
        id:  lure.id,
        name: lure.name,
        description: lure.description,
        image_url: lure.image_url,
    }

    const [lureInput, setLureInput] = useState(defaultState);


    const handleSubmit = () => {
        console.log(`clicked`);
        dispatch({type: `EDIT_LURE`, payload: lureInput})
    }

    //success alert code block
    useEffect(() => {
        status();
        setRender(!render)
    }, [isSuccessful]);

    const status = () => {
        if (isSuccessful) {
            setDialogText(`${lureInput.name} successfully edited!`)
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
    //end success alert code block
    console.log(lure);

    return (<>
        <h1>LURE EDIT</h1>
        {(lure.status === 'empty')
            ? <>
                <Button
                    variant="contained"
                    onClick={() => history.push('/admin/lure')}
                >
                    Back to Lure List
                </Button>
                <h1>NO LURE SELECTED</h1>
            </>
            :
            <>
                <Button
                    variant="contained"
                    onClick={() => history.push('/admin/lure')}
                >
                    Back to Lure List
                </Button>
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