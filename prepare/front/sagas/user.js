import {
  all, fork, put, takeLatest, delay,
} from 'redux-saga/effects';
import axios from 'axios';
import {
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
  LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
  SIGN_UP_SUCCESS, SIGN_UP_REQUEST, SIGN_UP_FAILURE,
} from '../reducers/user';

// login
function loginAPI(data) {
  return axios.post('/api/loginAPI', data);
}
function* login(action) {
  try {
    // const result = yield call(loginAPI, action.data)
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

// logout
function logoutAPI() {
  return axios.post('/api/logoutAPI');
}
function* logout(action) {
  try {
    // const result = yield call(logoutAPI)
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

// sign
function signUpAPI() {
  return axios.post('/api/signUpAPI');
}
function* signUp(action) {
  try {
    // const result = yield call(logoutAPI)
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}
