import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
//mui
import { TextField, FormControl, Button } from '@mui/material';
import { useState } from 'react';


function AdminFishEdit() {
    const history = useHistory();
    const dispatch = useDispatch();
    const fish = useSelector(store => store.fish.selectedFish);

    const defaultState = {
        id:  fish.id,
        name: fish.name,
        description: fish.description,
        image_url: fish.image_url,
    }

    const [fishInput, setFishInput] = useState(defaultState);


    const handleSubmit = () => {
        console.log(`clicked`);
        dispatch({type: `EDIT_FISH`, payload: {fishInput, history}})
    }

    console.log(fish);

    return (<>
        <h1>FISH EDIT</h1>
        {(fish.status === 'empty')
            ? <>
                <Button
                    variant="contained"
                    onClick={() => history.push('/admin/fish')}
                >
                    Back to Fish List
                </Button>
                <h1>NO FISH SELECTED</h1>
            </>
            :
            <>
                <Button
                    variant="contained"
                    onClick={() => history.push('/admin/fish')}
                >
                    Back to Fish List
                </Button>
                <div className="formContainer">
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth={true}>
                            <TextField
                                required
                                helperText="Name"
                                type="text"
                                value={fishInput.name}
                                onChange={(e) => setFishInput({ ...fishInput, name: e.target.value })}
                            />
                            <TextField
                                required
                                multiline
                                maxRows={3}
                                minRows={3}
                                helperText="Description"
                                type="text"
                                value={fishInput.description}
                                onChange={(e) => setFishInput({ ...fishInput, description: e.target.value })}
                            />
                            <TextField
                                required
                                helperText="Image URL"
                                type="text"
                                value={fishInput.image_url}
                                onChange={(e) => setFishInput({ ...fishInput, image_url: e.target.value })}
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
export default AdminFishEdit;