import AdminLureItem from "../AdminLureItem/AdminLureItem";
import { useSelector } from "react-redux";

//mui
import { Box, Typography, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { useHistory } from "react-router";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';


function AdminLureList() {
    const lureList = useSelector(store => store.lure.lureList);
    const history = useHistory();

    return (<>
        <Box sx={{ margin: "auto", textAlign: "center", paddingTop: "1em" }}>
            <Typography variant="h4">Admin Lure List</Typography>
        </Box>
        <Box sx={{
            padding: "1em",
            textAlign: "center"
        }}>
            <Button
                startIcon={<AddOutlinedIcon />}
                variant="contained"
                onClick={() => history.push(`/admin/lure/form`)}
            >
                Add New Lure
            </Button>
        </Box>

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
                        <TableCell>Technique</TableCell>
                        <TableCell>Target Fish</TableCell>
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