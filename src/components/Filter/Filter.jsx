import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'redux/phoneBookSlice';
import { getFilter } from 'redux/selectors';
import { FilterWrapper, FilterTitle, FilterInput } from './Filter.styled';

export const Filter = () => {
  const filteredContacts = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleFilterValue = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  return (
    <FilterWrapper>
      <FilterTitle>Find contacts by name</FilterTitle>
      <FilterInput
        type="text"
        name="filter"
        placeholder="Rosie Simpson"
        value={filteredContacts}
        onChange={handleFilterValue}
      />
    </FilterWrapper>
  );
};
