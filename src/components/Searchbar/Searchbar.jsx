import PropTypes from 'prop-types'; // ES6
import { Header, Form, Button, Input } from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';
import { useState } from 'react';

const Searchbar = ({ onSubmitHandler }) => {
  const [query, setQuery] = useState('');

  const onChangeHandler = e => {
    const value = e.target.value;
    const trimmedValue = value.trim().toLowerCase();
    setQuery(trimmedValue);
  };

  const onSubmit = e => {
    e.preventDefault();
    onSubmitHandler(query);
  };

  return (
    <Header className="searchbar">
      <Form className="form" onSubmit={onSubmit}>
        <Button type="submit" className="button">
          <span className="button-label">
            <FcSearch />{' '}
          </span>
        </Button>

        <Input
          name="search"
          className="input"
          type="text"
          autoComplete="on"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChangeHandler}
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
};
export default Searchbar;
