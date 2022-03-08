import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends Component {
  render() {
    const { handleSearch, isButtonDisabled, renderAlbums, value } = this.props;
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          <form>
            <input
              onChange={ handleSearch }
              type="text"
              name="search"
              value={ value }
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
            />
            <button
              onClick={ renderAlbums }
              disabled={ isButtonDisabled }
              type="button"
              data-testid="search-artist-button"
            >
              Procurar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  isButtonDisabled: PropTypes.bool.isRequired,
  handleSearch: PropTypes.func.isRequired,
  renderAlbums: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Search;
