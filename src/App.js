import React from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import Loading from './components/Loading';
import Albums from './components/Albums';
import { createUser } from './services/userAPI';
import searchAlbumsAPI from './services/searchAlbumsAPI';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      search: '',
      artist: '',
      albums: [],
      isButtonDisabled: true,
      isLoggedIn: false,
      isLoading: false,
      isResolved: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.renderAlbums = this.renderAlbums.bind(this);
  }

  handleLogin({ target }) {
    const { name, value } = target;
    const MIN = 3;
    if (value.length >= MIN) {
      this.setState({
        [name]: value,
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  }

  handleSearch({ target }) {
    const { name, value } = target;
    const MIN = 2;
    if (value.length >= MIN) {
      this.setState({
        [name]: value,
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        [name]: value,
        isButtonDisabled: true,
      });
    }
  }

  async handleSubmit() {
    const { name } = this.state;
    this.setState({
      isLoading: true,
    });
    await createUser({ name });
    this.setState({
      isLoggedIn: true,
      isLoading: false,
    });
  }

  handleRedirect() {
    const { isButtonDisabled, isLoggedIn, isLoading } = this.state;
    if (isLoggedIn) {
      return (
        <Redirect to="/search" />
      );
    }
    if (isLoading) {
      return (
        <Loading />
      );
    }
    return (
      <Login
        isButtonDisabled={ isButtonDisabled }
        handleLogin={ this.handleLogin }
        handleSubmit={ this.handleSubmit }
      />
    );
  }

  handleRenderAlbums() {
    const { isLoading, isResolved, albums, artist } = this.state;
    if (isLoading) {
      return (
        <div>
          <Loading />
        </div>
      );
    }
    if (isResolved) {
      if (albums.length === 0) {
        return (
          <div>
            Nenhum álbum foi encontrado
          </div>
        );
      }
      return (
        <div>
          <h2>{`Resultado de álbuns de: ${artist}`}</h2>
          <Albums albums={ albums } />
        </div>
      );
    }
  }

  async renderAlbums() {
    const { search } = this.state;
    this.setState({
      isLoading: true,
      isResolved: false,
    });
    const albums = await searchAlbumsAPI(search);
    this.setState({
      isLoading: false,
      isResolved: true,
      albums,
      artist: search,
      search: '',
    });
  }

  render() {
    const { isButtonDisabled, search } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="/favorites" component={ Favorites } />
          <Route
            path="/album/:id"
            render={ (props) => <Album { ...props.match.params } /> }
          />
          <Route path="/search">
            <Search
              handleSearch={ this.handleSearch }
              isButtonDisabled={ isButtonDisabled }
              renderAlbums={ this.renderAlbums }
              value={ search }
            />
            { this.handleRenderAlbums() }
          </Route>
          <Route exact path="/">
            { this.handleRedirect() }
          </Route>
          <Route path="/*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
