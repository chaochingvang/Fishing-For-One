import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchFish() {
    try {
        const response = yield axios.get('/api/fish');
        yield put({ type: `SET_FISH`, payload: response.data });
    } catch (err) {
        console.error(err);
        yield put({type: `ERROR_FETCH_FISH`})
    }
}

function* deleteFish(action) {
    try {
        console.log(`in saga`);
        yield axios.delete(`/api/fish/${action.payload}`);
        yield put({ type: `FETCH_FISH` });

    } catch (err) {
        console.error(err);
        yield put({ type: `ERROR_DELETE_FISH` });
    }
}



function* fishSaga() {
    yield takeLatest(`FETCH_FISH`, fetchFish);
    yield takeLatest(`DELETE_FISH`, deleteFish)
}


export default fishSaga;