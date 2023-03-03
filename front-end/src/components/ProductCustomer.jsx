import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderCard() {
  const [products, setProducts] = useState([]);
  const [cartProduct, setCartProduct] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [idProduct, setIdProduct] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [arrQuantity, setArrQuantity] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      await axios.get('http://localhost:3001/products')
        .then((response) => {
          setProducts(response.data);
          const test = response.data.map((product) => ({
            id: product.id,
            quantity: 0,
          }));
          // console.log(test);
          setArrQuantity(test);
        });
      const result = products.filter((product) => product.id === idProduct)
        .map((product) => Number(product.price));
      setCartItems([...cartItems, result]);
    };
    getProducts();
  }, [cartProduct]);

  const handleSubToCart = (item, id) => {
    setIdProduct(id);
    setCartItems([...cartItems, item]);
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setCartProduct((Number(cartProduct) - Number(item.price)).toFixed(2));
      // const filterTest = arrQuantity.filter((a) => a.id === id - 1);
    }
  };

  const handleAddToCart = (item, id) => {
    const filterTest = arrQuantity.map((product) => {
      if (product.id === id) {
        setArrQuantity([...arrQuantity, { id, quantity: product.quantity += 1 }]);
        return { id, quantity: product.quantity + 1 };
      }
      return product.quantity;
    });
    setIdProduct(id);
    setCartItems([...cartItems, item]);
    setCartProduct((Number(cartProduct) + Number(item.price)).toFixed(2));
    setQuantity(quantity + 1);
    console.log(filterTest);
  };

  const mostrarQuantity = (id) => id;

  return (
    <div>
      { products && (products.map((product, id) => (
        <div
          className="order-card"
          key={ id }
        >
          <div>
            <p
              className="order-pedido"
              data-testid={ `customer_products__element-card-title-<${product.id}>` }
            >
              { product.name }

            </p>
          </div>
          <div data-testid={ `customer_products__element-card-price-<${product.id}>` }>
            { `R$ ${product.price}` }
          </div>
          <div className="image-id">
            <img
              src={ product.urlImage }
              alt={ `Imagem da ${product.name}` }
              data-tesdid={ `customer_products__img-card-bg-image-<${product.id}>` }
              width="50px"
            />
          </div>

          <div>
            <button
              data-testid={ `customer_products__button-card-rm-item-<${product.id}>` }
              type="button"
              onClick={ () => handleSubToCart(product, product.id) }
              value={ product.id }
            >
              -
            </button>
            <p data-testid={ `customer_products__input-card-quantity-${product.id}` }>
              { () => mostrarQuantity(product.id) }
            </p>
            <button
              data-testid={ `customer_products__button-card-add-item-<${product.id}>` }
              type="button"
              onClick={ () => handleAddToCart(product, product.id) }
              value={ product.id }
            >
              +
            </button>
          </div>
        </div>
      )))}
      <div className="cart-button">
        <button
          data-testid="customer_products__button-cart"
          type="button"
        >
          Ver Carrinho:
          { cartProduct }

        </button>
      </div>
    </div>

  );
}

export default OrderCard;
