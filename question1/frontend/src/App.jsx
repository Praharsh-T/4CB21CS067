import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsList from "./components/ProductsList";
import ProductDetail from "./components/ProductDetail";
import products from "./data/products.json";

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<ProductsList />} />
          <Route
            path='/product/:id'
            element={<ProductDetail />}
            products={products}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
