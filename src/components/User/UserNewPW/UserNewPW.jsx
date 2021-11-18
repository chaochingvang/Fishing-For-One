import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { Button, TextField, FormControl, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box } from '@mui/material';
import { useState } from "react";

function UserNewPW() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [dialogText, setDialogText] = useState(``);
    const [newPW, setNewPW] = useState(``);
    const [newPWConf, setNewPWConf] = useState(``);

    const handleOpen = () => {
        console.log(`open`);
        setOpen(true);

    }

    const handleClose = () => {
        console.log(`close`);
        setOpen(false);
        setNewPW(``);
        setNewPWConf(``);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`clicked sub`);
        if (newPW !== newPWConf) {
            console.log(`no!`);
            setDialogText(`Please make sure you've entered the same password for both fields!`)
            handleOpen();
        }
        else if (newPW === ``) {
            console.log(`no!`);
            setDialogText(`Your new password cannot be blank! Please enter in a new password.`)
            handleOpen();
        }
        else {
            console.log(`match!`);
        }
    }

    return (<>

        <Button
            variant="contained"
            onClick={() => history.push(`/user`)}
        >
            Cancel
        </Button>
        <Box sx={{
            margin: 'auto',
            textAlign: 'center'
        }}>

            <h1>Change PW</h1>

            <form onSubmit={handleSubmit}>
                <FormControl sx={{ width: '80%' }}>
                    <TextField
                        required
                        placeholder="Enter New Password"
                        helperText="Enter New Password"
                        type="password"
                        value={newPW}
                        onChange={(e) => setNewPW(e.target.value)}
                    />

                    <TextField
                        required
                        placeholder="Re-Type New Password"
                        helperText="Confirm New Password"
                        type="password"
                        value={newPWConf}
                        onChange={(e) => setNewPWConf(e.target.value)}
                    />
                    <Button type="submit" variant="contained" onClick={handleSubmit}>Submit Changes</Button>
                </FormControl>
            </form>

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    ERROR!
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
        </Box>
    </>)
}

export default UserNewPW;