import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import {
    Button,
    TextField,
    FormControl,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Box,
    Typography,
} from '@mui/material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useEffect, useState } from "react";

function UserNewPW() {
    const history = useHistory();
    const dispatch = useDispatch();

    const isSuccessful = useSelector(store => store.success.isSuccessful);


    const [open, setOpen] = useState(false);
    const [dialogText, setDialogText] = useState(``);
    const [newPW, setNewPW] = useState(``);
    const [newPWConf, setNewPWConf] = useState(``);

    useEffect(() => {
        status();
    }, [isSuccessful]);

    const handleOpen = () => {
        console.log(`open`);
        setOpen(true);

    }

    const handleClose = () => {
        console.log(`close`);
        setOpen(false);
        setNewPW(``);
        setNewPWConf(``);

        if (isSuccessful) {
            history.push(`/user`);
            dispatch({ type: `RESET_IS_SUCCESSFUL` });
        }
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
            dispatch({ type: `CHANGE_PASSWORD`, payload: { newPW } });
        }
    }

    const status = () => {
        if (isSuccessful) {
            setDialogText(`Password successfully changed!`)
            handleOpen();
        }
    }

    console.log(`isSuccess`, isSuccessful);

    return (<>
        <Box sx={{ padding: "1em" }}>
            <Button
                startIcon={<ArrowBackOutlinedIcon />}
                variant="contained"
                onClick={() => history.push(`/user`)}
            >
                Cancel
            </Button>
        </Box>
        <Box sx={{
            textAlign: "center",
            margin: "auto",
            paddingBottom: "1em"
        }}>
            <Typography variant="h3">Change Password</Typography>
        </Box>
        <Box sx={{
            margin: "auto",
            textAlign: "center"
        }}>
            <form onSubmit={handleSubmit}>
                <FormControl sx={{ width: "80%" }}>
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
        </Box>
    </>)
}

export default UserNewPW;