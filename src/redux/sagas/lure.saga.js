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
        yield axios.put(`/api/lure/${action.payload.id}`, action.payload)
        yield put({ type: `FETCH_LURE` });
        yield put({ type: `CHANGE_SUCCESSFUL` });
    } catch (err) {
        console.error(err);
        yield put({ type: `ERROR_EDIT_LURE` });
    }
}

function* addLure(action) {
    try {
        console.log(`in addLure saga`);
        yield axios.post(`/api/lure`, action.payload);
        yield put({ type: `FETCH_LURE` });
        yield put({ type: `CHANGE_SUCCESSFUL` });
    } catch (err){
        console.error(err);
        yield put({ type: `ERROR_ADD_LURE` });
    }
}

function* fetchLureCount(action) {
    try {
        if (action.payload === undefined) {
            console.log(`action.payload is undefined`);
            const response = yield axios.get(`/api/lure/count/${`first_row`}`);
            console.log(response.data);
            yield put({ type: `SET_LURE_COUNT`, payload: response.data });
        }
        else {
            console.log(`action.payload is not undefined and is`, action.payload)
            const response = yield axios.get(`/api/lure/count/${action.payload}`);
            console.log(response.data);
            yield put({ type: `SET_LURE_COUNT`, payload: response.data });
        }

    } catch (err) {
        console.error(err);
        yield put({ type: `ERROR_FETCH_LURE_COUNT` });
    }
}

function* lureSaga() {
    yield takeLatest('FETCH_LURE', fetchLure);
    yield takeLatest(`DELETE_LURE`, deleteLure);
    yield takeLatest(`EDIT_LURE`, editLure);
    yield takeLatest(`ADD_LURE`, addLure);
    yield takeLatest(`FETCH_LURE_COUNT`, fetchLureCount);
}


export default lureSaga;