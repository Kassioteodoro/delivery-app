import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './css/Login.css';

function Login() {
  const history = useHistory();
  const [email, setChangeEmail] = useState('');
  const [password, setChangePass] = useState('');
  const [loginButton, setLoginButton] = useState(true);
  const [invalidUser, setInvalidUser] = useState(false);
  const MAGIC_SIX = 6;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) history.push('/customer/products');
  }, []);

  useEffect(() => {
    const validEmail = email.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const validPassword = password.length >= MAGIC_SIX;
    if (validEmail && validPassword) {
      setLoginButton(false);
    } else {
      setLoginButton(true);
    }
  }, [email, password]);

  const postUser = async (event) => {
    event.preventDefault();
    await axios.post('http://localhost:3001/login', {
      email,
      password,
    }).then((response) => {
      localStorage.setItem('user', JSON.stringify({
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
        token: response.data.token,
      }));
      if (response.data.role === 'seller') history.push('/seller/orders');
      else history.push('/customer/products');
    }).catch(() => {
      setInvalidUser(true);
    });
  };

  const redirectRegister = () => {
    history.push('/register');
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <h1 className="login-name">BiritApp</h1>
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
            onClick={ (e) => postUser(e) }
          >
            Login
          </button>
          <button
            className="register-button"
            type="button"
            data-testid="common_login__button-register"
            onClick={ redirectRegister }
          >
            Ainda não tenho conta
          </button>
        </form>
        { invalidUser && (
          <h2 data-testid="common_login__element-invalid-email" className="error">
            Login inválido
          </h2>
        )}
      </div>
    </div>
  );
}

export default Login;
