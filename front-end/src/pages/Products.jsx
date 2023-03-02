import React from 'react';
import Header from '../components/Header';
import ProductCustomer from '../components/ProductCustomer';

function Orders() {
  return (
    <div>
      <Header />
      <div className="orders">
        <ProductCustomer />
      </div>
    </div>
  );
}
export default Orders;
