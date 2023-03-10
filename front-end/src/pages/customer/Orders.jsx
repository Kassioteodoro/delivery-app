import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HeaderCustomer from '../../components/HeaderCustomer';
import '../css/Orders.css';

export default function Orders() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/sales/customer', {
      headers: { Authorization: JSON.parse(localStorage.getItem('user')).token },
    }).then((res) => {
      setSales(res.data);
    });
  }, []);

  const parseSaleDate = (date) => {
    const saleDate = new Date(date);
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
      <HeaderCustomer />
      <h1>Meus Pedidos</h1>
      {sales.map(({ id, totalPrice, status, saleDate }) => (
        <div
          className="container-div"
          key={ id }
        >
          <Link to={ `/customer/orders/${id}` }>
            <p
              className="order-info"
              data-testid={ `customer_orders__element-order-id-${id}` }
            >
              {id}

            </p>
            <p
              className="order-info"
              data-testid={ `customer_orders__element-card-price-${id}` }
            >
              {`R$${totalPrice.replace('.', ',')}`}
            </p>
            <p
              className="order-info"
              data-testid={ `customer_orders__element-delivery-status-${id}` }
            >
              {status}
            </p>
            <p
              className="order-info"
              data-testid={ `customer_orders__element-order-date-${id}` }
            >
              {parseSaleDate(saleDate)}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
