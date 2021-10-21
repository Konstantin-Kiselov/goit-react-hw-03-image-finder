import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleInputChange = event => {
    this.setState({ searchQuery: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      alert('Введите слово для поиска');
      return;
    }

    this.props.onSubmit(this.state.searchQuery.trim().toLowerCase());

    this.reset();
  };

  reset = () => {
    this.setState({
      searchQuery: '',
    });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.searchFormButton}>
            <span className={s.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
