import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Register from './pages/Register';

function App() {
  document.title = 'App delivery';
  document.onload = localStorage.setItem('b', 'b');
  return (
    <Switch>
      <Route exact path="/">
        {' '}
        <Redirect to="/login" />
        {' '}
      </Route>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/orders" component={ Orders } />
    </Switch>

  );
}
export default App;
