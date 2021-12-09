import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useState } from 'react';

//mui
import {
    TableCell,
    TableRow,
    IconButton,
    Button,
    Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import './AdminFishItem.css';




function AdminFishItem({ fish }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [open, setOpen] = useState(false);

    //when form submitted dispatch and push user to url route
    const handleEdit = (fish) => {
        console.log('clicked edit', fish);
        dispatch({ type: `SELECTED_FISH`, payload: fish });
        history.push(`/admin/fish/edit`)
    }

    //open dialog
    const handleOpen = (fish) => {
        console.log('clicked delete', fish);
        setOpen(true);
    }

    //close dialog
    const handleClose = () => {
        console.log(`closing`);
        setOpen(false);
    }

    //when delete is confirmed, dispatch with fish id to delete and close dialog
    const handleDelete = (fish) => {
        console.log(fish)
        dispatch({ type: `DELETE_FISH`, payload: fish.id });
        setOpen(false);
    }

    return (<>
        <TableRow>
            <TableCell>{fish.id}</TableCell>
            <TableCell><img alt={fish.name} src={fish.image_url} /></TableCell>
            <TableCell>{fish.name}</TableCell>
            <TableCell>{fish.habitat}</TableCell>
            <TableCell>{fish.feeding_preferences}</TableCell>
            <TableCell>
                <IconButton
                    aria-label="edit"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    onClick={() => handleEdit(fish)}
                >
                    <EditIcon />
                    <p className="subtext">Edit</p>
                </IconButton>
            </TableCell>
            <TableCell>
                <IconButton
                    aria-label="delete"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    onClick={() => handleOpen(fish)}
                >
                    <DeleteForeverIcon />
                    <p className="subtext">Delete</p>
                </IconButton>
            </TableCell>
        </TableRow>


        {/* Delete confirmation dialog */}
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>
                {`Delete ${fish.name}?`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this fish: <strong>{fish.name}</strong>? <br />
                    This action cannot be undone and the changes will be permanent.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Stack direction="row" spacing={5} sx={{ margin: 'auto' }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={(e) => handleDelete(fish)}>Confirm</Button>
                </Stack>
            </DialogActions>
        </Dialog>
    </>)
}

export default AdminFishItem;