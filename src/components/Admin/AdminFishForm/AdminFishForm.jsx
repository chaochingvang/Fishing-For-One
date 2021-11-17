import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
//mui
import { TextField, FormControl, Button } from '@mui/material';
import { useState } from 'react';

function AdminFishForm() {
    const history = useHistory();
    const dispatch = useDispatch();

    const defaultState = {
        name: ``,
        description: ``,
        image_url: ``,
    }

    const [fishInput, setFishInput] = useState(defaultState);


    const handleSubmit = () => {
        console.log(`clicked`);

        if ((fishInput.name === ``) ||
            (fishInput.description === ``) ||
            (fishInput.image_url === ``)) {
            alert(`Please enter all fields`);
        }
        else {
            dispatch({ type: `ADD_FISH`, payload: { fishInput, history } });
        }

    }

    console.log(fishInput);

    return (<>
        <h1>Admin Fish FOrm</h1>

        <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth={true}>
                    <TextField
                        required
                        helperText="Name (* required)"
                        placeholder="Name"
                        type="text"
                        value={fishInput.name}
                        onChange={(e) => setFishInput({ ...fishInput, name: e.target.value })}
                    />
                    <TextField
                        required
                        multiline
                        maxRows={3}
                        minRows={3}
                        helperText="Description (* required)"
                        placeholder="Description"
                        type="text"
                        value={fishInput.description}
                        onChange={(e) => setFishInput({ ...fishInput, description: e.target.value })}
                    />
                    <TextField
                        required
                        helperText="Image URL (* required)"
                        placeholder="Image URL"
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
    </>)
}

export default AdminFishForm