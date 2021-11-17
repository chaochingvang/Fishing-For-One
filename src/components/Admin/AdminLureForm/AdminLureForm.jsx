import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
//mui
import { TextField, FormControl, Button } from '@mui/material';
import { useState } from 'react';

function AdminLureForm() {
    const history = useHistory();
    const dispatch = useDispatch();

    const defaultState = {
        name: ``,
        description: ``,
        image_url: ``,
    }

    const [lureInput, setLureInput] = useState(defaultState);


    const handleSubmit = () => {
        console.log(`clicked`);

        if ((lureInput.name === ``) ||
            (lureInput.description === ``) ||
            (lureInput.image_url === ``)) {
            alert(`Please enter all fields`);
        }
        else {
            dispatch({ type: `ADD_LURE`, payload: { lureInput, history } });
        }

    }

    console.log(lureInput);

    return (<>
        <h1>Admin Lure FOrm</h1>

        <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth={true}>
                    <TextField
                        required
                        helperText="Name (* required)"
                        placeholder="Name"
                        type="text"
                        value={lureInput.name}
                        onChange={(e) => setLureInput({ ...lureInput, name: e.target.value })}
                    />
                    <TextField
                        required
                        multiline
                        maxRows={3}
                        minRows={3}
                        helperText="Description (* required)"
                        placeholder="Description"
                        type="text"
                        value={lureInput.description}
                        onChange={(e) => setLureInput({ ...lureInput, description: e.target.value })}
                    />
                    <TextField
                        required
                        helperText="Image URL (* required)"
                        placeholder="Image URL"
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
    </>)
}

export default AdminLureForm