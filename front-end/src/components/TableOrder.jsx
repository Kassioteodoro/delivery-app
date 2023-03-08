import React, { useContext } from 'react';
import Context from '../context/Context';

function TableOrder() {
  const { checkoutItems, arrQuantity } = useContext(Context);

  const findQuantity = (id) => arrQuantity.find((item) => item.id === id).quantity;

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
        {checkoutItems.map((product, index) => (
          <tr key={ product.id }>
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
              {findQuantity(product.id)}
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
              {(findQuantity(product.id) * product.price)
                .toFixed(2).toString().replace('.', ',')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableOrder;
