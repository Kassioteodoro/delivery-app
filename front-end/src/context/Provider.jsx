import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import context from './Context';

function Provider({ children }) {
  const [cartProduct, setCartProduct] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [myProducts, setMyProducts] = useState([]);

  const contextValue = useMemo(() => {
    const objState = {
      cartProduct,
      setCartProduct,
      cartItems,
      setCartItems,
      myProducts,
      setMyProducts,
    };
    return objState;
  }, [
    cartProduct,
    setCartProduct,
    cartItems,
    setCartItems,
    myProducts,
    setMyProducts,
  ]);
  return (
    <context.Provider value={ contextValue }>
      {children}
    </context.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Provider;
