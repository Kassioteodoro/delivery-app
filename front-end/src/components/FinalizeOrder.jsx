import React from 'react';

function FinalizeOrder() {
  return (
    <div>
      <h3> Detalhes e Endereço para Entrega </h3>
      <div>
        <label htmlFor="seller">
          P. Vendedora Responsável:
          <select
            id="seller"
            name="seller"
            data-testid="customer_checkout__select-seller"
          >
            <option value="1">1</option>
          </select>
        </label>
        <label htmlFor="address">
          Endereço
          <input
            type="text"
            id="address"
            data-testid="customer_checkout__input-address"
          />
        </label>
        <label htmlFor="number">
          Número
          <input
            type="number"
            id="address"
            data-testid="customer_checkout__input-address-number"
          />
        </label>
      </div>
      <button
        type="submit"
        data-testid="customer_checkout__button-submit-order"
      >
        Finalizar Pedido
      </button>
    </div>
  );
}

export default FinalizeOrder;
