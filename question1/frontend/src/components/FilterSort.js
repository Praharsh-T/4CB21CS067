import React, { useState } from "react";

const FilterSort = ({ products, onFilterSort }) => {
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [rating, setRating] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleFilterSort = () => {
    let filtered = [...products];

    if (category) filtered = filtered.filter((p) => p.category === category);
    if (company) filtered = filtered.filter((p) => p.company === company);
    if (rating) filtered = filtered.filter((p) => p.rating >= rating);
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);
    }

    if (sortOption === "price") filtered.sort((a, b) => a.price - b.price);
    if (sortOption === "rating") filtered.sort((a, b) => b.rating - a.rating);
    if (sortOption === "discount")
      filtered.sort((a, b) => b.discount - a.discount);

    onFilterSort(filtered);
  };

  return (
    <div className='mb-4'>
      <div className='flex space-x-4'>
        <input
          type='text'
          placeholder='Category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='border rounded-lg p-2 focus:outline-none focus:border-blue-500 flex-1'
        />

        <input
          type='text'
          placeholder='Company'
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className='border rounded-lg p-2 focus:outline-none focus:border-blue-500 flex-1'
        />

        <input
          type='number'
          placeholder='Rating'
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className='border rounded-lg p-2 focus:outline-none focus:border-blue-500 w-20'
        />

        <input
          type='text'
          placeholder='Price Range'
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className='border rounded-lg p-2 focus:outline-none focus:border-blue-500 flex-1'
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className='border rounded-lg p-2 focus:outline-none focus:border-blue-500'>
          <option value=''>Sort By</option>
          <option value='price'>Price</option>
          <option value='rating'>Rating</option>
          <option value='discount'>Discount</option>
        </select>
      </div>

      <button
        onClick={handleFilterSort}
        className='bg-blue-500 text-white p-2 mt-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSort;
