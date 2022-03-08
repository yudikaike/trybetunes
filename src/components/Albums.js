import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Albums extends Component {
  render() {
    const { albums } = this.props;
    return (
      <div>
        {albums
          .map(({ artworkUrl100, collectionName, artistName, collectionId }, index) => (
            <div key={ index }>
              <Link
                data-testid={ `link-to-album-${collectionId}` }
                to={ `/album/${collectionId}` }
              >
                <img src={ artworkUrl100 } alt={ collectionName } />
                <p>{ collectionName }</p>
                <p>{ artistName }</p>
              </Link>
            </div>
          ))}
      </div>
    );
  }
}

Albums.propTypes = {
  albums: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

export default Albums;
