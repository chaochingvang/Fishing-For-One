import { combineReducers } from 'redux';

const fishList = (state = [], action) => {
    switch (action.type) {
        case 'SET_FISH':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    fishList,
});