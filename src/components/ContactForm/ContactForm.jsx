import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Loader } from '../Loader/Loader';
import {
  useFetchAddContactMutation,
  useFetchAllContactsQuery,
} from '../../redux/phoneBookApi';
import { toast } from 'react-toastify';
import { useState } from 'react';
import {
  ContForm,
  Label,
  InputDescrip,
  ContInput,
  Button,
  ErrMessageText,
} from './ContactForm.styled';
import 'react-toastify/dist/ReactToastify.css';

const nameRegExp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const phoneRegExp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const schema = yup.object().shape({
  name: yup.string().matches(nameRegExp, 'Name is not valid').required(),
  phone: yup.string().matches(phoneRegExp, 'Number is not valid').required(),
});

const initialValues = { name: '', phone: '' };

export const ContactForm = () => {
  const [addContact, { isSuccess, isError, isLoading }] =
    useFetchAddContactMutation();
  const { data: contacts } = useFetchAllContactsQuery();


  const [isContactAdded, setIsContactAdded] = useState(false);

  const onFormSubmit = (values, { resetForm }) => {
    const isAdded = checkContactIsAdded(values);

    if (isAdded) {
      return toast.info(`${values.name} is already in contacts`);
    }
    addContact(values);

    setIsContactAdded(true);
    resetForm();
  };

  const checkContactIsAdded = ({ name }) => {
    const normalizedContactName = name.toLowerCase().trim();

    return contacts.find(
      ({ name }) => name.toLowerCase().trim() === normalizedContactName
    );
  };

  if (isContactAdded && isSuccess) {
    toast.success('contact added successfully');
    setIsContactAdded(false);
  }

  if (isError) {
    toast.error('Something went wrong');
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onFormSubmit}
    >
      <ContForm>
        <Label>
          <InputDescrip>Name</InputDescrip>
          <ContInput type="text" name="name" placeholder="Rosie Simpson" />
          <ErrorMessage
            name="name"
            render={msg => <ErrMessageText> {msg} </ErrMessageText>}
          />
        </Label>
        <Label>
          <InputDescrip>Number</InputDescrip>
          <ContInput type="tel" name="phone" placeholder="+380-00-000-00-00" />
          <ErrorMessage
            name="phone"
            render={msg => <ErrMessageText> {msg} </ErrMessageText>}
          />
        </Label>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader size={25} stroke={3} /> : 'Add contact'}
        </Button>
      </ContForm>
    </Formik>
  );
};
