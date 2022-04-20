import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from '../../pages/LoginPage/LoginPage';
import ProductPage from '../../pages/ProductPage/ProductPage';
import ProductsPage from '../../pages/ProductsPage/ProductsPage';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/products/:category" element={<ProductsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="*" element={<Navigate to="/products" />} />
      </Routes>
    </div>
  );
}

export default App;
