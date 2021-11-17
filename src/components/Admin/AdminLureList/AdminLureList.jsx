import AdminLureItem from "../AdminLureItem/AdminLureItem";
import { useSelector } from "react-redux";

//mui
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { useHistory } from "react-router";


function AdminLureList() {
    const lureList = useSelector(store => store.lure.lureList);
    const history = useHistory();

    return (<>
        <h1>Admin Lure List</h1>

        <Button
            variant="contained"
            onClick={() => history.push(`/admin/lure/form`)}
        >
            Add New Lure
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
                    {lureList.map((lure) => (
                        <AdminLureItem
                            key={lure.id}
                            lure={lure} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>


    </>)
}

export default AdminLureList;