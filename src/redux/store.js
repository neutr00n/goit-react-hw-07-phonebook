import { configureStore } from '@reduxjs/toolkit';
import phoneBookSlice from './phoneBookSlice';

export const store = configureStore({
  reducer: {
    phoneBook: phoneBookSlice,
  },
});
