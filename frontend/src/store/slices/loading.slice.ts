import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ILoadState {
  loading: boolean;
  navState: number;
}
const initialState: ILoadState = {
  loading: false,
  navState: 0,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState: initialState,
  reducers: {
    startLoading(state: ILoadState) {
      state.loading = true;
    },
    endLoading(state: ILoadState) {
      state.loading = false;
    },
    setNavNumber(state: ILoadState, action: PayloadAction<number>){
      state.navState = action.payload;
    }
  },
});

export const loadingActions = loadingSlice.actions;

export const loadingReducers = loadingSlice.reducer;
