import axios from 'axios';

axios.defaults.baseURL =
  'https://642acf15b11efeb759a371b7.mockapi.io/contacts/api/v1';

export async function getContacts() {
  const response = await axios.get(`/contacts`);
  return response.data;
}
export async function removeContact(contactId) {
  const response = await axios.delete(`/contacts/${contactId}`);
  return response.data;
}

export async function addContact(contact) {
  const response = await axios.post(`/contacts`, contact);
  return response.data;
}
