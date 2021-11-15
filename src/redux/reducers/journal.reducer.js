import { combineReducers } from 'redux';

const setJournal = (state = [], action) => {
    switch (action.type) {
        case 'SET_JOURNAL':
            return action.payload;
        default:
            return state;
    }
}


export default combineReducers({
    setJournal,
});