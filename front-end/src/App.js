import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';

function App() {
  document.title = 'App delivery';
  return (
    <Routes>
      <Route exact path="/" element={ <Login /> } />
    </Routes>
  );
}

export default App;
