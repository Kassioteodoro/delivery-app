import React from 'react';
import Header from '../components/Header';
import OrderCard from '../components/OrderCard';

function Orders() {
  return (
    <div>
      <Header />
      <div className="orders">
        <OrderCard />
      </div>
    </div>
  );
}
export default Orders;
