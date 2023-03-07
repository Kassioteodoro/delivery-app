import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import context from './Context';

function Provider({ children }) {
  const [cartProduct, setCartProduct] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [arrQuantity, setArrQuantity] = useState([]);
  const [order, setOrder] = useState({});
  const [selectedSeller, setSelectedSeller] = useState('');
  const [checkoutItems, setCheckoutItems] = useState([]);

  const contextValue = useMemo(() => {
    const objState = {
      cartProduct,
      setCartProduct,
      cartItems,
      setCartItems,
      arrQuantity,
      setArrQuantity,
      order,
      setOrder,
      selectedSeller,
      setSelectedSeller,
      checkoutItems,
      setCheckoutItems,
    };
    return objState;
  }, [
    cartProduct,
    setCartProduct,
    cartItems,
    setCartItems,
    arrQuantity,
    setArrQuantity,
    order,
    setOrder,
    selectedSeller,
    setSelectedSeller,
    checkoutItems,
    setCheckoutItems,
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
