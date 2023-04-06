import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosContact } from 'react-icons/io';
import { fetchRemoveContact } from '../../redux/contactsOperations';
import { getContacts } from '../../redux/phoneBookSlice';
import {
  ContactCount,
  ContactName,
  ContactNumber,
  ContactButton,
} from './Contact.styled';
import { LoaderBtn } from 'components/Loader/Loader';

export const Contact = ({ name, phone, id, index }) => {
  const dispatch = useDispatch();
  const { isRemoving } = useSelector(getContacts);

  const handleRemoveContact = contactId => {
    dispatch(fetchRemoveContact(contactId));
  };

  return (
    <>
      <ContactCount>{index + 1}.</ContactCount>
      <IoIosContact />
      <ContactName>{name}:</ContactName>
      <ContactNumber href={`tel: ${phone}`}>{phone}</ContactNumber>
      <ContactButton
        type="button"
        disabled={isRemoving}
        onClick={() => handleRemoveContact(id)}
      >
        {isRemoving ? <LoaderBtn /> : 'X'}
      </ContactButton>
    </>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
