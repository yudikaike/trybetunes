import React, { Component } from 'react';

class MusicCard extends Component {
  constructor() {
    super();
    this.addFavoriteSongs = this.addFavoriteSongs.bind(this);
  }

  addFavoriteSongs({ target }) {
    const { music, handleFavoriteSongs, handleCheck } = this.props;
    const { trackId } = music;
    handleCheck(trackId);
    handleFavoriteSongs(music);
  }

  render() {
    const { music, favorites } = this.props;
    const { trackName, previewUrl, trackId } = music;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ `checkbox-music-${trackId}` }>
          <input
            onChange={ this.addFavoriteSongs }
            checked={ favorites.some((id) => trackId === id) }
            type="checkbox"
            id={ `checkbox-music-${trackId}` }
            data-testid={ `checkbox-music-${trackId}` }
          />
          Favorita
        </label>
      </div>
    );
  }
}

export default MusicCard;
