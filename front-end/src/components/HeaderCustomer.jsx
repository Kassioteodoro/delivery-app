import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import '../pages/css/Header.css';

function HeaderCustomer() {
  const location = useLocation();
  const history = useHistory();
  const [userName, setUserName] = useState({});

  useEffect(() => {
    setUserName(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <nav className="header container">
      <div className="header-block-1">
        <button
          className="buttonProducts"
          type="button"
          onClick={ () => history.push('/customer/products') }
          data-testid="customer_products__element-navbar-link-products"
        >
          <link
            className="buttonProducts"
          />
          Produtos
        </button>
        {location.pathname.includes('customer') && (
          <button
            className="buttonOrders"
            data-testid="customer_products__element-navbar-link-orders"
            type="button"
            onClick={ () => history.push('/customer/orders') }
          >
            Meus Pedidos
          </button>
        )}
      </div>
      <div className="header-block-2">
        <button
          className="buttonName"
          data-testid="customer_products__element-navbar-user-full-name"
          type="button"
        >
          { userName.name || 'Usuário'}
        </button>
        <button
          className="buttonExit"
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          onClick={ () => {
            localStorage.clear();
            history.push('/login');
          } }
        >
          Sair
        </button>
      </div>
    </nav>
  );
}
export default HeaderCustomer;
