import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Register() {
  const history = useHistory();
  const [email, setChangeEmail] = useState('');
  const [password, setChangePass] = useState('');
  const [loginButton, setLoginButton] = useState(true);
  const [name, setName] = useState('');
  const [invalidUser, setInvalidUser] = useState(false);
  const MAGIC_SIX = 6;
  const MAGIC_ELEVEN = 11;

  useEffect(() => {
    const validEmail = email.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const validPassword = password.length >= MAGIC_SIX;
    const validName = name.length > MAGIC_ELEVEN;
    if (validEmail && validPassword && validName) {
      setLoginButton(false);
    } else {
      setLoginButton(true);
    }
  }, [email, password, name]);

  const postNewUser = async (event) => {
    event.preventDefault();
    await axios.post('http://localhost:3001/register', {
      name,
      email,
      password,
    }).then((response) => {
      localStorage.setItem('token', response.data.token);
      history.push('/customer/products');
    }).catch(() => {
      setInvalidUser(true);
    });
  };

  // const redirectRegister = () => {
  //   history.push('/register');
  // };

  return (
    <div className="register-container">
      <h1 className="register">Cadastro</h1>
      <div className="form-container">
        <form>
          <p>
            Nome
            <br />
            <input
              data-testid="common_register__input-name"
              type="text"
              name="text"
              onChange={ (e) => setName(e.target.value) }
            />
          </p>
          <p>
            Login
            <br />
            <input
              data-testid="common_register__input-email"
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
              data-testid="common_register__input-password"
              type="password"
              placeholder="Password"
              onChange={ (e) => setChangePass(e.target.value) }
            />
          </p>
          <button
            data-testid="common_register__button-register"
            className="login-button"
            type="button"
            disabled={ loginButton }
            onClick={ (e) => postNewUser(e) }
          >
            CADASTRAR
          </button>
          <br />
        </form>
        { invalidUser && (
          <h2
            data-testid="common_register__element-invalid_register"
            className="invalid-register"
          >
            Usuário já existente
          </h2>
        )}
      </div>
    </div>
  );
}

export default Register;
