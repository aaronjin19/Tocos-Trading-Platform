import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { Slices, Actions } from './slices';
import { appSaga } from './sagas';

// create saga middleware
const sagaMiddleware = createSagaMiddleware();

// create store
export const store = configureStore({
  preloadedState: {},
  reducer: Slices,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({ serializableCheck: false, thunk: false }).concat(
      sagaMiddleware
    ),
  // enhancers: [composeWithDevTools()]
});

// export app actions
export const AppActions = Actions;

sagaMiddleware.run(appSaga);

// export * as AppActionTypes from './types';

// root state
export type RootState = ReturnType<typeof store.getState>;

// export app dispatch
export type AppDispatch = typeof store.dispatch;
