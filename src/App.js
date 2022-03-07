import React from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import Loading from './pages/Loading';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isButtonDisabled: true,
      isLoggedIn: false,
      isLoading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleChange({ target }) {
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
        handleChange={ this.handleChange }
        handleSubmit={ this.handleSubmit }
      />
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/search" component={ Search } />
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
