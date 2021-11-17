import AdminFishItem from "../AdminFishItem/AdminFishItem";
import { useSelector } from "react-redux";

//mui
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { useHistory } from "react-router";


function AdminFishList() {
    const fishList = useSelector(store => store.fish.fishList);
    const history = useHistory();

    return (<>
        <h1>Admin FIsh List</h1>

        <Button
            variant="contained"
            onClick={() => history.push(`/admin/fish/form`)}
        >
            Add New Fish
        </Button>

        <TableContainer>
            <Table sx={{
                minWidth: '70%',
                width: '90%'
            }}>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Image_URL</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {fishList.map((fish) => (
                        <AdminFishItem
                            key={fish.id}
                            fish={fish} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>


    </>)
}

export default AdminFishList;