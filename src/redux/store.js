import { configureStore } from '@reduxjs/toolkit';
import { phoneBookApi } from './phoneBookApi';
import phoneBookReducer from './phoneBookSlice';

export const store = configureStore({
  reducer: {
    phoneBook: phoneBookReducer,
    [phoneBookApi.reducerPath]: phoneBookApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(phoneBookApi.middleware),
});
