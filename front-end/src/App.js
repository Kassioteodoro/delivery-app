import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Provider from './context/Provider';
import OrderDetails from './pages/OrderDetails';

function App() {
  document.title = 'App delivery';
  return (
    <Provider>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/customer/products" component={ Products } />
        <Route exact path="/customer/checkout" component={ Checkout } />
        <Route exact path="/customer/orders" component={ <Orders /> } />
        <Route exact path="/customer/orders/:id" component={ OrderDetails } />
      </Switch>
    </Provider>
  );
}
export default App;
