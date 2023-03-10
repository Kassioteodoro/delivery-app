import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Context from '../../context/Context';
import HeaderCustomer from '../../components/HeaderCustomer';
import TableOrder from '../../components/TableOrder';
import '../css/OrdersDetails.css';

function OrderDetails() {
  const {
    order, selectedSeller, cartProduct, setOrder, statusChanged, setStatusChanged,
  } = useContext(Context);
  const prefix = 'customer_order_details__';

  const location = useLocation();

  useEffect(() => {
    const getOrderDetails = async () => {
      if (statusChanged) {
        const id = location.pathname.slice(location.pathname.lastIndexOf('/')).slice(1);
        const response = await axios.get(`http://localhost:3001/sales/all/${id}`, {
          headers: {
            Authorization: (JSON.parse(localStorage.getItem('user'))).token,
          },
        });
        setOrder(response.data);
      }
    };
    getOrderDetails();
    setStatusChanged(false);
  }, [statusChanged]);

  const handleClick = async (event) => {
    event.preventDefault();
    await axios.put('http://localhost:3001/sales/status/customer', {
      status: 'Entregue',
      saleId: order.id,
    }, {
      headers: {
        Authorization: (JSON.parse(localStorage.getItem('user'))).token,
      },
    });
    setStatusChanged(true);
  };

  const parseSaleDate = () => {
    const saleDate = new Date(order.saleDate);
    let day = saleDate.getDate();
    let month = saleDate.getMonth() + 1;
    const year = saleDate.getFullYear();
    const magic = 10;
    if (day < magic) {
      day = `0${day}`;
    }
    if (month < magic) {
      month = `0${month}`;
    }
    return `${day}/${month}/${year} `;
  };

  return (
    <div className="container">
      {console.log('order', order)}
      <div>
        <HeaderCustomer />
      </div>
      <h3>Detalhes do Pedido</h3>
      <div>
        <section>
          <span
            data-testid={ `${prefix}element-order-details-label-order-id` }
          >
            { `PEDIDO ${order.id}; ` }
          </span>
          <span
            data-testid={ `${prefix}element-order-details-label-seller-name` }
          >
            { `P. Vend: ${selectedSeller} ` }
          </span>
          <span
            data-testid={ `${prefix}element-order-details-label-order-date` }
          >
            {parseSaleDate()}
          </span>
          <span
            data-testid={ `${prefix}element-order-details-label-delivery-status` }
          >
            {`${order.status} `}
          </span>
          <button
            type="button"
            data-testid={ `${prefix}button-delivery-check` }
            disabled={ order.status !== 'Em Trânsito' }
            onClick={ handleClick }
          >
            Marcar como Entregue
          </button>
        </section>
        <TableOrder />
        <p
          data-testid="customer_order_details__element-order-total-price"
        >
          {`Valor Total: R$${cartProduct.toFixed(2).toString().replace('.', ',')}`}
        </p>
      </div>
    </div>
  );
}

export default OrderDetails;
