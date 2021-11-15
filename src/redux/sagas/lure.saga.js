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





function* lureSaga() {
    yield takeLatest('FETCH_LURE', fetchLure)
}


export default lureSaga;