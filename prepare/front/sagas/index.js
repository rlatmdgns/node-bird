import { func } from 'prop-types';
import { all, fork, call, put, take } from 'redux-saga/effects'
import axios from 'axios';

//login
function loginAPI(data){
  return axios.post('/api/loginAPI', data);
}
function* login(action) {
  try{
    const result = yield call(loginAPI, action.data)
    yield put ({
      type: 'LOG_IN_SUCCESS',
      data: result.data
    })
  }catch(err){
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.data
    })
  }
}

//logout
function logoutAPI(){
  return axios.post('/api/logoutAPI');
}
function* logout() {
  try{
    yield put ({
      type: 'LOG_OUT_REQUEST',
      data: result.data
    })
    const result = yield call(logoutAPI)
    yield put ({
      type: 'LOG_OUT_SUCCESS',
      data: result.data
    })
  }catch(err){
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.data
    })
  }
}

function* watchLogIn(){
  yield take('LOG_IN_REQUEST', login);
}

function* watchLogOut(){
  yield take('LOG_OUT_REQUEST', logout);
}

function* watchAddPost() {
  yield take("ADD_POST_REQUEST")
}

//addPost
function addPostAPI(data){
  return axios.post('/api/post', data);
}
function* addPost(action) {
  try{
    yield put ({
      type: 'ADD_POST_REQUEST',
      data: result.data
    })
    const result = yield call(addPostAPI, action.data)
    yield put ({
      type: 'ADD_POST_SUCCESS',
      data: result.data
    })
  }catch(err){
    yield put({
      type: 'ADD_POST_FAILURE',
      data: err.data
    })
  }
}

function* watchLogIn(){
  yield take('LOG_IN_REQUEST', login);
}

function* watchLogOut(){
  yield take('LOG_OUT_REQUEST', logout);
}

function* watchAddPost() {
  yield take("ADD_POST_REQUEST", addPost)
}

export default function* rootSaga(){
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchAddPost),
  ])
}

