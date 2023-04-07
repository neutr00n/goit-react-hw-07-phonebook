import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: '',
};

const phoneBookSlice = createSlice({
  name: 'phoneBook',
  initialState,
  reducers: {
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },
});

export const { setFilter } = phoneBookSlice.actions;
export default phoneBookSlice.reducer;
