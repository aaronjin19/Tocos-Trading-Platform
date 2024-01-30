import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import alert from "../../utils/alert";

interface IMsgState {
  msg: string;
  type: number;
}
const initialState: IMsgState = {
  msg: "",
  type: 0,
};

const msgSlice = createSlice({
  name: "msg",
  initialState: initialState,
  reducers: {
    receiveMsg(state: IMsgState, action: PayloadAction<IMsgState>) {
      state.msg = action.payload.msg;
      state.type = action.payload.type;
      alert(state);
    },
    clearMsg(state: IMsgState){
      state.type = 0;
      state.msg = "";
    }
  },
});

export const msgActions = msgSlice.actions;

export const msgReducers = msgSlice.reducer;
