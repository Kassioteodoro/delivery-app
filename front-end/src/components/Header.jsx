import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const history = useHistory();
  return (
    <div className="header container">
      <div className="header-block-1">
        <button
          className="customer_products__element-navbar-link-products"
          type="button"
          onClick={ () => history.push('/customer/products') }
        >
          <link
            className="customer_products__element-navbar-link-products"
            data-testid="customer_products__element-navbar-link-products"
          />
          PRODUTOS
        </button>
        {location.pathname.includes('customer') && (
          <button
            className="customer_products__element-navbar-link-orders"
            data-testid="customer_products__element-navbar-link-orders"
            type="button"
            onClick={ () => navigate('/customer/orders') }
          >
            MEUS PEDIDOS
          </button>
        )}
      </div>
      <div className="header-block-2">
        <button
          className="customer_products__element-navbar-user-full-name"
          data-testid="customer_products__element-navbar-user-full-name"
          type="button"
        >
          {localStorage.getItem('name') || 'Usuário'}
        </button>
        <button
          className="customer_products__element-navbar-link-logout"
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          onClick={ () => {
            localStorage.clear();
            history.push('/login');
          } }
        >
          SAIR
        </button>
      </div>
    </div>
  );
}
export default Header;
