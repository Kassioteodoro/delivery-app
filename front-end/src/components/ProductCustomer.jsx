import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Context from '../context/Context';

function ProductCustomer() {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const {
    cartProduct,
    setCartProduct,
    cartItems,
    setCartItems,
  } = useContext(Context);
  const [arrQuantity, setArrQuantity] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get('http://localhost:3001/products');
      const productList = response.data;
      setProducts(productList);
      const test = productList.map((product) => ({
        id: product.id,
        quantity: 0,
      }));
      setArrQuantity(test);
    };
    getProducts();
  }, []);

  const handleChange = (product, { target: { value } }) => {
    if (value > 0) {
      const newQuantity = arrQuantity.map((item) => (item.id === product.id
        ? { ...item, quantity: Number(value) } : item));
      setArrQuantity(newQuantity);
      setCartItems(Array(value).fill(product));
      setCartProduct(cartProduct + Number(product.price) * value);
    }
  };

  const handleSubToCart = (item) => {
    let hasZeroQty = false;
    const newQuantity = arrQuantity.map((product) => {
      if (product.id === item.id && product.quantity === 0) hasZeroQty = true;
      return (product.id === item.id
        ? {
          ...product,
          quantity: product.quantity === 0 ? product.quantity : product.quantity - 1,
        } : product);
    });
    const commonProducts = cartItems.filter((elem) => elem.id === item.id);
    commonProducts.pop();
    setCartItems((prevState) => (
      [...commonProducts, ...prevState.filter((elem) => elem.id !== item.id)]));
    if (!hasZeroQty) {
      setCartProduct(
        (Number(cartProduct) - (Number(item.price))).toFixed(2),
      );
    }
    setArrQuantity(newQuantity);
  };

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
    setCartProduct(
      (Number(cartProduct) + (Number(item.price))).toFixed(2),
    );
    const newQuantity = arrQuantity.map((product) => (product.id === item.id
      ? { ...product, quantity: product.quantity + 1 } : product));
    setArrQuantity(newQuantity);
  };

  const mostrarQuantity = (id) => {
    const product = arrQuantity.find((e) => e.id === id);
    return product ? product.quantity : 0;
  };

  const redirectCheckout = () => {
    history.push('/customer/checkout');
  };

  return (
    <div>
      {products.map((product) => (
        <div className="order-card" key={ product.id }>
          <div data-testid={ `customer_products__element-card-title-${product.id}` }>
            <p
              className="order-pedido"
            >
              {product.name}
            </p>
          </div>
          <div
            data-testid={ `customer_products__element-card-price-${product.id}` }
          >
            {`${product.price}`.replace('.', ',')}
          </div>
          <div className="image-id">
            <img
              src={ product.urlImage }
              alt={ `Imagem da ${product.name}` }
              data-testid={ `customer_products__img-card-bg-image-${product.id}` }
              width="50px"
            />
          </div>

          <div>
            <button
              data-testid={ `customer_products__button-card-rm-item-${product.id}` }
              type="button"
              onClick={ () => handleSubToCart(product) }
            >
              -
            </button>
            <input
              type="text"
              value={ mostrarQuantity(product.id) }
              data-testid={ `customer_products__input-card-quantity-${product.id}` }
              onChange={ (e) => handleChange(product, e) }
            />
            <button
              data-testid={ `customer_products__button-card-add-item-${product.id}` }
              type="button"
              onClick={ () => handleAddToCart(product) }
            >
              +
            </button>
          </div>
        </div>
      ))}
      <div className="cart-button">
        <button
          data-testid="customer_products__button-cart"
          type="button"
          onClick={ redirectCheckout }
          disabled={ cartItems.length === 0 }
        >
          Ver Carrinho:
          <p data-testid="customer_products__checkout-bottom-value">
            {cartProduct.toString().replace('.', ',')}
          </p>
        </button>
      </div>
    </div>

  );
}

export default ProductCustomer;
