import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Login() {
  const [email, setChangeEmail] = useState('');
  const [password, setChangePass] = useState('');
  const [loginButton, setLoginButton] = useState(true);
  const [invalidUser, setInvalidUser] = useState(false);
  const MAGIC_SIX = 6;

  useEffect(() => {
    const validEmail = email.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const validPassword = password.length >= MAGIC_SIX;
    if (validEmail && validPassword) {
      setLoginButton(false);
    } else {
      setLoginButton(true);
    }
  }, [email, password]);

  const postUser = async () => {
    await axios.post('http://localhost:3001/login', {
      email,
      password,
    }).then((response) => {
      localStorage.setItem('token', response.data.token);
    }).catch(() => {
      setInvalidUser(true);
    });
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img className="login-logo" src="" alt="" />
        <h1 className="login-name">App</h1>
      </div>
      <div className="form">
        <form>
          <p>
            Login
            <br />
            <input
              data-testid="common_login__input-email"
              type="email"
              name="email"
              placeholder="Email"
              onChange={ (e) => setChangeEmail(e.target.value) }
            />
          </p>
          <p>
            Senha
            <br />
            <input
              data-testid="common_login__input-password"
              type="password"
              name="password"
              placeholder="Password"
              onChange={ (e) => setChangePass(e.target.value) }
            />
          </p>
          <button
            data-testid="common_login__button-login"
            className="login-button"
            type="button"
            disabled={ loginButton }
            onClick={ postUser }
          >
            LOGIN
          </button>
          <br />
          <button
            className="register-button"
            type="button"
            data-testid="common_login__button-register"
          >
            Botão de Registro
          </button>
        </form>
        { invalidUser && (
          <h2 data-testid="common_login__element-invalid-email" className="error">
            Usuário não encontrado!
          </h2>
        )}
      </div>
    </div>
  );
}

export default Login;
