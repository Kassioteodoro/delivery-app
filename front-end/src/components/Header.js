import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className="header container">
        <div className="header-1">
          <button
            className="customer-products"
            type="button"
          >
            PEDIDOS
          </button>
        </div>
        <div className="header-2">
          <button
            className="customer-products-element"
            type="button"
          >
            NOME
          </button>
          <button
            className="customer-products-element-navbar"
            type="button"
          >
            SAIR
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
