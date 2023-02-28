import React from 'react';

function Register() {
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
            />
          </p>
          <p>
            Login
            <br />
            <input
              data-testid="common_register__input-email"
              type="email"
              name="email"
            />
          </p>
          <p>
            Senha
            <br />
            <input
              data-testid="common_register__input-password"
              type="password"
            />
          </p>
          <input
            data-testid="common_register__button-register"
            className="login-button"
            type="submit"
            value="CADASTRAR"
          />
          <br />
        </form>
        <h2
          data-testid="common_register__element-invalid_register"
          className="invalid-register"
        >
          {}
          {' '}
        </h2>
      </div>
    </div>
  );
}

export default Register;
