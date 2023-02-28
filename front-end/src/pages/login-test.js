import React from 'react';

export default function Login() {
  return (
    <div className="login container">
      <div className="logo container">
        <image className="login-logo" />
        <h1 className="login-name">App</h1>
      </div>
      <div className="form container">
        <form>
          <p>
            Login
            <input type="email" name="email" />
          </p>
          <p>
            Senha
            <input type="password" />
          </p>
          <input type="submit" />
          <input type="button" value="LOGIN" />
        </form>
        <h2 className="error">
          { }
          {' '}
        </h2>
      </div>
    </div>
  );
}
