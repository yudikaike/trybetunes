import React, { Component } from 'react';

class Login extends Component {
  render() {
    const { isButtonDisabled, handleChange, handleSubmit } = this.props;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="login-name-input">
            Login:
            <input
              onChange={ handleChange }
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

export default Login;
