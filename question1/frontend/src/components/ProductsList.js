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

      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className='border rounded shadow-md overflow-hidden'>
            <img
              src={product.image}
              alt={product.name}
              className='w-full h-48 object-cover'
            />

            <div className='p-4'>
              <h2 className='text-lg font-bold mb-2'>{product.name}</h2>
              <p className='text-sm text-gray-600 mb-2'>{product.company}</p>
              <p className='text-lg font-bold text-gray-800'>
                ${product.price}
              </p>

              <Link
                to={`/product/${product.id}`}
                className='mt-2 block text-center text-blue-500 border border-blue-500 rounded-md py-2 px-4 transition duration-300 hover:bg-blue-500 hover:text-white'>
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
