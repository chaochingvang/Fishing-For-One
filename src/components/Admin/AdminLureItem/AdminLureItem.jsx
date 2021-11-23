import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useState } from 'react';

//mui
import { TableCell, TableRow, IconButton, Button, Stack } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';




function AdminLureItem({ lure }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [open, setOpen] = useState(false);

    const handleEdit = (lure) => {
        console.log('clicked edit', lure);
        dispatch({ type: `SELECTED_LURE`, payload: lure });
        history.push(`/admin/lure/edit`)
    }

    const handleOpen = (lure) => {
        console.log('clicked delete', lure);
        setOpen(true);
    }

    const handleClose = () => {
        console.log(`closing`);
        setOpen(false);
    }

    const handleDelete = (lure) => {
        console.log(lure)
        dispatch({ type: `DELETE_LURE`, payload: lure.id });
        setOpen(false);
    }

    return (<>
        <TableRow>
            <TableCell>{lure.id}</TableCell>
            <TableCell><img alt={lure.name} src={lure.image_url} /></TableCell>
            <TableCell>{lure.name}</TableCell>
            <TableCell>{lure.description}</TableCell>
            <TableCell>{lure.technique}</TableCell>
            <TableCell>{lure.target_fish}</TableCell>
            <TableCell>
                <IconButton
                    aria-label="edit"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    onClick={() => handleEdit(lure)}
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
                    onClick={() => handleOpen(lure)}
                >
                    <DeleteForeverIcon />
                    <p className="subtext">Delete</p>
                </IconButton>
            </TableCell>
        </TableRow>

        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>
                {`Delete ${lure.name}?`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this lure: <strong>{lure.name}</strong>? <br />
                    This action cannot be undone and the changes will be permanent.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Stack direction="row" spacing={5} sx={{ margin: 'auto' }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={(e) => handleDelete(lure)}>Confirm</Button>
                </Stack>
            </DialogActions>
        </Dialog>
    </>)
}

export default AdminLureItem;