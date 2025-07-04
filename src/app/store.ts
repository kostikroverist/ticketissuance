// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import ticketsReducer from '../features/tickets/ticketsSlice';
import filtersReducer from '../features/filters/filtersSlice';
import sortReducer from '../features/sort/sortSlice';     

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    filters: filtersReducer, 
    sort: sortReducer,      
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
      },
    }).concat(sagaMiddleware),
});

import rootSaga from './rootSaga';
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;