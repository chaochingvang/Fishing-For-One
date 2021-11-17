import { useDispatch } from 'react-redux';


//mui
import { TableCell, TableRow, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import './AdminFishItem.css';


function AdminFishItem({ fish }) {
    const dispatch = useDispatch();


    const handleEdit = (fish) => {
        console.log('clicked edit', fish);
    }

    const handleDelete = (fish) => {
        console.log('clicked delete', fish);
        const confirmation = confirm(`Are you sure you want to delete ${fish.name}?

        This action cannot be undone.`)

        if (confirmation) {
            dispatch({type: `DELETE_FISH`, payload: fish.id})
        }

    }

    return (<>
        <TableRow>
            <TableCell>{fish.id}</TableCell>
            <TableCell><img alt={fish.name} src={fish.image_url} /></TableCell>
            <TableCell>{fish.name}</TableCell>
            <TableCell>{fish.description}</TableCell>
            <TableCell>{fish.image_url}</TableCell>
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
                    onClick={() => handleDelete(fish)}
                >
                    <DeleteForeverIcon />
                    <p className="subtext">Delete</p>
                </IconButton>
            </TableCell>
        </TableRow>
    </>)
}

export default AdminFishItem;