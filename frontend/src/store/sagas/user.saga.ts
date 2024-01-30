import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

import { AppActions } from "../../store";
import { Actions } from "../../store/slices";
import { IAddUser, ResponseGenerator } from "../../types";
import api from "../../utils/api";

export function* getUserSaga() {
  try {
    yield put(Actions.loading.startLoading());
    const result: ResponseGenerator = yield call(
      async () => await api().get("/user")
    );
    if (result.data) {
      yield put(AppActions.user.getUserSuccess(result.data));
    }
  } catch (e: any) {
    yield put(
      AppActions.msg.receiveMsg({ type: 2, msg: e.response.data.message })
    );
  } finally {
    yield put(Actions.loading.endLoading());
  }
}

export function* getOneUserSaga(action: PayloadAction<string>) {
  try {
    yield put(Actions.loading.startLoading());
    const result: ResponseGenerator = yield call(
      async () => await api().get(`/user/${action.payload}`)
    );
    if (result.data) {
      yield put(AppActions.user.getOneUserSuccess(result.data));
    }
  } catch (e: any) {
    yield put(
      AppActions.msg.receiveMsg({ type: 2, msg: e.response.data.message })
    );
  } finally {
    yield put(Actions.loading.endLoading());
  }
}

export function* addUserSaga(action: PayloadAction<IAddUser>) {
  try {
    yield put(Actions.loading.startLoading());
    const result: ResponseGenerator = yield call(
      async () => await api().post("/user", action.payload)
    );
    if (result.data) {
      yield put(
        AppActions.user.addUserSuccess({
          ...action.payload,
          ...result.data,
        })
      );
      yield put(
        AppActions.msg.receiveMsg({ type: 1, msg: "Created Successfully" })
      );
    }
  } catch (e: any) {
    yield put(
      AppActions.msg.receiveMsg({ type: 2, msg: e.response.data.message })
    );
  } finally {
    yield put(Actions.loading.endLoading());
  }
}

function* userSaga() {
  yield takeLatest(Actions.user.getUserRequest.type, getUserSaga);
  yield takeLatest(Actions.user.getOneUserRequest.type, getOneUserSaga);
  yield takeLatest(Actions.user.addUserRequest.type, addUserSaga);
}

export default userSaga;
