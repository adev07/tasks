// src/App.js or src/routes/Router.js (depending on your structure)
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Users from './pages/Users';
import Products from './pages/Products';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
};

export default App;
