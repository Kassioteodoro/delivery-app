import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductQuantity from './ProductQuantity';

function OrderCard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      await axios.get('http://localhost:3001/products')
        .then((response) => {
          setProducts(response.data);
          console.log(response.data);
        });
    };
    getProducts();
  }, []);

  return (
    <div>
      { products && (products.map((product, id) => (
        <div
          className="order-card"
          key={ id }
        >
          <div data-testid={ `customer_products__element-card-price-<${product.id}>` }>
            { product.price }
          </div>
          <div className="image-id">
            <img
              src={ product.urlImage }
              alt={ `Imagem da ${product.name}` }
              data-tesdid={ `customer_products__img-card-bg-image-<${product.id}>` }
            />
          </div>
          <div>
            <p
              className="order-pedido"
              data-testid="customer_products__element-card-title"
            >
              { product.name }

            </p>
          </div>
          <ProductQuantity id={ product.id } />
        </div>
      )))}
    </div>

  );
}

export default OrderCard;
