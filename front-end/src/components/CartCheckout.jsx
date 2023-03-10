import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import '../pages/CartCheckout.css';

function CartCheckout() {
  const {
    setCartProduct,
    cartItems,
    arrQuantity,
    checkoutItems,
    setCheckoutItems,
  } = useContext(Context);

  useEffect(() => {
    setCheckoutItems([...new Set(cartItems)]);
  }, [cartItems]);

  const findQuantity = (id) => arrQuantity.find((item) => item.id === id).quantity;

  const removeItem = (index) => {
    const newCheckoutItems = [...checkoutItems];
    newCheckoutItems.splice(index, 1);
    setCheckoutItems(newCheckoutItems);
  };

  const total = checkoutItems
    .reduce((acc, item) => acc + item.price * findQuantity(item.id), 0);

  useEffect(() => {
    setCartProduct(total);
  }, [total, setCartProduct]);

  return (
    <div>
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
                <button type="button" onClick={ () => removeItem(index) }>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="valor-total">
        <p>
          Valor Total:
          <span data-testid="customer_checkout__element-order-total-price">
            {` R$ ${total.toFixed(2).toString().replace('.', ',')}`}
          </span>
        </p>

      </div>
    </div>
  );
}

export default CartCheckout;
