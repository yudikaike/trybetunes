import React, { Component } from 'react';
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
      <header data-testid="header-component">
        {isLoading ? <Loading /> : <div data-testid="header-user-name">{name}</div>}
      </header>
    );
  }
}

export default Header;
