import React from 'react';
import HeaderCustomer from '../../components/HeaderCustomer';
import ProductCustomer from '../../components/ProductCustomer';

function Orders() {
  return (
    <div>
      <HeaderCustomer />
      <div className="orders">
        <ProductCustomer />
      </div>
    </div>
  );
}
export default Orders;
