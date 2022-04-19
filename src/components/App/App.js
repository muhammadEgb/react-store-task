import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from '../../pages/LoginPage/LoginPage';
import ProductPage from '../../pages/ProductPage/ProductPage';
import ProductsPage from '../../pages/ProductsPage/ProductsPage';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </div>
  );
}

export default App;
