import React, { useContext } from 'react';
import Context from '../../context/Context';
import HeaderCustomer from '../../components/HeaderCustomer';
import TableOrder from '../../components/TableOrder';

function OrderDetails() {
  const { order, selectedSeller, cartProduct } = useContext(Context);
  const prefix = 'customer_order_details__';

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
            disabled={ order.status !== 'Entregue' }
          >
            Marcar como Entregue
          </button>
          <TableOrder />
        </section>
        <p
          data-testid="customer_order_details__element-order-total-price"
        >
          {cartProduct.toFixed(2).toString().replace('.', ',')}
        </p>
      </div>
    </div>
  );
}

export default OrderDetails;
