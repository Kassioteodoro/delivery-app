import React, { Component } from 'react';

class OrderCard extends Component {
  render() {
    return (
      <div className="order-card">
        <div
          className="order-id"
          data-tesdid="seller-orderselement-order-id-<id>"
        >
          <div>
            <p className="order-pedido">Pedido</p>
            <p className="order-number">00001</p>
          </div>
        </div>

        <div>
          <div>
            <div
              data-testid="seller_orders__element-delivery-status-<id>"
            >
              PENDENTE
            </div>

            <div>
              <div
                data-testid="seller_orders__element-order-date-<id>"
              >
                DATA
              </div>

              <div
                data-testid="seller_orders__element-card-price-<id>"
              >
                PREÇO
              </div>
            </div>
          </div>
          <span
            data-testid="seller_orders__element-card-address-<id>"
          >
            Rua Irmãos Monteiro, Bairo Pedras, 851
          </span>
        </div>
      </div>
    );
  }
}

export default OrderCard;
