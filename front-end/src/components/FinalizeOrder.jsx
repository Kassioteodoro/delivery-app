import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Context from '../context/Context';
import '../pages/css/FinalizeOrder.css';

function FinalizeOrder() {
  const {
    arrQuantity, cartProduct, setOrder, selectedSeller, setSelectedSeller,
  } = useContext(Context);
  const [sellers, setSellers] = useState([]);
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState(0);

  const history = useHistory();

  useEffect(() => {
    const getSellers = async () => {
      const response = await axios.get('http://localhost:3001/sales');
      const data = response.data.map((item) => item.name);
      setSellers(data);
      setSelectedSeller(data[0]);
    };
    getSellers();
  }, []);

  const handleClick = ({ target: { value } }) => {
    setSelectedSeller(value);
  };

  const handleChange = ({ target: { type, value } }) => {
    if (type === 'number') setNumber(Number(value));
    else setAddress(value);
  };

  const postSale = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/sales', {
      items: arrQuantity,
      totalPrice: cartProduct.toFixed(2),
      seller: selectedSeller,
      deliveryAddress: address,
      deliveryNumber: number,
    }, { headers:
      { Authorization: JSON.parse(localStorage.getItem('user')).token } })
      .then((response) => {
        setOrder(response.data);
        history.push(`/customer/orders/${response.data.id}`);
      });
  };

  return (
    <div>
      <h3> Detalhes e Endereço para Entrega </h3>
      <div>
        <label htmlFor="seller">
          Pessoa Vendedora Responsável:
          <select
            id="seller"
            name="seller"
            data-testid="customer_checkout__select-seller"
            onClick={ handleClick }
          >
            {sellers.map((seller) => (
              <option
                key={ seller }
                value={ seller }
              >
                { seller }
              </option>))}
          </select>
        </label>
        <label htmlFor="address">
          Endereço:
          <input
            className="endereco"
            type="text"
            id="address"
            data-testid="customer_checkout__input-address"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="number">
          Número:
          <input
            className="numero-endereco"
            type="number"
            id="address"
            data-testid="customer_checkout__input-address-number"
            onChange={ handleChange }
          />
        </label>
      </div>
      <button
        type="submit"
        data-testid="customer_checkout__button-submit-order"
        onClick={ postSale }
      >
        Finalizar Pedido
      </button>
    </div>
  );
}

export default FinalizeOrder;
