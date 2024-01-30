import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAddTransaction, ITransaction } from "../../types";

interface ITransactionState {
  transactions: ITransaction[];
}

const initialState: ITransactionState = {
  transactions: [],
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState: initialState,
  reducers: {
    getTransactionRequest(
      _state: ITransactionState,
      _action: PayloadAction<string>
    ) {},
    getTransactionSuccess(
      state: ITransactionState,
      action: PayloadAction<ITransaction[]>
    ) {
      state.transactions = [...action.payload];
    },
    addTransactionRequest(
      _state: ITransactionState,
      _action: PayloadAction<IAddTransaction>
    ) {}
  },
});

export const transactionActions = transactionSlice.actions;

export const transactionReducers = transactionSlice.reducer;
