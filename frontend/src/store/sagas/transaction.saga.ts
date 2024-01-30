import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

import { AppActions } from "../../store";
import { Actions } from "../../store/slices";
import { IAddTransaction, ResponseGenerator } from "../../types";
import api from "../../utils/api";

export function* getTransactionSaga(action: PayloadAction<string>) {
  try {
    yield put(Actions.loading.startLoading());
    const result: ResponseGenerator = yield call(
      async () => await api().get(`/transaction/${action.payload}`)
    );
    if (result.data) {
      yield put(AppActions.transaction.getTransactionSuccess(result.data));
    }
  } catch (e: any) {
    yield put(AppActions.msg.receiveMsg({ type: 2, msg: e.response.data.msg }));
  } finally {
    yield put(Actions.loading.endLoading());
  }
}

export function* addTransactionSaga(action: PayloadAction<IAddTransaction>) {
  try {
    yield put(Actions.loading.startLoading());
    const result: ResponseGenerator = yield call(
      async () => await api().post("/transaction", action.payload)
    );
    if (result.data) {
      yield put(AppActions.user.addTransactionSuccess(action.payload));
      yield put(
        AppActions.msg.receiveMsg({
          type: 1,
          msg: "Transaction created successfully!",
        })
      );
    }
  } catch (e: any) {
    console.log(e.response);
    yield put(AppActions.msg.receiveMsg({ type: 2, msg: e.response.data.msg }));
  } finally {
    yield put(Actions.loading.endLoading());
  }
}

function* transactionSaga() {
  yield takeLatest(
    Actions.transaction.getTransactionRequest.type,
    getTransactionSaga
  );
  yield takeLatest(
    Actions.transaction.addTransactionRequest.type,
    addTransactionSaga
  );
}

export default transactionSaga;
