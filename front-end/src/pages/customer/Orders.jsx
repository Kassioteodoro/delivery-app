import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HeaderCustomer from '../../components/HeaderCustomer';

export default function Orders() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem('user')).token);
    axios.get('http://localhost:3001/sales/seller', {
      headers: { Authorization: JSON.parse(localStorage.getItem('user')).token },
    }).then((res) => {
      setSales(res.data);
    });
  }, []);

  return (
    <div>
      <HeaderCustomer />
      <h1>Orders</h1>
      {console.log(sales)}
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
    </div>
  );
}
