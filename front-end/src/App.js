import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Orders from './pages/orders';
import Register from './pages/register';

function App() {
  document.title = 'App delivery';
  document.onload = localStorage.setItem('b', 'b');
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/orders" element={ <Orders /> } />
    </Routes>
  );
}

export default App;
