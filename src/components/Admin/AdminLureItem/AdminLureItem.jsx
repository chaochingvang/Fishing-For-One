import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

//mui
import { TableCell, TableRow, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';




function AdminLureItem({ lure }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleEdit = (lure) => {
        console.log('clicked edit', lure);
        dispatch({ type: `SELECTED_LURE`, payload: lure });
        history.push(`/admin/lure/edit`)
    }

    const handleDelete = (lure) => {
        console.log('clicked delete', lure);
        const confirmation = confirm(`Are you sure you want to delete ${lure.name}?

        This action cannot be undone.`)

        if (confirmation) {
            dispatch({ type: `DELETE_LURE`, payload: lure.id })
        }
    }

    return (<>
        <TableRow>
            <TableCell>{lure.id}</TableCell>
            <TableCell><img alt={lure.name} src={lure.image_url} /></TableCell>
            <TableCell>{lure.name}</TableCell>
            <TableCell>{lure.description}</TableCell>
            <TableCell>{lure.image_url}</TableCell>
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
                    onClick={() => handleDelete(lure)}
                >
                    <DeleteForeverIcon />
                    <p className="subtext">Delete</p>
                </IconButton>
            </TableCell>
        </TableRow>
    </>)
}

export default AdminLureItem;