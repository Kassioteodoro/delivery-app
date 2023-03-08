import React from 'react';
import HeaderCustomer from '../../components/HeaderCustomer';
import CartCheckout from '../../components/CartCheckout';
import FinalizeOrder from '../../components/FinalizeOrder';

function Checkout() {
  return (
    <div>
      <HeaderCustomer />
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
