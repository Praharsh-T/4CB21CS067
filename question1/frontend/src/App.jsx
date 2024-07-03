import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsList from "./components/ProductsList";
import ProductDetail from "./components/ProductDetail";

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<ProductsList />} />
          <Route path='/product/:id' element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
