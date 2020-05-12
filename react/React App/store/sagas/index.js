import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { LOGIN_SUCCESS } from "../actions";
import { fetchData } from "../api/api.js";
import * as types from '../types';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getApiData(action) {
  try {
   // const data = yield call(fetchData);
   // yield put(receiveApiData(data));
   
   const user = yield call(fetchData, action.payload);
   console.log(user);
  } catch (e) {
    console.log(e);
  }
}

export default function* mySaga() {
  yield takeLatest(types.LOGIN_SUCCESS, getApiData);
}