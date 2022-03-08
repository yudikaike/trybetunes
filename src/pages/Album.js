import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      musics: [],
      favorites: [],
    };
    this.handleGetMusics = this.handleGetMusics.bind(this);
    this.handleFavoriteSongs = this.handleFavoriteSongs.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
    this.handleGetMusics();
  }

  async handleGetMusics() {
    const { id } = this.props;
    this.setState({
      isLoading: true,
    });
    const musics = await getMusics(id);
    this.setState({
      isLoading: false,
      musics,
    });
  }

  async handleFavoriteSongs(music) {
    this.setState({
      isLoading: true,
    });
    await addSong(music);
    this.setState({
      isLoading: false,
    });
  }

  handleCheck(id) {
    this.setState((prevState) => ({
      favorites: [...prevState.favorites, id],
    }));
  }

  render() {
    const { isLoading, musics, favorites } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-album">
          {isLoading ? <Loading /> : musics.map((music, index) => (
            index === 0 ? (
              <div key={ index }>
                <img src={ music.artworkUrl100 } alt={ music.collectionName } />
                <p data-testid="album-name">{music.collectionName}</p>
                <p data-testid="artist-name">{music.artistName}</p>
              </div>)
              : (
                <MusicCard
                  key={ index }
                  music={ music }
                  favorites={ favorites }
                  handleFavoriteSongs={ this.handleFavoriteSongs }
                  handleCheck={ this.handleCheck }
                />)
          ))}
        </div>
      </div>
    );
  }
}

export default Album;
