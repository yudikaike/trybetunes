import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  render() {
    const { handleSearch, isButtonDisabled } = this.props;
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          <form>
            <input
              onChange={ handleSearch }
              type="text"
              name="search"
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
            />
            <button
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

export default Search;
