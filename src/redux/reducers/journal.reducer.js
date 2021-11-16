import { combineReducers } from 'redux';

const journalList = (state = [], action) => {
    switch (action.type) {
        case 'SET_JOURNAL':
            return action.payload;
        default:
            return state;
    }
}

const selectedEntry = (state = {name: 'empty'}, action) => {
    switch (action.type) {
        case 'SET_SELECTED_ENTRY':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    journalList,
    selectedEntry,
});