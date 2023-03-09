import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Context from '../../context/Context';
import HeaderSeller from '../../components/HeaderSeller';
import TableOrder from '../../components/TableOrder';

function SellerOrdersDetails() {
  const { order, cartProduct, setOrder } = useContext(Context);
  const prefix = 'seller_order_details__';

  const location = useLocation();

  useEffect(() => {
    const getOrderDetails = async () => {
      const id = location.pathname.slice(location.pathname.lastIndexOf('/')).slice(1);
      const response = await axios.get(`http://localhost:3001/sales/all/${id}`, {
        headers: {
          Authorization: (JSON.parse(localStorage.getItem('user'))).token,
        },
      });
      setOrder(response.data);
    };
    getOrderDetails();
  }, []);

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
    <div>
      {console.log(order)}
      <div>
        <HeaderSeller />
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
            data-testid={ `${prefix}button-preparing-check` }
            // disabled={ order.status !== 'Entregue' }
          >
            Preparar Pedido
          </button>
          <button
            type="button"
            data-testid={ `${prefix}button-dispatch-check` }
            disabled={ order.status !== 'Preparando' }
          >
            Saiu Para Entrega
          </button>
          <TableOrder />
        </section>
        <p
          data-testid={ `${prefix}element-order-total-price` }
        >
          {cartProduct.toFixed(2).toString().replace('.', ',')}
        </p>
      </div>
    </div>
  );
}

export default SellerOrdersDetails;
