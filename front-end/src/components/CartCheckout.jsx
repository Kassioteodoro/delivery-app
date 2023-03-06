import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import './CartCheckout.css';

function CartCheckout() {
  const {
    cartProduct,
    // setCartProduct,
    cartItems,
    // setCartItems,
    arrQuantity,
  } = useContext(Context);

  const [checkoutItems, setCheckoutItems] = useState([]);

  useEffect(() => {
    setCheckoutItems([...new Set(cartItems)]);
  }, []);

  const findQuantity = (id) => arrQuantity.find((item) => item.id === id).quantity;

  return (
    <div>
      <h3>Finalizar Pedido</h3>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {checkoutItems.map((product, index) => (
            <tr key={ product.id }>
              <td
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                {product.name}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-quantity-${index}`
                }
              >
                {findQuantity(product.id)}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                {Number(product.price).toFixed(2).toString().replace('.', ',')}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                {(findQuantity(product.id) * product.price)
                  .toFixed(2).toString().replace('.', ',')}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-remove-${index}` }
              >
                <button type="button" onClick={ () => console.log('Oi') }>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p data-testid="customer_checkout__element-order-total-price">
          {cartProduct.toString().replace('.', ',')}
        </p>
      </div>
    </div>
  );
}

export default CartCheckout;
