import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { NoContacts } from './NoContacts/NoContacts';
import { DisplayedContacts } from '../helpers/displayedContacts';
import { Wrapper, Title, ContactsTitle } from './App.styled';
import { useFetchAllContactsQuery } from '../redux/phoneBookApi';
import { Loader } from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const { error, isError, isLoading } = useFetchAllContactsQuery();
  const displayedContacts = DisplayedContacts();

  if (isError) {
    toast.error(error.data);
  }

  return (
    <Wrapper>
      <Title>Phonebook</Title>
      <ContactForm />
      <ContactsTitle>Contacts:</ContactsTitle>
      <Filter />
      {isLoading && <Loader size={60} stroke={2} />}
      {!isLoading ? (
        displayedContacts.length ? (
          <ContactList />
        ) : (
          <NoContacts />
        )
      ) : null}

      <ToastContainer theme="colored" autoClose={2000} />
    </Wrapper>
  );
};
