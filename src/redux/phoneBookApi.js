import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const phoneBookApi = createApi({
  reducerPath: 'phoneBookApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://642acf15b11efeb759a371b7.mockapi.io/contacts/api/v1',
  }),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    fetchAllContacts: builder.query({
      query: () => '/contacts',
      providesTags: ['Contacts'],
    }),
    deleteContact: builder.mutation({
      query: id => ({ url: `/contacts/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Contacts'],
    }),
    fetchAddContact: builder.mutation({
      query: contact => ({ url: `/contacts`, method: 'POST', body: contact }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useFetchAllContactsQuery,
  useDeleteContactMutation,
  useFetchAddContactMutation,
} = phoneBookApi;
