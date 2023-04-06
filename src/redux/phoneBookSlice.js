import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllContacts,
  fetchRemoveContact,
  fetchAddContact,
} from './contactsOperations';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    isRemoving: false,
    error: null,
  },
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
  extraReducers: builder => {
    builder
      .addCase(fetchAllContacts.fulfilled, ({ contacts }, { payload }) => {
        contacts.isLoading = false;
        contacts.items = payload;
      })
      .addCase(fetchAllContacts.pending, ({ contacts }) => {
        contacts.isLoading = true;
        contacts.error = null;
      })
      .addCase(fetchAllContacts.rejected, ({ contacts }, { payload }) => {
        contacts.isLoading = false;
        contacts.error = payload;
      })
      .addCase(fetchRemoveContact.fulfilled, ({ contacts }, { payload }) => {
        contacts.isRemoving = false;
        contacts.items = contacts.items.filter(
          contact => contact.id !== payload
        );
      })
      .addCase(fetchRemoveContact.pending, ({ contacts }) => {
        contacts.isRemoving = true;
        contacts.error = null;
      })
      .addCase(fetchRemoveContact.rejected, ({ contacts }, { payload }) => {
        contacts.isRemoving = false;
        contacts.error = payload;
      })
      .addCase(fetchAddContact.fulfilled, ({ contacts }, { payload }) => {
        contacts.isLoading = false;
        contacts.items.push(payload);
      })
      .addCase(fetchAddContact.pending, ({ contacts }) => {
        contacts.isLoading = true;
        contacts.error = null;
      })
      .addCase(fetchAddContact.rejected, ({ contacts }, { payload }) => {
        contacts.isLoading = false;
        contacts.error = payload;
      });
  },
});

export const { setContacts, removeContact, setFilter } = phoneBookSlice.actions;
export default phoneBookSlice.reducer;

// Selectors

export const getContacts = state => state.phoneBook.contacts;
export const getFilter = state => state.phoneBook.filter;
