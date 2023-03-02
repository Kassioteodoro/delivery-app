import React from 'react';

function Header() {
  return (
    <nav>
      <div className="header container">
        <div className="header-block-1">
          <button
            data-testid="customer_products__element-navbar-link-products"
            className="orders"
            type="button"
          >
            PRODUTOS
          </button>
        </div>
        <div className="header-meus-pedidos">
          <button
            data-testid="customer_products__element-navbar-link-orders"
            className="myOrders"
            type="button"
          >
            MEUS PEDIDOS
          </button>
        </div>
        <div className="header-block-2">
          <p
            data-testid="customer_products__element-navbar-user-full-name"
            className="username"
          >
            NOME
          </p>
          <button
            data-testid="customer_products__element-navbar-link-logout"
            className="logout"
            type="button"
          >
            SAIR
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
