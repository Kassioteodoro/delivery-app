import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';

function CartCheckout() {
  const {
    cartProduct,
    setCartProduct,
    cartItems,
    setCartItems,
  } = useContext(Context);

  useEffect(() => {

  });

  return (
    <div>
      {console.log(cartItems)}
    </div>
  );
}

export default CartCheckout;
