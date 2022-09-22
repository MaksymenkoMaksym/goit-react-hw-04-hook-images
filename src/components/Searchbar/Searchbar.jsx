import PropTypes from 'prop-types'; // ES6
import { Header, Form, Button, Input } from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';
const { Component } = require('react');

class Searchbar extends Component {
  state = {
    query: '',
  };

  onChangeHandler = e => {
    const value = e.target.value;
    const trimmedValue = value.trim().toLowerCase();
    this.setState({ query: trimmedValue });
  };
  onSubmit = e => {
    const { query } = this.state;

    e.preventDefault();
    this.props.onSubmitHandler(query);
    // e.target.reset();
  };
  render() {
    return (
      <Header className="searchbar">
        <Form className="form" onSubmit={this.onSubmit}>
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
            onChange={this.onChangeHandler}
          />
        </Form>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
};
export default Searchbar;
