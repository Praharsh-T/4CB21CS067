import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.example.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the product details!",
          error
        );
      });
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className='container mx-auto p-4'>
      <img
        src={product.image}
        alt={product.name}
        className='w-full h-64 object-cover'
      />
      <h1 className='text-2xl font-bold'>{product.name}</h1>
      <p>{product.company}</p>
      <p>Category: {product.category}</p>
      <p>Rating: {product.rating}</p>
      <p>Price: ${product.price}</p>
      <p>Discount: {product.discount}%</p>
      <p>Availability: {product.availability}</p>
    </div>
  );
};

export default ProductDetail;
