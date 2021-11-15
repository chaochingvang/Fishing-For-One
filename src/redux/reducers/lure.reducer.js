import { combineReducers } from 'redux';

const setLure = (state = [], action) => {
    switch (action.type) {
        case 'SET_LURE':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    setLure,
});