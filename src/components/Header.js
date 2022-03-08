import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isLoading: false,
    };
    this.handleGetUser = this.handleGetUser.bind(this);
  }

  componentDidMount() {
    this.handleGetUser();
  }

  async handleGetUser() {
    this.setState({
      isLoading: true,
    });
    const { name } = await getUser();
    this.setState({
      isLoading: false,
      name,
    });
  }

  render() {
    const { isLoading, name } = this.state;
    return (
      <div>
        <header data-testid="header-component">
          {isLoading ? <Loading /> : (
            <div>
              <Link to="/search" data-testid="link-to-search">Search</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
              <Link to="/profile" data-testid="link-to-profile">Profile</Link>
              <div data-testid="header-user-name">{name}</div>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default Header;
