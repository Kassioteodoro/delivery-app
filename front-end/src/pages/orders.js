import React, { Component } from 'react';
import Header from '../components/Header';
import OrderCard from '../components/OrderCard';

class Orders extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="orders-container">
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </div>
      </div>
    );
  }
}

export default Orders;
