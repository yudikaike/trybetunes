import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const { isButtonDisabled, handleLogin, handleSubmit } = this.props;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="login-name-input">
            Login:
            <input
              onChange={ handleLogin }
              name="name"
              type="text"
              id="login-name-input"
              data-testid="login-name-input"
            />
          </label>
          <button
            onClick={ handleSubmit }
            disabled={ isButtonDisabled }
            type="button"
            data-testid="login-submit-button"
          >
            Enviar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  isButtonDisabled: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Login;
