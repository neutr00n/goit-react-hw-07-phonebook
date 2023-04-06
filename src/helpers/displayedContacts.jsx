import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/phoneBookSlice';

export const DisplayedContacts = () => {
  const { items } = useSelector(getContacts);
  const filteredContacts = useSelector(getFilter);

  const normalizedSearchingName = filteredContacts.toLocaleLowerCase().trim();
  return items.filter(({ name }) =>
    name.toLocaleLowerCase().trim().includes(normalizedSearchingName)
  );
};
