import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAddTransaction, IAddUser, IUser } from "../../types";

interface IUserState {
  users: IUser[];
  user: IUser | null;
}

const initialState: IUserState = {
  users: [],
  user: null,
};

const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    getUserRequest() {},
    getUserSuccess(state: IUserState, action: PayloadAction<IUser[]>) {
      state.users = [...action.payload];
    },
    getOneUserRequest(_state: IUserState, _action: PayloadAction<string>) {},
    getOneUserSuccess(state: IUserState, action: PayloadAction<IUser>) {
      state.user = { ...action.payload };
    },
    addUserRequest(_state: IUserState, _action: PayloadAction<IAddUser>) {},
    addUserSuccess(state: IUserState, action: PayloadAction<IUser>) {
      state.users = [...state.users, action.payload];
    },
    
    addTransactionSuccess(
      state: IUserState,
      action: PayloadAction<IAddTransaction>
    ) {
      console.log(action.payload);
      state.users = state.users.map((item) => {
        if (item._id === action.payload.sender)
          item = { ...item, token: Number(item.token) - Number(action.payload.amount) };
        if (item._id === action.payload.receiver)
          item = { ...item, token: Number(item.token) + Number(action.payload.amount) };
        return item;
      });
    },
  },
});

export const userActions = userSlice.actions;

export const userReducers = userSlice.reducer;
