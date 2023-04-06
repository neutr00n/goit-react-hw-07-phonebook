import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { NoContacts } from './NoContacts/NoContacts';
import { DisplayedContacts } from '../helpers/displayedContacts';
import { Wrapper, Title, ContactsTitle } from './App.styled';
import { fetchAllContacts } from '../redux/contactsOperations';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getContacts } from '../redux/phoneBookSlice';
import { Loader } from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const dispatch = useDispatch();
  const displayedContacts = DisplayedContacts();
  const { isLoading, error } = useSelector(getContacts);
  const [isContactsLoaded, setContactsLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchAllContacts()).then(() => setContactsLoaded(true));
  }, [dispatch, setContactsLoaded]);

  if (error) {
    toast.error(error);
  }

  return (
    <Wrapper>
      <Title>Phonebook</Title>
      <ContactForm />
      <ContactsTitle>Contacts:</ContactsTitle>
      <Filter />
      {isLoading && <Loader />}

      {!isLoading && isContactsLoaded ? (
        displayedContacts.length !== 0 ? (
          <ContactList />
        ) : (
          <NoContacts />
        )
      ) : null}

      <ToastContainer theme="colored" autoClose={2000} />
    </Wrapper>
  );
};
