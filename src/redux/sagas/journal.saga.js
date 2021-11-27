import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchJournal() {
    try {
        const response = yield axios.get('/api/journal');
        yield put({ type: `SET_JOURNAL`, payload: response.data });
    } catch (err) {
        console.error(err);
        yield put({ type: `ERROR_FETCH_JOURNAL` })
    }
}

function* addNewEntry(action) {
    try {
        yield axios.post('/api/journal', action.payload);
        yield put({ type: `FETCH_JOURNAL` });
        yield put({ type: `CHANGE_SUCCESSFUL` })
    } catch (err) {
        console.error(err);
        yield put({ type: `ERROR_ADD_NEW_ENTRY` });
    }
}




function* journalSaga() {
    yield takeLatest('FETCH_JOURNAL', fetchJournal);
    yield takeLatest('ADD_NEW_ENTRY', addNewEntry);
}



export default journalSaga;