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
        yield axios.delete(`/api/fish/${action.payload}`);
        yield put({ type: `FETCH_FISH` });

    } catch (err) {
        console.error(err);
        yield put({ type: `ERROR_DELETE_FISH` });
    }
}

function* editFish(action) {
    try {
        yield axios.put(`/api/fish/${action.payload.id}`, action.payload)
        yield put({ type: `FETCH_FISH` });
        yield put({ type: `CHANGE_SUCCESSFUL` })
    } catch (err) {
        console.error(err);
        yield put({ type: `ERROR_EDIT_FISH` });
    }
}

function* addFish(action) {
    try {
        console.log(`in addFish saga`);
        yield axios.post(`/api/fish`, action.payload);
        yield put({ type: `FETCH_FISH` });
        yield put({type: `CHANGE_SUCCESSFUL`})
    } catch (err) {
        console.error(err);
        yield put({ type: `ERROR_ADD_FISH` });
    }
}

function* fetchFishCount(action) {
    try {
        if (action.payload === undefined) {
            console.log(`action.payload is undefined`);
            const response = yield axios.get(`/api/fish/count/${`first_row`}`);
            console.log(response.data);
            yield put({ type: `SET_FISH_COUNT`, payload: response.data });
        }
        else {
            console.log(`action.payload is not undefined and is`, action.payload)
            const response = yield axios.get(`/api/fish/count/${action.payload}`);
            console.log(response.data);
            yield put({ type: `SET_FISH_COUNT`, payload: response.data });
        }
        
    } catch (err) {
        console.error(err);
        yield put({ type: `ERROR_FETCH_FISH_COUNT` });
    }
}

function* fishSaga() {
    yield takeLatest(`FETCH_FISH`, fetchFish);
    yield takeLatest(`DELETE_FISH`, deleteFish);
    yield takeLatest(`EDIT_FISH`, editFish);
    yield takeLatest(`ADD_FISH`, addFish)
    yield takeLatest(`FETCH_FISH_COUNT`, fetchFishCount);
}


export default fishSaga;