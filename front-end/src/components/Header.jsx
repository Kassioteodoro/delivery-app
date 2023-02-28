import React from 'react';

function Header() {
  return (
    <div className="header container">
      <div className="header-block-1">
        <button
          className="orders"
          type="button"
        >
          PEDIDOS
        </button>
      </div>
      <div className="header-block-2">
        <button
          className="username"
          type="button"
        >
          NOME
        </button>
        <button
          className="logout"
          type="button"
        >
          SAIR
        </button>
      </div>
    </div>
  );
}

export default Header;
