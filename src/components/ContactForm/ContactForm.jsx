import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'redux/phoneBookSlice';
import { fetchAddContact } from '../../redux/contactsOperations';
import {
  ContForm,
  Label,
  InputDescrip,
  ContInput,
  Button,
  ErrMessageText,
} from './ContactForm.styled';

const nameRegExp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const phoneRegExp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const schema = yup.object().shape({
  name: yup.string().matches(nameRegExp, 'Name is not valid').required(),
  phone: yup.string().matches(phoneRegExp, 'Number is not valid').required(),
});

const initialValues = { name: '', phone: '' };

export const ContactForm = () => {
  const { items, isLoading } = useSelector(getContacts);
  const dispatch = useDispatch();

  const onFormSubmit = (values, { resetForm }) => {
    const isAdded = checkContactIsAdded(values);

    if (isAdded) {
      return alert(`${values.name} is already in contacts`);
    }
    dispatch(fetchAddContact(values));

    resetForm();
  };

  const checkContactIsAdded = ({ name }) => {
    const normalizedContactName = name.toLowerCase().trim();

    return items.find(
      ({ name }) => name.toLowerCase().trim() === normalizedContactName
    );
  };

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
          Add contact
        </Button>
      </ContForm>
    </Formik>
  );
};
