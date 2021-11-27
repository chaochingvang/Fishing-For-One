import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
//mui
import { Typography, IconButton, Stack, Box, TextField, FormControl, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useState, useEffect } from 'react';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { PickerDropPane } from 'filestack-react';

function AdminLureForm() {
    const history = useHistory();
    const dispatch = useDispatch();
    //success alert states
    const isSuccessful = useSelector(store => store.success.isSuccessful);
    const [dialogText, setDialogText] = useState(``);
    const [open, setOpen] = useState(false);
    const [openUploader, setOpenUploader] = useState(false);


    const defaultState = {
        name: ``,
        description: ``,
        technique: ``,
        target_fish: ``,
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
        else if (lureInput.technique === ``) {
            console.log(`no!`);
            setDialogText(`Lure technique description field cannot be blank! Please enter a technique description for the lure!`)
            handleOpen();
        }
        else if (lureInput.target_fish === ``) {
            console.log(`no!`);
            setDialogText(`Targeted fish types of the lure is required! Please enter in the types of fishes the lure is intended for.`)
            handleOpen();
        }
        else {
            dispatch({ type: `ADD_LURE`, payload: lureInput });
        }
    }

    const handleUploadDone = (result) => {
        setLureInput({ ...lureInput, image_url: (result.filesUploaded[0].url) })
        setOpenUploader(false);
    }

    console.log(lureInput);

    return (<>
        <Box sx={{ padding: "1em" }}>
            <Button
                startIcon={<ArrowBackOutlinedIcon />}
                variant="contained"
                onClick={() => history.push(`/admin/lure`)}
            >
                Back to list
            </Button>
        </Box>
        <Box sx={{margin: "auto", textAlign: "center", paddingBottom: "1em"}}>
            <Typography variant="h4">Admin Lure Form</Typography>
        </Box>
        

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
                        multiline
                        maxRows={3}
                        minRows={3}
                        helperText="Technique (* required)"
                        placeholder="Technique"
                        type="text"
                        value={lureInput.technique}
                        onChange={(e) => setLureInput({ ...lureInput, technique: e.target.value })}
                    />
                    <TextField
                        required
                        multiline
                        maxRows={3}
                        minRows={3}
                        helperText="Target Fish (* required)"
                        placeholder="Target Fish"
                        type="text"
                        value={lureInput.target_fish}
                        onChange={(e) => setLureInput({ ...lureInput, target_fish: e.target.value })}
                    />
                    <Stack direction="row">
                        <TextField
                            sx={{ width: "100%" }}
                            required
                            helperText="Image URL (* required)"
                            placeholder="Image URL"
                            type="text"
                            value={lureInput.image_url}
                            onChange={(e) => setLureInput({ ...lureInput, image_url: e.target.value })}
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

        {/* image uploader pop up */}
        <Dialog
            open={openUploader}
            onClose={() => setOpenUploader(false)}
        >
            <DialogTitle sx={{ textAlign: "center" }}>Upload Image</DialogTitle>
            <Box>
                <PickerDropPane
                    apikey={process.env.REACT_APP_FILESTACK_API_KEY}
                    onUploadDone={(result) => handleUploadDone(result)}
                />
            </Box>
        </Dialog>
    </>)
}

export default AdminLureForm