import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function ProductQuantity(props) {
  const { id, eventValue, setEvent, setIdProduct } = props;

  const [quantity, setQuantity] = useState(0);
  const productRemoveQuantity = () => {
    setIdProduct(id);
    if (quantity !== 0) {
      setQuantity(quantity - 1);
      if (eventValue !== 0) {
        setEvent(eventValue - 1);
      }
    }
  };

  const productAddQuantity = () => {
    setIdProduct(id);
    setQuantity(quantity + 1);
    setEvent(eventValue + 1);
  };
  return (
    <div>
      <button
        data-testid={ `customer_products__button-card-rm-item-<${id}>` }
        type="button"
        onClick={ productRemoveQuantity }
      >
        -
      </button>
      <p data-testid={ `customer_products__input-card-quantity-${id}` }>
        {quantity}
      </p>
      <button
        data-testid={ `customer_products__button-card-add-item-<${id}>` }
        type="button"
        onClick={ productAddQuantity }
      >
        +
      </button>
    </div>
  );
}

ProductQuantity.propTypes = {
  id: PropTypes.number.isRequired,
  eventValue: PropTypes.number.isRequired,
  setEvent: PropTypes.number.isRequired,
  setIdProduct: PropTypes.number.isRequired,
};
