import { all, fork } from "redux-saga/effects";
import userSaga from "./user.saga";
import transactionSaga from "./transaction.saga";

export function* appSaga() {
  yield all([fork(userSaga), fork(transactionSaga)]);
}
