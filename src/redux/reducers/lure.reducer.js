import { combineReducers } from 'redux';

const lureList = (state = [], action) => {
    switch (action.type) {
        case 'SET_LURE':
            return action.payload;
        default:
            return state;
    }
}

const selectedLure = (state = { status: 'empty' }, action) => {
    switch (action.type) {
        case 'SELECTED_LURE':
            return action.payload;
        default:
            return state;
    }
}

const lureCount = (state = [], action) => {
    switch (action.type) {
        case 'SET_LURE_COUNT':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    lureList,
    selectedLure,
    lureCount,
});