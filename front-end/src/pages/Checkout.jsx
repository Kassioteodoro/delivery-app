import React from 'react';
import Header from '../components/Header';
import CartCheckout from '../components/CartCheckout';
import FinalizeOrder from '../components/FinalizeOrder';

function Checkout() {
  return (
    <div>
      <Header />
      <div>
        <CartCheckout />
      </div>
      <div>
        <FinalizeOrder />
      </div>
    </div>
  );
}

export default Checkout;
