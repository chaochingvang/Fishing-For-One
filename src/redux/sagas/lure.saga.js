import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchLure() {
    try {
        const response = yield axios.get('/api/lure');
        yield put({ type: `SET_LURE`, payload: response.data });
    } catch (err) {
        console.error(err);
        yield put({ type: `ERROR_FETCH_LURE` })
    }
}

function* deleteLure(action) {
    try {
        yield axios.delete(`/api/lure/${action.payload}`);
        yield put({ type: `FETCH_LURE` });

    } catch (err) {
        console.error(err);
        yield put({ type: `ERROR_DELETE_LURE` });
    }
}

function* editLure(action) {
    try {
        yield axios.put(`/api/lure/${action.payload.lureInput.id}`, action.payload.lureInput)
        yield put({ type: `FETCH_LURE` });
        yield action.payload.history.push(`/admin/lure`);
    } catch (err) {
        console.error(err);
        yield put({ type: `ERROR_EDIT_LURE` });
    }
}

function* addLure(action) {
    try {
        console.log(`in addLure saga`);
        yield axios.post(`/api/lure`, action.payload.lureInput);
        yield put({ type: `FETCH_LURE` });
        yield action.payload.history.push(`/admin/lure`);
    } catch {
        console.error(err);
        yield put({ type: `ERROR_ADD_LURE` });
    }
}



function* lureSaga() {
    yield takeLatest('FETCH_LURE', fetchLure);
    yield takeLatest(`DELETE_LURE`, deleteLure);
    yield takeLatest(`EDIT_LURE`, editLure);
    yield takeLatest(`ADD_LURE`, addLure)
}


export default lureSaga;