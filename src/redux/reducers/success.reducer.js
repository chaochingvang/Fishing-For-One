import { combineReducers } from 'redux';

const isSuccessful = (state = false, action) => {
    switch (action.type) {
        case `CHANGE_SUCCESSFUL`:
            return true;
        case `RESET_IS_SUCCESSFUL`:
            return false;
        default:
            return state;
    }
}



export default combineReducers({
    isSuccessful,
});