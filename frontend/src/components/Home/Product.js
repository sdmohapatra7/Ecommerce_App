import React from 'react';
import ReactStar from 'react-rating-stars-component';
import { Link } from 'react-router-dom';



export default function Product({product}) {
  const options = {
    edit:false,
    color:'rgba(20,20,20,0.1)',
    activeColor:'tomato',
    // size:window.innerWidth<600 ?20:23,
    value:product.ratings,
    isHalf:true
}
  return (
    <Link className='productCard' to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name}/>
        <p>{product.name}</p>
      <div>
        <ReactStar {...options} />
        <span className="productCardSpan">({product.numOfReviews} Reviews)</span>
      </div>
      <span>{`${product.price}`}</span>
    </Link>
  )
}
