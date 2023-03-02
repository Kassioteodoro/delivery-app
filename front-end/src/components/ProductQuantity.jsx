import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function ProductQuantity(props) {
  const { id } = props;

  const [quantity, setQuantity] = useState(0);
  const productRemoveQuantity = () => {
    if (quantity !== 0) setQuantity(quantity - 1);
  };

  const productAddQuantity = () => {
    setQuantity(quantity + 1);
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
};
