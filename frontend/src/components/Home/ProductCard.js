// src/components/Home/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import './ProductCard.css';

export default function ProductCard({ product }) {
  return (
    <Link className='productCard' to={`/product/${product._id}`}>
      <img
        src={product?.images?.[0]?.url || '/default-product.png'}
        alt={product?.name || 'Product Image'}
      />
      <p>{product?.name}</p>
      <div>
        <Rating
          value={product?.ratings || 0}
          readOnly
          precision={0.5}
          size="small"
        />
        <span className="productCardSpan">
          ({product?.numOfReviews || 0} Reviews)
        </span>
      </div>
      <span>
        {new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        }).format(product?.price || 0)}
      </span>
    </Link>
  );
}
