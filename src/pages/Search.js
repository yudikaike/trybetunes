import React, { Component } from 'react';
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

export default Search;
