import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
//mui
import { TextField, FormControl, Button } from '@mui/material';
import { useState } from 'react';


function AdminLureEdit() {
    const history = useHistory();
    const dispatch = useDispatch();
    const lure = useSelector(store => store.lure.selectedLure);

    const defaultState = {
        id:  lure.id,
        name: lure.name,
        description: lure.description,
        image_url: lure.image_url,
    }

    const [lureInput, setLureInput] = useState(defaultState);


    const handleSubmit = () => {
        console.log(`clicked`);
        dispatch({type: `EDIT_LURE`, payload: {lureInput, history}})
    }

    console.log(lure);

    return (<>
        <h1>LURE EDIT</h1>
        {(lure.status === 'empty')
            ? <>
                <Button
                    variant="contained"
                    onClick={() => history.push('/admin/lure')}
                >
                    Back to Lure List
                </Button>
                <h1>NO LURE SELECTED</h1>
            </>
            :
            <>
                <Button
                    variant="contained"
                    onClick={() => history.push('/admin/lure')}
                >
                    Back to Lure List
                </Button>
                <div className="formContainer">
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth={true}>
                            <TextField
                                required
                                helperText="Name"
                                type="text"
                                value={lureInput.name}
                                onChange={(e) => setLureInput({ ...lureInput, name: e.target.value })}
                            />
                            <TextField
                                required
                                multiline
                                maxRows={3}
                                minRows={3}
                                helperText="Description"
                                type="text"
                                value={lureInput.description}
                                onChange={(e) => setLureInput({ ...lureInput, description: e.target.value })}
                            />
                            <TextField
                                required
                                helperText="Image URL"
                                type="text"
                                value={lureInput.image_url}
                                onChange={(e) => setLureInput({ ...lureInput, image_url: e.target.value })}
                            />
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                            >
                                Submit Changes
                            </Button>
                        </FormControl>
                    </form>

                </div>
            </>
        }


    </>)
}
export default AdminLureEdit;