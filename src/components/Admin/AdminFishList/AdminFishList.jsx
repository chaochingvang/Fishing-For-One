import AdminFishItem from "../AdminFishItem/AdminFishItem";
import { useSelector } from "react-redux";

//mui
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

function AdminFishList() {
    const fishList = useSelector(store => store.fish.fishList);


    return (<>
        <h1>Admin FIsh List</h1>

        <TableContainer>
            <Table sx={{
                minWidth: '70%',
                maxWidth: '375px'
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