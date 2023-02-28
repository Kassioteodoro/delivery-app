import React from 'react';

export default function Login() {
  return (
    <div className="login-container">
      <div className="logo-container">
        <image className="login-logo" />
        <h1 className="login-name">App</h1>
      </div>
      <div className="form-container">
        <form>
          <p>
            Login
            <br />
            <input
              data-testid="common_login__input-email"
              type="email"
              name="email"
            />
          </p>
          <p>
            Senha
            <br />
            <input
              data-testid="common_login__input-password"
              type="password"
            />
          </p>
          <input
            data-testid="common_login__button-login"
            className="login-button"
            type="submit"
            value="LOGIN"
          />
          <br />
          <input
            className="login-button-user"
            type="button"
            data-testid="common_login__button-register"
            value="Ainda não tenho conta"
          />
        </form>
        <h2
          data-testid="common_login__element-invalid-email"
          className="invlid-email"
        >
          {}
          {' '}
        </h2>
      </div>
    </div>
  );
}
