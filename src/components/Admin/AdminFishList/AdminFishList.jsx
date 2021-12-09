import AdminFishItem from "../AdminFishItem/AdminFishItem";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

//mui
import {
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Box,
    Typography
} from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';


function AdminFishList() {
    //fishList is from DB
    const fishList = useSelector(store => store.fish.fishList);
    const history = useHistory();

    return (<>

        <Box sx={{ margin: "auto", textAlign: "center", paddingTop: "1em" }}>
            <Typography variant="h4">Admin Fish List</Typography>
        </Box>
        <Box sx={{
            padding: "1em",
            textAlign: "center"
        }}>
            <Button
                startIcon={<AddOutlinedIcon />}
                variant="contained"
                onClick={() => history.push(`/admin/fish/form`)}
            >
                Add New Fish
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
                        <TableCell>Habitat</TableCell>
                        <TableCell>Feeding Preferences</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* maps over list of fish in fishList array and pass as prop into AdminFishItem component */}
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