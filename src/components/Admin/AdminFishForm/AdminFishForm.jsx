import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
//mui
import { Typography, IconButton, Stack, Box, TextField, FormControl, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useState, useEffect } from 'react';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { PickerDropPane } from 'filestack-react';


function AdminFishForm() {
    const history = useHistory();
    const dispatch = useDispatch();

    //success alert states
    const isSuccessful = useSelector(store => store.success.isSuccessful);
    const [dialogText, setDialogText] = useState(``);
    const [open, setOpen] = useState(false);
    const [openUploader, setOpenUploader] = useState(false);

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
            dispatch({ type: `ADD_FISH`, payload: fishInput });
        }
    }

    const handleUploadDone = (result) => {
        setFishInput({ ...fishInput, image_url: (result.filesUploaded[0].url) })
        setOpenUploader(false);
    }

    return (<>
        <Box sx={{ padding: "1em" }}>
            <Button
                startIcon={<ArrowBackOutlinedIcon />}
                variant="contained"
                onClick={() => history.push(`/admin/fish`)}
            >
                Back to list
            </Button>
        </Box>
        <Box sx={{ margin: "auto", textAlign: "center", paddingBottom: "1em" }}>
            <Typography variant="h4">Admin Fish Form</Typography>
        </Box>


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
                    <Stack direction="row">
                        <TextField
                            sx={{width: "100%"}}
                            required
                            helperText="Image URL (* required)"
                            placeholder="Image URL"
                            type="text"
                            value={fishInput.image_url}
                            onChange={(e) => setFishInput({ ...fishInput, image_url: e.target.value })}
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

export default AdminFishForm