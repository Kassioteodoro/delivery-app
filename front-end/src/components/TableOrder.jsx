import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Context from '../context/Context';

function TableOrder() {
  const { setCartProduct } = useContext(Context);
  const [productItems, setProductItems] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const getOrderDetails = async () => {
      const id = location.pathname.slice(location.pathname.lastIndexOf('/')).slice(1);
      const response = await axios.get(`http://localhost:3001/sales/orders/${id}`, {
        headers: {
          Authorization: (JSON.parse(localStorage.getItem('user'))).token,
        },
      });
      const total = response.data
        .reduce((acc, cur) => Number(acc.price) + Number(cur.price));
      console.log(total);
      setProductItems(response.data);
      setCartProduct(total);
    };
    getOrderDetails();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
        </tr>
      </thead>
      <tbody>
        {productItems.map((product, index) => (
          <tr key={ index }>
            <td
              data-testid={
                `customer_order_details__element-order-table-item-number-${index}`
              }
            >
              {index + 1}
            </td>
            <td
              data-testid={ `customer_order_details__element-order-table-name-${index}` }
            >
              {product.name}
            </td>
            <td
              data-testid={
                `customer_order_details__element-order-table-quantity-${index}`
              }
            >
              {product.quantity}
            </td>
            <td
              data-testid={
                `customer_order_details__element-order-table-unit-price-${index}`
              }
            >
              {Number(product.price).toFixed(2).toString().replace('.', ',')}
            </td>
            <td
              data-testid={
                `customer_order_details__element-order-table-sub-total-${index}`
              }
            >
              {(product.quantity * product.price)
                .toFixed(2).toString().replace('.', ',')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableOrder;
