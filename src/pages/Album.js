import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      musics: [],
    };
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

  render() {
    const { isLoading, musics } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-album">
          {isLoading ? <Loading /> : musics.map(({
            artistName,
            artworkUrl100,
            collectionName,
            trackName,
            previewUrl,
          }, index) => (
            index === 0 ? (
              <div key={ index }>
                <img src={ artworkUrl100 } alt={ collectionName } />
                <p data-testid="album-name">{collectionName}</p>
                <p data-testid="artist-name">{artistName}</p>
              </div>)
              : (
                <MusicCard
                  key={ index }
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                />)
          ))}
        </div>
      </div>
    );
  }
}

export default Album;
