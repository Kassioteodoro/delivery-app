import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Orders() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/customer/orders').then((res) => {
      setSales(res.data);
    });
  }, []);

  return (
    <>
      <h1>Orders</h1>
      {sales.map(({ id, totalPrice, status, saleDate }) => (
        <Link to={ `/customer/orders/${id}` } key={ id }>
          <p data-testid={ `customer_orders__element-order-id-${id}` }>{id}</p>
          <p data-testid={ `customer_orders__element-card-price-${id}` }>
            {totalPrice}
          </p>
          <p data-testid={ `customer_orders__element-delivery-status-${id}` }>
            {status}
          </p>
          <p data-testid={ `customer_orders__element-order-date-${id}` }>
            {saleDate}
          </p>
        </Link>
      ))}
    </>
  );
}
