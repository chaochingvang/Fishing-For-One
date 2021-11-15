import { combineReducers } from 'redux';

const setJournal = (state = [], action) => {
    switch (action.type) {
        case 'SET_JOURNAL':
            return action.payload;
        default:
            return state;
    }
}

const setSelectedEntry = (state = {name: 'empty'}, action) => {
    switch (action.type) {
        case 'SET_SELECTED_ENTRY':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    setJournal,
    setSelectedEntry,
});