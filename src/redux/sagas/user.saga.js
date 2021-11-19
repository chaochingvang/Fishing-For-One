import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* changeEmail(action) {
  try {
    console.log(action.payload);
    yield axios.put(`/api/user/changeEmail`, action.payload);
    yield put({ type: `FETCH_USER` });
    yield put({ type: `CHANGE_SUCCESSFUL` });
  } catch (err) {
    console.error(`ERROR w/ changeEmail saga`, err)
    yield put({ type: `ERROR_CHANGE_EMAIL` });
  }
}

function* changePassword(action) {
  try {
    console.log(`this is newPW`, action.payload);
    yield axios.put(`/api/user/changePassword`, action.payload);
    yield put({ type: `FETCH_USER` });
    yield put({ type: `CHANGE_SUCCESSFUL` });
  } catch (err) {
    console.error(`ERROR w/ changePassword saga`, err);
    yield put({ type: `ERROR_CHANGE_PASSWORD` });
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest(`CHANGE_EMAIL`, changeEmail);
  yield takeLatest(`CHANGE_PASSWORD`, changePassword);
}

export default userSaga;
