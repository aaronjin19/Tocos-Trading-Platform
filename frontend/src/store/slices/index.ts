import { combineReducers } from '@reduxjs/toolkit';
import { userReducers, userActions } from './user.slice';
import { loadingReducers, loadingActions } from './loading.slice';
import { msgReducers, msgActions } from './msg.slice';
import { transactionReducers, transactionActions } from './transaction.slice';

export const Slices = combineReducers({
  loading: loadingReducers,
  msg: msgReducers,
  transaction: transactionReducers,
  user: userReducers,
});

export const Actions = {
  loading: loadingActions,
  msg: msgActions,
  transaction: transactionActions,
  user: userActions,
};