import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HeaderSeller from '../../components/HeaderSeller';

function SellerOrders() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/sales/seller', {
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
      <HeaderSeller />
      {sales.map(({ id, totalPrice, status, saleDate }) => (
        <Link to={ `/seller/orders/${id}` } key={ id }>
          <p data-testid={ `seller_orders__element-order-id-${id}` }>{id}</p>
          <p data-testid={ `seller_orders__element-card-price-${id}` }>
            {totalPrice.replace('.', ',')}
          </p>
          <p data-testid={ `seller_orders__element-delivery-status-${id}` }>
            {status}
          </p>
          <p data-testid={ `seller_orders__element-order-date-${id}` }>
            {parseSaleDate(saleDate)}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default SellerOrders;
