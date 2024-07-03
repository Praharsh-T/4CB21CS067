import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FilterSort from "./FilterSort";
import sampleProducts from "../data/products.json"; // Import the sample data

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);

  const handleFilterSort = (filteredSortedData) => {
    setFilteredProducts(filteredSortedData);
  };

  return (
    <div className='container mx-auto p-4'>
      <FilterSort products={products} onFilterSort={handleFilterSort} />
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {filteredProducts.map((product) => (
          <div key={product.id} className='border p-4 rounded'>
            <img
              src={product.image}
              alt={product.name}
              className='w-full h-48 object-cover'
            />
            <h2 className='text-lg font-bold'>{product.name}</h2>
            <p>{product.company}</p>
            <p>${product.price}</p>
            <Link to={`/product/${product.id}`} className='text-blue-500'>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
