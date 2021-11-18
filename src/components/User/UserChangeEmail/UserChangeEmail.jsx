import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { Button, TextField, FormControl, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box } from '@mui/material';
import { useState } from "react";

function UserChangeEmail() {
    const user = useSelector(store => store.user);
    const history = useHistory();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [dialogText, setDialogText] = useState(``);
    const [newEmail, setNewEmail] = useState(``);
    const [newEmailConf, setNewEmailConf] = useState(``);
    console.log(`new email`, newEmail);
    console.log(`new email confirmation`, newEmailConf);


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`clicked sub`);
        if (newEmail !== newEmailConf) {
            console.log(`no!`);
            setDialogText(`Please make sure that the email addresses that you've entered match!`)
            handleOpen();
        }
        else if (newEmail === ``) {
            console.log(`no!`);
            setDialogText(`Please enter in a value for email address! Input field cannot be blank!`)
            handleOpen();
        }
        else if (newEmail === user.email) {
            console.log(`no!`);
            setDialogText(`Please enter a different email address! Your new email address cannot be the same as your current one!`)
            handleOpen();
        }
        else {
            console.log(`match`);
            dispatch({ type: `CHANGE_EMAIL`, payload: {newEmail} });
        }
    }

    const handleOpen = () => {
        console.log(`open`);
        setOpen(true);

    }

    const handleClose = () => {
        console.log(`close`);
        setOpen(false);
        setNewEmail(``);
        setNewEmailConf(``);
    }
    return (<>
        <h1>CHANGE EMAIL</h1>
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
            <h3>Current Email</h3>
            <h4>{user.email}</h4>
            <br />


            <form onSubmit={handleSubmit}>
                <FormControl sx={{ width: '80%' }}>
                    <TextField
                        required
                        placeholder="Enter New Email"
                        helperText="Enter New Email"
                        type="text"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />

                    <TextField
                        required
                        placeholder="Re-Type New Email"
                        helperText="Confirm New Email"
                        type="text"
                        value={newEmailConf}
                        onChange={(e) => setNewEmailConf(e.target.value)}
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
export default UserChangeEmail;