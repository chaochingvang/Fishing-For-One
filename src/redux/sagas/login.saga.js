import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// worker Saga: will be fired on "LOGIN" actions
function* loginUser(action) {
  try {
    // clear any existing error on the login page
    yield put({ type: 'CLEAR_LOGIN_ERROR' });

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // send the action.payload as the body
    // the config includes credentials which
    // allow the server session to recognize the user
    console.log(`this is loginInfo`, action.payload.loginInfo);
    yield axios.post('/api/user/login', action.payload.loginInfo, config);
    console.log(`POSTED WITH REGISTRATION INFO`)
    // after the user has logged in
    // get the user information from the server

    //FETCH USER SAGA 
    //wanted response for conditional push on login
    const response = yield axios.get('/api/user', config);
    console.log(`GRABBED GET RESPONSE.data FROM /api/user`, response.data);
    yield put({ type: 'SET_USER', payload: response.data });

    //if user is admin, push to /admin on login
    //else push to /journal 
    if (action.payload.history !== ``) {
      if (response.data.access_level === 0) {
        yield action.payload.history.push(`/admin`);
      }
      else {
        yield action.payload.history.push(`/journal`);
      }
    }
  } catch (error) {
    console.log('Error with user login:', error);
    if (error.response.status === 401) {
      // The 401 is the error status sent from passport
      // if user isn't in the database or
      // if the username and password don't match in the database
      yield put({ type: 'LOGIN_FAILED' });
    } else {
      // Got an error that wasn't a 401
      // Could be anything, but most common cause is the server is not started
      yield put({ type: 'LOGIN_FAILED_NO_CODE' });
    }
  }
}

// worker Saga: will be fired on "LOGOUT" actions
function* logoutUser(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // when the server recognizes the user session
    // it will end the session
    yield axios.post('/api/user/logout', config);

    // now that the session has ended on the server
    // remove the client-side user object to let
    // the client-side code know the user is logged out
    yield put({ type: 'UNSET_USER' });
  } catch (error) {
    console.log('Error with user logout:', error);
  }
}

function* loginSaga() {
  yield takeLatest('LOGIN', loginUser);
  yield takeLatest('LOGOUT', logoutUser);
}

export default loginSaga;
