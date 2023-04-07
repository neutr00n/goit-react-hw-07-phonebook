import { useSelector } from 'react-redux';
import { getFilter } from 'redux/selectors';
import { useFetchAllContactsQuery } from '../redux/phoneBookApi';

export const DisplayedContacts = () => {
  const { data = [] } = useFetchAllContactsQuery();
  const filteredContacts = useSelector(getFilter);

  const normalizedSearchingName = filteredContacts.toLocaleLowerCase().trim();
  return data.filter(({ name }) =>
    name.toLocaleLowerCase().trim().includes(normalizedSearchingName)
  );
};
